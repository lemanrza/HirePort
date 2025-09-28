import express from "express";
import { loginCompany, registerCompanyController, setNewPassword, verifyCompanyOtp } from "../controllers/companyController";

const companyRouter = express.Router();

companyRouter.post("/registerCompany", registerCompanyController);
companyRouter.post("/login", loginCompany);
companyRouter.patch("/set-new-password", setNewPassword);
companyRouter.post("/verifyCompanyOtp", verifyCompanyOtp);


export default companyRouter;
