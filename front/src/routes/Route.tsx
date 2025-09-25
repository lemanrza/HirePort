import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import UserLayout from "../layouts/UserLayout";
import CompanyLayout from "../layouts/CompanyLayout";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/auth/Login";


// import ProtectedRoute from "./ProtectedRoute";
import Jobs from "../pages/user/Jobs";
import JobDetails from "../pages/user/JobDetails";
import Applications from "../pages/user/Applications";
import Tests from "../pages/user/Tests";
import UserSettings from "../pages/user/Settings";
import UserInterviews from "../pages/user/Interviews";
import UserProfile from "../pages/user/Profile";
import UserDashboard from "../pages/user/Dashboard";
import JobPosts from "../pages/company/JobPosts";
import CreateJob from "../pages/company/CreateJob";
import Applicants from "../pages/company/Applicants";
import ApplicantDetails from "../pages/company/ApplicantDetails";
import Employees from "../pages/company/Employees";
import CompanyDashboard from "../pages/company/Dashboard";
import CompanyInterviews from "../pages/company/Interviews";
import CompanySettings from "../pages/company/Settings";
import CompanyProfile from "../pages/company/Profile";
import Users from "../pages/admin/Users";
import Companies from "../pages/admin/Companies";
import Reports from "../pages/admin/Reports";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminJobs from "../pages/admin/Jobs";
import AdminSettings from "../pages/admin/Settings";
import Enter_OTP from "../pages/company/Enter_OTP";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: "auth/signin", element: <Login /> },
      {path: "auth/verify-otp", element: <Enter_OTP />},
    ],
  },

  {
    path: "/user",
    element: (
      // <ProtectedRoute allowedRoles={["USER"]}>
        <UserLayout />
      // {/* </ProtectedRoute> */}
    ),
    children: [
      { index: true, element: <UserDashboard /> },
      { path: "profile", element: <UserProfile /> },
      { path: "jobs", element: <Jobs /> },
      { path: "jobs/:id", element: <JobDetails /> },
      { path: "applications", element: <Applications /> },
      { path: "tests/:id", element: <Tests /> },
      { path: "interviews", element: <UserInterviews /> },
      { path: "settings", element: <UserSettings /> },
    ],
  },

  {
    path: "/company",
    element: (
      // <ProtectedRoute allowedRoles={["COMPANY"]}>
        <CompanyLayout />
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CompanyDashboard /> },
      { path: "profile", element: <CompanyProfile /> },
      { path: "jobs", element: <JobPosts /> },
      { path: "jobs/create", element: <CreateJob /> },
      { path: "jobs/:id/applicants", element: <Applicants /> },
      { path: "applicants/:id", element: <ApplicantDetails /> },
      { path: "interviews", element: <CompanyInterviews /> },
      { path: "employees", element: <Employees /> },
      { path: "settings", element: <CompanySettings /> },
    ],
  },

  {
    path: "/admin",
    element: (
      // <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AdminLayout />
      // </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <Users /> },
      { path: "companies", element: <Companies /> },
      { path: "jobs", element: <AdminJobs /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <AdminSettings /> },
    ],
  },
];

export default routes;
