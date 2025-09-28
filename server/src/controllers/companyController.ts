import { Request, Response } from "express";
import { loginCompanyService, registerCompany, setNewPasswordService } from "../services/companyService";
import companyModel from "../models/companyModel";


export const registerCompanyController = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, name, hrNumber, hrName } = req.body;

        if (!email || !name || !hrNumber || !hrName) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const response = await registerCompany(req.body);

        if (!response.success) {
            return res.status(400).json({
                success: false,
                message: response.message,
            });
        }

        res.status(201).json({
            success: true,
            message:
                "Company registered successfully. Waiting for Admin approval.",
            data: response.data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const setNewPassword = async (req: Request, res: Response) => {
    try {
        const { companyId, newPassword } = req.body;

        if (!companyId || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "companyId and newPassword are required",
            });
        }

        const response = await setNewPasswordService(companyId, newPassword);

        if (!response.success) {
            return res.status(400).json(response);
        }

        res.json(response);
    } catch (error) {
        console.error("Error in setNewPassword:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const verifyCompanyOtp = async (req: Request, res: Response) => {
    try {
        const { companyId, otp } = req.body;

        const company = await companyModel.findById(companyId);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        if (!company.otpCode || !company.otpExpires || company.otpExpires < new Date()) {
            return res.status(400).json({ success: false, message: "OTP expired" });
        }

        if (company.otpCode !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        company.isPhoneVerified = true;
        company.otpCode = null; // ✅ artıq null ola bilər
        company.otpExpires = null;
        await company.save();

        res.json({ success: true, message: "Phone number verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginCompany = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const response = await loginCompanyService(email, password);

        if (!response.success) {
            return res.status(400).json(response);
        }

        res.json(response);
    } catch (error) {
        console.error("Error in company login:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
