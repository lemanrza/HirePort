import express from "express";
import { registerUser, loginUser, verifyUserEmail } from "../controllers/userController";
import userValidate from "../middleware/userValidate";
const userRouter = express.Router();
userRouter.post("/register", userValidate, registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify-email", verifyUserEmail);
export default userRouter;
