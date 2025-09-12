import mongoose from "mongoose";
import interviewSchema from "../schemas/interviewSchema";
const interviewModel = mongoose.model("Interview", interviewSchema);
export default interviewModel;