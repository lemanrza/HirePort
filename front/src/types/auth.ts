import { type User } from "@/types/userType";
import { type Company } from "@/types/companyType";

export interface AuthState {
  user: User | null;
  company: Company | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
