import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/store/hooks";
import {
    loginUserSuccess,
    loginCompanySuccess,
    loginFailure,
} from "@/features/auth/authSlice";
import type { User } from "@/types/userType";
import type { Company } from "@/types/companyType";

const AuthCallback = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useParams();

    useEffect(() => {
        if (!token) {
            enqueueSnackbar("Token not found. Please try logging in again.", {
                variant: "error",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            navigate("/", { replace: true });
            return;
        }

        try {
            const decoded: any = jwtDecode(token);

            // role və ya model tipinə görə ayırırıq
            if (decoded?.role === "USER" || decoded?.role === "ADMIN") {
                const user: User = {
                    id: decoded.id,
                    email: decoded.email,
                    fullName: decoded.fullName,
                    username: decoded.username,
                    profileImage: decoded.profileImage,
                    backgroundImage: decoded.backgroundImage,
                    isPremium: decoded.isPremium,
                    role: decoded.role,
                    socials: decoded.socials,
                    bio: decoded.bio,
                    location: decoded.location,
                    phoneNumber: decoded.phoneNumber,
                    loginAttempts: decoded.loginAttempts,
                    lockUntil: decoded.lockUntil,
                    isBanned: decoded.isBanned,
                    lastLogin: decoded.lastLogin,
                    isVerified: decoded.isVerified,
                    provider: decoded.provider,
                    providerId: decoded.providerId,
                    profile: decoded.profile,
                    cvFiles: decoded.cvFiles,
                    experience: decoded.experience,
                    education: decoded.education,
                    profileViews: decoded.profileViews,
                    createdAt: decoded.createdAt,
                    updatedAt: decoded.updatedAt,
                };

                dispatch(loginUserSuccess({ user, token }));
            } else {
                const company: Company = {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    hrName: decoded.hrName,
                    hrNumber: decoded.hrNumber,
                    about: decoded.about,
                    website: decoded.website,
                    locations: decoded.locations,
                    employees: decoded.employees,
                    logo: decoded.logo,
                    banner: decoded.banner,
                    status: decoded.status,
                    forcePasswordReset: decoded.forcePasswordReset,
                    socials: decoded.socials,
                    isApproved: decoded.isApproved,
                    isPhoneVerified: decoded.isPhoneVerified,
                    otpCode: decoded.otpCode,
                    otpExpires: decoded.otpExpires,
                    createdAt: decoded.createdAt,
                    updatedAt: decoded.updatedAt,
                };

                dispatch(loginCompanySuccess({ company, token }));
            }

            localStorage.setItem("token", token);

            enqueueSnackbar("Login successful", {
                variant: "success",
                autoHideDuration: 2000,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });

            navigate("/user/dashboard", { replace: true });
        } catch (err) {
            console.error("Token decode error:", err);
            dispatch(loginFailure("Invalid token"));
            enqueueSnackbar("Invalid or expired token", {
                variant: "error",
                autoHideDuration: 2500,
                anchorOrigin: { vertical: "bottom", horizontal: "right" },
            });
            navigate("/", { replace: true });
        }
    }, [dispatch, navigate, token]);

    return (
        <div className="text-center mt-10 text-gray-600">Redirecting...</div>
    );
};

export default AuthCallback;
