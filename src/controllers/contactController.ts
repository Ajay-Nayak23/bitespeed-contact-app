import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../models/Contact";

export const identifyContact = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            res.status(400).json({ error: "Missing contact info" });
            return;
        }

        const contactRepo = AppDataSource.getRepository(Contact);

        // Find contacts that match email or phone
        const matchedContacts = await contactRepo.find({
            where: [
                { email },
                { phoneNumber }
            ]
        });

        let primaryContact: Contact;
        let allRelatedContacts: Contact[] = [];

        if (matchedContacts.length === 0) {
            // Create a new primary contact
            const newContact = contactRepo.create({
                email,
                phoneNumber,
                linkPrecedence: "primary"
            });
            await contactRepo.save(newContact);

            res.status(200).json({
                contact: {
                    primaryContactId: newContact.id,
                    emails: [email],
                    phoneNumbers: [phoneNumber],
                    secondaryContactIds: []
                }
            });
            return;
        }

        // Find the oldest primary contact
        const primaryCandidates = matchedContacts.filter(c => c.linkPrecedence === "primary");
        primaryContact = primaryCandidates.reduce((oldest, curr) =>
            curr.createdAt < oldest.createdAt ? curr : oldest
        );

        // Fetch all linked contacts
        allRelatedContacts = await contactRepo.find();
        allRelatedContacts = allRelatedContacts.filter(c =>
            c.id === primaryContact.id || c.linkedId === primaryContact.id
        );

        // If new info, create secondary contact
        const emailExists = email && allRelatedContacts.some(c => c.email === email);
        const phoneExists = phoneNumber && allRelatedContacts.some(c => c.phoneNumber === phoneNumber);

        if (!emailExists || !phoneExists) {
            const newSecondary = contactRepo.create({
                email,
                phoneNumber,
                linkPrecedence: "secondary",
                linkedId: primaryContact.id
            });
            await contactRepo.save(newSecondary);
            allRelatedContacts.push(newSecondary);
        }

        // Collect final response
        const emails = Array.from(new Set(allRelatedContacts.map(c => c.email).filter(Boolean)));
        const phoneNumbers = Array.from(new Set(allRelatedContacts.map(c => c.phoneNumber).filter(Boolean)));
        const secondaryContactIds = allRelatedContacts
            .filter(c => c.linkPrecedence === "secondary")
            .map(c => c.id);

        res.status(200).json({
            contact: {
                primaryContactId: primaryContact.id,
                emails,
                phoneNumbers,
                secondaryContactIds
            }
        });
    } catch (error) {
        next(error);
    }
};
