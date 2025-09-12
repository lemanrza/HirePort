import { Schema } from "mongoose";
const testSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    title: { type: String, required: true },
    durationSec: { type: Number, default: 600 },
    questions: [
        {
            type: { type: String, enum: ["mcq", "text", "code"], required: true },
            prompt: { type: String, required: true },
            options: [String],
            answerKey: Schema.Types.Mixed,
            points: { type: Number, default: 1 }
        }
    ],
    antiCheat: {
        tabSwitchLimit: { type: Number, default: 3 },
        webcamRequired: { type: Boolean, default: false },
    }
}, { timestamps: true });
export default testSchema;
