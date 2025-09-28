import { Request, Response } from "express";
import { approveCompanyService } from "../services/adminServices";

export const approveCompany = async (req: Request, res: Response) => {
    try {
        const { companyId } = req.body;
        const response = await approveCompanyService(companyId);

        if (!response.success) {
            return res.status(400).json({
                success: false,
                message: response.message,
            });
        }

        res.json({
            success: true,
            message: response.message,
            data: response.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
