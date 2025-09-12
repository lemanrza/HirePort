import mongoose from "mongoose";
import testSchema from "../schemas/testSchema";
const testModel = mongoose.model("Test", testSchema);
export default testModel;