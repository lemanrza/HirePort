import express from "express";
import { registerUser, loginUser, verifyUserEmail, verifyCompanyOtp, registerCompanyController } from "../controllers/userController.js";
import userValidate from "../middleware/userValidate.js";
import { approveCompany } from "../controllers/adminController.js";

const userRouter = express.Router();

userRouter.post("/registerUser", userValidate, registerUser);
userRouter.post("/registerCompany", registerCompanyController);
userRouter.post("/verifyCompanyOtp", verifyCompanyOtp);
userRouter.put("/approveCompany/:companyId", approveCompany);
userRouter.post("/login", loginUser);
userRouter.get("/verify-email", verifyUserEmail);

export default userRouter;
