import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // məsələn: ["USER"], ["COMPANY"], ["ADMIN"]
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, company } = useAppSelector((state: any) => state.auth);

  // Əgər login olmayıbsa → signin səhifəsinə yönləndir
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Role təyin et
  let role: string | null = null;

  if (user) {
    // User varsa → onun rolu (USER və ya ADMIN)
    role = user.role;
  } else if (company) {
    // Company varsa → hər zaman "COMPANY"
    role = "COMPANY";
  }

  // İcazə yoxlanışı
  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
