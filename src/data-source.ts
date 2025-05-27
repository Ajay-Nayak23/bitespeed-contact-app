import { DataSource } from "typeorm";
import { Contact } from "./models/Contact";
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Contact],
    synchronize: true, // for dev only
});
