import { Schema } from "mongoose"

const jobSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    title: { type: String, required: true },
    description: { type: String, default: null },
    employmentType: { type: String, enum: ["full-time", "part-time", "contract"], default: "full-time" },
    locationType: { type: String, enum: ["remote", "onsite", "hybrid"], default: "onsite" },
    techStack: [String],
    salaryRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
    },

    requiresTest: { type: Boolean, default: false },
    testId: { type: Schema.Types.ObjectId, ref: "Test", default: null },

    status: { type: String, enum: ["open", "closed"], default: "open" },
}, { timestamps: true })

export default jobSchema
