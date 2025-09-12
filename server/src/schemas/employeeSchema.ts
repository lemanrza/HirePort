import { Schema } from "mongoose"

const employeeSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    position: { type: String, default: null },
    startedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["active","terminated"], default: "active" }
}, { timestamps: true })

export default  employeeSchema
