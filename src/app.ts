import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import bodyParser from "body-parser";
import identifyRoutes from "./routes/identify";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route setup
app.use("/identify", identifyRoutes);

// Connect to DB and start server
AppDataSource.initialize()
    .then(() => {
        console.log("🟢 Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Error during Data Source initialization:", error);
    });
