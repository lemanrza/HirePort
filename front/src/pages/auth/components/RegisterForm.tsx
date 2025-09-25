import { Formik, Form, Field, ErrorMessage } from "formik";
import EyeIcon from "./EyeIcon";
import controller from "../../../services/commonRequest"; // API çağırışı
import { userRegisterSchema } from "../../../validations/userValidation";
import { companyRegisterSchema } from "../../../validations/companyValidation";
import { enqueueSnackbar } from "notistack";
import PhoneInput from "react-phone-input-2";


const RegisterForm = ({
    active,
    registerTab,
    setRegisterTab,
    showRegisterUserPassword,
    setShowRegisterUserPassword,
    showRegisterUserConfirm,
    setShowRegisterUserConfirm,
}: any) => {
    const initialUserValues = {
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const initialCompanyValues = {
        email: "",
        name: "",
        hrName: "",
        hrNumber: "",
    };

    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            const endpoint =
                registerTab === "user" ? "/auth/registerUser" : "/auth/registerCompany";

            const res = await controller.post(endpoint, values);

            if (registerTab === "user") {
                enqueueSnackbar("Registered successfully. Please verify your email.", {
                    variant: "success",
                });
            } else {
                enqueueSnackbar("Company registered. OTP sent to HR phone number.", {
                    variant: "info",
                });

                // yönləndir OTP səhifəsinə
                window.location.href = `/auth/verify-otp?companyId=${res.data._id}`;
            }

            resetForm();
        } catch (error) {
            console.error("Register error:", error);
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div
            className={`w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white px-6 md:px-12 py-10 transition-all duration-700 z-20 ${active
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0 md:block hidden"
                }`}
        >
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6">
                Join Us
            </h2>

            {/* Tabs */}
            <div className="flex mb-6 space-x-4">
                <button
                    onClick={() => setRegisterTab("user")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${registerTab === "user"
                        ? "bg-green-900 text-white scale-105 shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    User
                </button>
                <button
                    onClick={() => setRegisterTab("company")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${registerTab === "company"
                        ? "bg-green-900 text-white scale-105 shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Company
                </button>
            </div>

            {/* FORM */}
            <Formik
                initialValues={
                    registerTab === "user" ? initialUserValues : initialCompanyValues
                }
                validationSchema={
                    registerTab === "user" ? userRegisterSchema : companyRegisterSchema
                }
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, isValid, setFieldValue }) => (
                    <Form className="w-full max-w-sm space-y-5">
                        {registerTab === "user" ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Field
                                            name="fullName"
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                        />
                                        <ErrorMessage
                                            name="fullName"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            name="username"
                                            type="text"
                                            placeholder="Username"
                                            className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="relative">
                                    <Field
                                        name="password"
                                        type={showRegisterUserPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowRegisterUserPassword((s: any) => !s)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <EyeIcon open={showRegisterUserPassword} />
                                    </button>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="relative">
                                    <Field
                                        name="confirmPassword"
                                        type={showRegisterUserConfirm ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowRegisterUserConfirm((s: any) => !s)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <EyeIcon open={showRegisterUserConfirm} />
                                    </button>
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Company Email"
                                        className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="Company Name"
                                        className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <Field
                                        name="hrName"
                                        type="text"
                                        placeholder="HR Name"
                                        className="w-full px-5 py-3 bg-green-50 border border-green-200 rounded-full"
                                    />
                                    <ErrorMessage
                                        name="hrName"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div>
                                    <PhoneInput
                                        country={"az"}
                                        inputProps={{
                                            name: "hrNumber",
                                            required: true,
                                            autoComplete: "tel",
                                        }}
                                        onChange={(value) => setFieldValue("hrNumber", "+" + value)}
                                        inputStyle={{
                                            width: "100%",
                                            padding: "12px 16px 12px 60px",
                                            backgroundColor: "#f0fdf4",
                                            border: "1px solid #d1fae5",
                                            borderRadius: "9999px",
                                            fontSize: "16px",
                                            fontFamily: "'Inter', sans-serif",
                                            color: "#1a202c",
                                            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                                            outline: "none",
                                        }}
                                        containerStyle={{
                                            position: "relative",
                                            marginBottom: "16px",
                                        }}
                                        buttonStyle={{
                                            borderRadius: "9999px 0 0 9999px",
                                            border: "1px solid #d1fae5",
                                            borderRight: "none",
                                            backgroundColor: "#f0fdf4",
                                            padding: "0 8px",
                                        }}
                                        dropdownStyle={{
                                            borderRadius: "8px",
                                            border: "1px solid #d1fae5",
                                            backgroundColor: "#f0fdf4",
                                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                            maxHeight: "200px",
                                            overflowY: "auto",
                                        }}
                                    />
                                    <ErrorMessage
                                        name="hrNumber"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className={`w-full py-3 rounded-full font-semibold transition ${isSubmitting || !isValid
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "bg-green-900 text-white hover:bg-green-800"
                                }`}
                        >
                            {registerTab === "user"
                                ? "Register as User"
                                : "Register as Company"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
