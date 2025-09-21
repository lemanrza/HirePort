import { login, register, registerCompany, verifyEmail } from "../services/userService.js";
import { generateAccessToken } from "../utils/jwt.js";
import { sendVerificationEmail } from "../utils/sendMail.js";
import config from "../config/config.js";
import bcrypt from "bcrypt"
import { Request, Response } from "express";
type HttpError = Error & { statusCode?: number };

export const registerUser = async (
    req: Request,
    res: Response,
) => {
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

        const token = generateAccessToken(
            {
                id: response.data?._id,
                email: email,
                fullName: req.body?.fullName,
            },
            "6h"
        );

        const verificationLink = `${config.SERVER_URL}/auth/verify-email?token=${token}`;
        sendVerificationEmail(
            email,
            req.body?.fullName,
            verificationLink
        );
        res.status(201).json({
            message: "User registered successfully | Verify your email",
            data: response.data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const registerCompanyController = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, name } = req.body;

        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const response = await registerCompany(req.body);

        if (!response.success) {
            return res.status(400).json({
                success: false,
                message: response.message,
            });
        }

        res.status(201).json({
            success: true,
            message:
                "Company registered successfully. Waiting for Admin approval.",
            data: response.data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const verifyUserEmail = async (
    req: Request,
    res: Response,
) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.redirect(
                `${config.CLIENT_URL}/auth/email-verified?error=Missing verification token`
            );
        }

        const response = await verifyEmail(token as string);

        if (response && response.success) {
            res.redirect(
                `${config.CLIENT_URL}/auth/email-verified?message=${encodeURIComponent(response.message)}`
            );
        } else {
            res.redirect(
                `${config.CLIENT_URL}/auth/email-verified?error=${encodeURIComponent(response?.message || 'Verification failed')}`
            );
        }
    } catch (error: unknown) {
        let message = "Verification failed";
        if (error instanceof Error) {
            message = error.message;
        }
        res.redirect(
            `${config.CLIENT_URL}/auth/email-verified?error=${encodeURIComponent(message)}`
        );
    }
};

export const loginUser = async (req: Request, res: Response) => {
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
    } catch (error: unknown) {
        let message = "internal server error";
        let statusCode: number = 500;

        if (error instanceof Error) {
            message = error.message;
            if ((error as HttpError).statusCode) {
                statusCode = (error as HttpError).statusCode!;
            }
        }

        res.status(statusCode).json({ message });
    }
};