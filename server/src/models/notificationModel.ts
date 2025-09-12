import mongoose from "mongoose";
import notificationSchema from "../schemas/notificationSchema";
const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;