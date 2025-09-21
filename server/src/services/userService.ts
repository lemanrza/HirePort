import userModel from "../models/userModel.js";
import companyModel from "../models/companyModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken, verifyAccessToken } from "../utils/jwt.js";
import { sendUnlockAccountEmail } from "../utils/sendMail.js";
import { JwtPayload } from "jsonwebtoken";

const config = require("../config/config.js");
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 10 * 60 * 1000;

export const register = async (payload: any) => {
    try {
        const { email } = payload;
        const dublicateUser = await userModel.findOne({ email });
        if (dublicateUser) {
            return {
                success: false,
                message: "Email already exists",
            };
        }
        const duplicateCompany = await companyModel.findOne({ email });
        if (duplicateCompany) {
            return { success: false, message: "Email already exists in companies" };
        }
        return {
            success: true,
            data: await userModel.create(payload),
        };
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) {
            message = error.message;
        }
        return { success: false, message };
    }
};

export const registerCompany = async (payload: any) => {
    try {
        const { email } = payload;

        const duplicateCompany = await companyModel.findOne({ email });
        if (duplicateCompany) {
            return {
                success: false,
                message: "Company email already exists",
            };
        }
        const duplicateUser = await userModel.findOne({ email });
        if (duplicateUser) {
            return { success: false, message: "Email already exists in users" };
        }
        return {
            success: true,
            data: await companyModel.create({
                ...payload,
                status: "pending",
                isApproved: false,
                defaultPassword: null,
            }),
        };
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) {
            message = error.message;
        }
        return { success: false, message };
    }
};

export const verifyEmail = async (token: string) => {
    const decoded = verifyAccessToken(token);

    if (!decoded || typeof decoded === "string") {
        return { success: false, message: "Invalid or expired token" };
    }

    const { id } = decoded as JwtPayload & { id: string };

    const user = await userModel.findById(id);
    if (!user) {
        return { success: false, message: "User not found" };
    }

    if (user.isVerified) {
        return { success: false, message: "Email already verified" };
    }

    user.isVerified = true;
    await user.save();

    return { success: true, message: "Email has been verified successfully!" };
};

export const login = async (email: string, password: string) => {

    const user = await userModel.findOne({ email });

    if (!user) throw new Error("Invalid credentials");

    if (!user.isVerified) throw new Error("User should be verified first");

    if (user.lockUntil) {
        if (user.lockUntil > new Date()) {
            const unlockTime = new Date(user.lockUntil).toLocaleString();
            throw new Error(`Account is locked. Try again after ${unlockTime}`);
        } else {
            user.loginAttempts = 0;
            user.lockUntil = null;
            await user.save();
        }
    }

    if (user.provider == "google") {
        throw new Error(
            "This account has been created with Google, please try sign in with Google"
        );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        user.loginAttempts = (user.loginAttempts || 0) + 1;

        if (user.loginAttempts >= MAX_ATTEMPTS) {
            user.lockUntil = new Date(Date.now() + LOCK_TIME);
            await user.save();

            const token = generateAccessToken(
                {
                    id: user._id,
                    email: user.email,
                },
                "6h"
            );

            const unlockAccountLink = `${config.SERVER_URL}/auth/unlock-account?token=${token}`;
            sendUnlockAccountEmail(
                user.email,
                user.fullName,
                user.lockUntil,
                unlockAccountLink
            );

            throw new Error(
                "Too many login attempts. Account locked for 10 minutes. Check your email"
            );
        }

        await user.save();
        throw new Error("Invalid credentials");
    }

    user.loginAttempts = 0;
    user.lockUntil = null;
    user.isBanned = false;
    user.lastLogin = new Date();

    await user.save();

    const populatedUser = await userModel.findById(user._id)
        .select("-password")


    const accessToken = generateAccessToken({
        id: populatedUser?._id,
        email: populatedUser?.email,
        fullName: populatedUser?.fullName,
        profileImage: populatedUser?.profileImage,
        premium: populatedUser?.isPremium || false,
        lastLogin: populatedUser?.lastLogin,
        loginAttempts: populatedUser?.loginAttempts || 0,
        lockUntil: populatedUser?.lockUntil,
        isVerified: populatedUser?.isVerified || false,
        provider: populatedUser?.provider || 'local',
        providerId: populatedUser?.providerId,
        createdAt: populatedUser?.createdAt,
        updatedAt: populatedUser?.updatedAt,
    }, "24h");

    const refreshToken = generateRefreshToken({
        id: populatedUser?._id,
        email: populatedUser?.email,
        fullName: populatedUser?.fullName,
        profileImage: populatedUser?.profileImage,
        premium: populatedUser?.isPremium || false,
        lastLogin: populatedUser?.lastLogin,
        loginAttempts: populatedUser?.loginAttempts || 0,
        lockUntil: populatedUser?.lockUntil,
        isVerified: populatedUser?.isVerified || false,
        provider: populatedUser?.provider || 'local',
        providerId: populatedUser?.providerId,
        createdAt: populatedUser?.createdAt,
        updatedAt: populatedUser?.updatedAt,
    });

    return {
        message: "User login successfully!",
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};