import mongoose from "mongoose";
import employeeSchema from "../schemas/employeeSchema";
const employeeModel = mongoose.model("Employee", employeeSchema);
export default employeeModel;