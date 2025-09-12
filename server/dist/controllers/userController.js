import { login, register, verifyEmail } from "../services/userService";
import { generateAccessToken } from "../utils/jwt";
import { sendVerificationEmail } from "../utils/sendMail";
import config from "../config/config";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
    try {
        const { password, email, ...otherData } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const userData = {
            ...otherData,
            email,
            password: hashedPassword,
        };
        const response = await register(userData);
        if (!response.success) {
            throw new Error(response.message);
        }
        const token = generateAccessToken({
            id: response.data?._id,
            email: email,
            fullName: req.body?.fullName,
        }, "6h");
        const verificationLink = `${config.SERVER_URL}/auth/verify-email?token=${token}`;
        sendVerificationEmail(email, req.body?.fullName, verificationLink);
        res.status(201).json({
            message: "User registered successfully | Verify your email",
            data: response.data,
        });
    }
    catch (error) {
        console.log(error);
    }
};
export const verifyUserEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.redirect(`${config.CLIENT_URL}/auth/email-verified?error=Missing verification token`);
        }
        const response = await verifyEmail(token);
        if (response && response.success) {
            res.redirect(`${config.CLIENT_URL}/auth/email-verified?message=${encodeURIComponent(response.message)}`);
        }
        else {
            res.redirect(`${config.CLIENT_URL}/auth/email-verified?error=${encodeURIComponent(response?.message || 'Verification failed')}`);
        }
    }
    catch (error) {
        let message = "Verification failed";
        if (error instanceof Error) {
            message = error.message;
        }
        res.redirect(`${config.CLIENT_URL}/auth/email-verified?error=${encodeURIComponent(message)}`);
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await login(email, password);
        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/auth/refresh",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "User successfully login",
            token: response.accessToken,
        });
    }
    catch (error) {
        let message = "internal server error";
        let statusCode = 500;
        if (error instanceof Error) {
            message = error.message;
            if (error.statusCode) {
                statusCode = error.statusCode;
            }
        }
        res.status(statusCode).json({ message });
    }
};
