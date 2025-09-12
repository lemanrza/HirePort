import { Schema } from "mongoose";
const submissionSchema = new Schema({
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startedAt: { type: Date, default: Date.now },
    finishedAt: { type: Date },
    answers: [{ questionId: String, answer: Schema.Types.Mixed }],
    score: { type: Number, default: 0 },
    status: { type: String, enum: ["passed", "failed", "review"], default: "review" }
}, { timestamps: true });
export default submissionSchema;
