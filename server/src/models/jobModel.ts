import mongoose from "mongoose";
import jobSchema from "../schemas/jobSchema";
const jobModel = mongoose.model("Job", jobSchema);
export default jobModel;