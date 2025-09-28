import { Formik, Form, Field, ErrorMessage } from "formik";
import EyeIcon from "./EyeIcon";
import { enqueueSnackbar } from "notistack";
import { userLoginSchema } from "../../../validations/userValidation";
import { companyLoginSchema } from "../../../validations/companyValidation";
import controller from "../../../services/commonRequest";
import endpoints from "@/services/api";

export const loginUser = async (data: { email: string; password: string }) => {
    return controller.post(`${endpoints.users}/login`, data);
};

export const loginCompany = async (data: { email: string, password: string }) => {
    return controller.post(`${endpoints.company}/login`, data);
}

const LoginForm = ({
    active,
    loginTab,
    setLoginTab,
    showLoginUserPassword,
    setShowLoginUserPassword,
    showLoginCompanyPassword,
    setShowLoginCompanyPassword,
}: any) => {
    const initialUserValues = { email: "", password: "" };
    const initialCompanyValues = { email: "", password: "" };

    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            let res;
            if (loginTab === "user") {
                res = await loginUser(values);
            } else {
                res = await loginCompany(values);
            }

            enqueueSnackbar("Login successful!", { variant: "success" });
            console.log("Login response:", res);

            localStorage.setItem("token", res.data.token);
            console.log(res)
            if (loginTab === "company" && res.data.company.forcePasswordReset) {
                window.location.href = "/company/profile?setPassword=true";
            } else {
                // window.location.href = loginTab === "user" ? "/user" : "/company";
                console.log("errror")
            }

            resetForm();
        } catch (error: any) {
            enqueueSnackbar(error?.response?.data?.message || "Login failed", {
                variant: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div
            className={`w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white px-6 md:px-12 py-10 transition-all duration-700 z-20 ${active ? "-translate-x-full opacity-0 md:block hidden" : "translate-x-0 opacity-100"
                }`}
        >
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">Sign In</h2>

            {/* Tabs */}
            <div className="flex mb-6 space-x-4">
                <button
                    onClick={() => setLoginTab("user")}
                    type="button"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${loginTab === "user"
                        ? "bg-green-900 text-white scale-105 shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    User
                </button>
                <button
                    onClick={() => setLoginTab("company")}
                    type="button"
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${loginTab === "company"
                        ? "bg-green-900 text-white scale-105 shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Company
                </button>
            </div>

            <Formik
                initialValues={loginTab === "user" ? initialUserValues : initialCompanyValues}
                validationSchema={loginTab === "user" ? userLoginSchema : companyLoginSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, isValid }) => (
                    <Form className="w-full max-w-sm space-y-5">
                        {/* Email */}
                        <div>
                            <Field
                                name="email"
                                type="email"
                                placeholder={loginTab === "user" ? "Email" : "Company Email"}
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Field
                                name="password"
                                type={loginTab === "user" ? (showLoginUserPassword ? "text" : "password") : (showLoginCompanyPassword ? "text" : "password")}
                                placeholder="Password"
                                className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    loginTab === "user"
                                        ? setShowLoginUserPassword((s: any) => !s)
                                        : setShowLoginCompanyPassword((s: any) => !s)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                <EyeIcon open={loginTab === "user" ? showLoginUserPassword : showLoginCompanyPassword} />
                            </button>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className={`w-full py-3 rounded-full font-semibold transition ${isSubmitting || !isValid
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "bg-green-900 text-white hover:bg-green-800"
                                }`}
                        >
                            {loginTab === "user" ? "Login as User" : "Login as Company"}
                        </button>

                        {/* Google login only for user */}
                        {loginTab === "user" && (
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
                            >
                                <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
                                <span className="text-gray-700 font-medium">Sign in with Google</span>
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
