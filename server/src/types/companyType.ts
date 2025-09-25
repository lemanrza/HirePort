export interface ICompany extends Document {
  name: string;
  email: string;
  password?: string;
  status: "pending" | "approved" | "rejected";
  isApproved: boolean;
  otpCode?: string | null;
  otpExpires?: Date | null;
  isPhoneVerified: boolean;
}
