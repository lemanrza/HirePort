import mongoose from "mongoose";
import companySchema from "../schemas/companySchema";
const companyModel = mongoose.model("Company", companySchema);
export default companyModel;