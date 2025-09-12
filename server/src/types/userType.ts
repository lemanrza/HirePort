import { Document } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    email: string;
    username: string;
    password: string;
    profileImage?: {
        url: string;
        public_id: string;
    };
    role: "user" | "admin";
    backgroundImage?: {
        url: string;
        public_id: string;
    };
    isPremium: boolean;
    blockedUsers: IUser["_id"][];
    socials: {
        linkedin?: string;
        instagram?: string;
        github?: string;
    };
    bio?: string;
    location?: string;
    phoneNumber?: string;
    provider: "local" | "google";
    providerId?: string;
    profile?: {
        headline?: string;
        skills?: string[];
    };
    cvFiles?: {
        url: string;
        public_id: string;
    }[];
    experience?: {
        title: string;
        company: string;
    }[];
    education?: {
        school: string;
        degree: string;
        from: Date;
        to: Date;
    }[];
    isVerified: boolean;
    loginAttempts: number;
    lockUntil: Date | null;
    lastLogin?: Date | null;
    isBanned?: boolean;
    createdAt: Date;
    updatedAt: Date;

}