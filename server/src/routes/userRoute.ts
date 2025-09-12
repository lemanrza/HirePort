import express from "express";
import { registerUser, loginUser, verifyUserEmail } from "../controllers/userController.js";
import userValidate from "../middleware/userValidate.js";

const userRouter = express.Router();

userRouter.post("/register", userValidate, registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/verify-email", verifyUserEmail);

export default userRouter;
