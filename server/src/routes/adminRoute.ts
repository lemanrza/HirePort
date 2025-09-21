import express from "express";
import { approveCompany } from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.post("/approveCompany", approveCompany);

export default adminRouter;
