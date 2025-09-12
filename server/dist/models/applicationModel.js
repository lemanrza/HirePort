import mongoose from "mongoose";
import applicationSchema from "../schemas/applicationSchema";
const applicationModel = mongoose.model("Application", applicationSchema);
export default applicationModel;
