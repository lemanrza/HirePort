import { Schema } from "mongoose";
const applicationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    status: {
        type: String,
        enum: ["applied", "test_required", "test_passed", "interview", "offer", "hired", "rejected"],
        default: "applied"
    },
    cvSnapshot: {
        url: { type: String, default: null },
        public_id: { type: String },
    },
    notes: { type: String, default: null },
    timelines: [{ status: String, at: { type: Date, default: Date.now } }],
}, { timestamps: true });
export default applicationSchema;
