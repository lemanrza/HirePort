import companyModel from "../models/companyModel";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerCompany = async (payload: any) => {
    try {
        const { email, hrNumber, hrName } = payload;

        const duplicateCompany = await companyModel.findOne({ email });
        if (duplicateCompany) {
            return { success: false, message: "Company email already exists" };
        }
        const duplicateUser = await userModel.findOne({ email });
        if (duplicateUser) {
            return { success: false, message: "Email already exists in users" };
        }

        const newCompany = await companyModel.create({
            ...payload,
            status: "pending",
            isApproved: false,
            defaultPassword: null,
        });

        return {
            success: true,
            data: newCompany,
        };
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;
        return { success: false, message };
    }
};

export const setNewPasswordService = async (
    companyId: string,
    newPassword: string
) => {
    try {
        const company = await companyModel.findById(companyId);
        if (!company) {
            return { success: false, message: "Company not found" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        company.password = hashedPassword;
        company.forcePasswordReset = false;
        await company.save();

        return { success: true, message: "Password updated successfully" };
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;
        return { success: false, message };
    }
};

export const loginCompanyService = async (email: string, password: string) => {
    try {
        const company = await companyModel.findOne({ email });
        if (!company) {
            return { success: false, message: "Invalid credentials" };
        }

        if (!company.isApproved) {
            return { success: false, message: "Company not approved yet" };
        }

        const isMatch = await bcrypt.compare(password, company.password || "");
        if (!isMatch) {
            return { success: false, message: "Invalid credentials" };
        }

        const token = jwt.sign(
            {
                id: company._id,
                email: company.email,
                name: company.name,
                role: "COMPANY",
                forcePasswordReset: company.forcePasswordReset,
            },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1d" }
        );

        return {
            success: true,
            message: "Login successful",
            data: {
                company,
                token,
            },
        };
    } catch (error: unknown) {
        let message = "Internal server error";
        if (error instanceof Error) message = error.message;
        return { success: false, message };
    }
};
