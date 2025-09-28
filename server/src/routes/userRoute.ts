import express from "express";
import { registerUser, loginUser, verifyUserEmail, resendVerificationEmailController } from "../controllers/userController.js";
import userValidate from "../middleware/userValidate.js";

const userRouter = express.Router();

userRouter.post("/registerUser", userValidate, registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify-email", verifyUserEmail);
userRouter.post("/resend-verification", resendVerificationEmailController);


export default userRouter;
