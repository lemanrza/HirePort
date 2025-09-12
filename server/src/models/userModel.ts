import mongoose from "mongoose";
import userSchema from "../schemas/userSchema";
import { IUser } from "../types/userType";
const userModel = mongoose.model<IUser>("User", userSchema);
export default userModel;