import { DataSource } from "typeorm";
import { Contact } from "./models/Contact";
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [Contact],
    synchronize: true, // Turn off in production if needed
    ssl: {
        rejectUnauthorized: false, // Required by Render PostgreSQL
    },
});
