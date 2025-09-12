import dotenv from "dotenv";
import { createServer } from "http";
import connectToDB from "./config/db";
import app from "./app";
import config from "./config/config";
dotenv.config();
const httpServer = createServer(app);
const startServer = async () => {
    try {
        await connectToDB();
        httpServer.listen(config.PORT, () => {
            console.log(`✅ Server running on http://localhost:${config.PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
