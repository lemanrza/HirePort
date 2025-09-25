import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT || 5050,
    DB_URL: process.env.DB_URL,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    SERVER_URL: process.env.SERVER_URL || "http://localhost:5050",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
}