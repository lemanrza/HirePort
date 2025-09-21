import bcrypt from "bcrypt";
import companyModel from "../models/companyModel";
import { sendDefaultPasswordEmail } from "../utils/sendMail";

export const approveCompanyService = async (companyId: string) => {
  try {
    const company = await companyModel.findById(companyId);
    if (!company) {
      return { success: false, message: "Company not found" };
    }

    if (company.isApproved) {
      return { success: false, message: "Company already approved" };
    }

    const defaultPassword = "Company123!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    company.isApproved = true;
    company.status = "approved";
    company.password = hashedPassword;
    await company.save();

    await sendDefaultPasswordEmail(company.email, company.name, defaultPassword);

    return {
      success: true,
      message: "Company approved successfully. Default password sent.",
      data: company,
    };
  } catch (error: unknown) {
    let message = "Internal server error";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
};
