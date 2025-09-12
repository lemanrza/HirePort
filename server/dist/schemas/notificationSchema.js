import { Schema } from "mongoose";
const notificationSchema = new Schema({
    recipientType: { type: String, enum: ["User", "Company", "Admin"], required: true },
    recipientId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, default: {} },
    readAt: { type: Date, default: null },
}, { timestamps: true });
export default notificationSchema;
