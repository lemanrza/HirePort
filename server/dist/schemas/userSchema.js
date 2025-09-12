import { Schema } from "mongoose";
const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    fullName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profileImage: {
        url: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        },
        public_id: {
            type: String,
        },
    },
    backgroundImage: {
        url: {
            type: String,
            default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
        },
        public_id: {
            type: String,
        },
    },
    isPremium: { type: Boolean, default: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    socials: {
        linkedin: { type: String, default: null },
        instagram: { type: String, default: null },
        github: { type: String, default: null },
    },
    bio: { type: String, default: null },
    location: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    isBanned: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local",
    },
    providerId: {
        type: String,
        default: null,
    },
    profile: {
        headline: String,
        skills: [String],
    },
    cvFiles: [{
            url: {
                type: String,
                default: null,
            },
            public_id: {
                type: String,
            }
        },],
    experience: [
        { company: String, role: String, from: Date, to: Date, desc: String }
    ],
    education: [
        { school: String, degree: String, from: Date, to: Date }
    ],
    profileViews: { type: Schema.Types.ObjectId, default: 0, ref: "User" },
}, { timestamps: true });
export default userSchema;
