import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { nullable: true })
    phoneNumber!: string;

    @Column("varchar", { nullable: true })
    email!: string;

    @Column("int", { nullable: true })
    linkedId!: number;

    @Column({
        type: "enum",
        enum: ["primary", "secondary"],
        default: "primary",
    })
    linkPrecedence!: "primary" | "secondary";

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column("timestamp", { nullable: true })
    deletedAt!: Date;
}
