import { Schema } from "mongoose"

const companySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    about: { type: String, default: null },
    website: { type: String, default: null },
    locations: [String],
    employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
    logo: {
        url: { type: String, default: "https://via.placeholder.com/150" },
        public_id: { type: String },
    },
    banner: {
        url: { type: String, default: "https://via.placeholder.com/600x200" },
        public_id: { type: String },
    },

    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    forcePasswordReset: { type: Boolean, default: false },

    socials: {
        linkedin: { type: String, default: null },
        instagram: { type: String, default: null },
    },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true })

export default companySchema
