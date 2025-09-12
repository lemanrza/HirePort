import { Schema } from "mongoose";
const interviewSchema = new Schema({
    applicationId: { type: Schema.Types.ObjectId, ref: "Application", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date },
    roomLink: { type: String, default: null },
    status: { type: String, enum: ["scheduled", "completed", "no_show"], default: "scheduled" }
}, { timestamps: true });
export default interviewSchema;
