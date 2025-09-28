import { Link, useSearchParams } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import controller from "../../services/commonRequest";
import { enqueueSnackbar } from "notistack";

const EmailVerify = () => {
    const [searchParams] = useSearchParams();
    const message = searchParams.get("message");
    const error = searchParams.get("error");

    const [loading, _] = useState(false);

    const handleResend = async () => {
        try {
            await controller.post("/auth/resend-verification", { token: searchParams.get("token") });
            enqueueSnackbar("Verification email sent again!", { variant: "success" });
        } catch (error: any) {
            enqueueSnackbar(error.response?.data?.message || "Failed to resend email", { variant: "error" });
        }
    };



    const isSuccess = message && !error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-5">
                <div className="flex flex-col items-center mb-2">
                    <h1 className="text-3xl font-bold text-[#222] mb-1">
                        Hire<span className="text-green-600">Port</span>
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {isSuccess ? "Email verification successful" : "Email verification failed"}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    {isSuccess ? (
                        <CheckCircleIcon className="h-16 w-16 text-green-600" />
                    ) : (
                        <XCircleIcon className="h-16 w-16 text-red-500" />
                    )}

                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-[#222] mb-2">
                            {message || error}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {isSuccess
                                ? "Your email has been successfully verified. You can sign in now!"
                                : "This link may be expired or already used."}
                        </p>
                    </div>

                    {isSuccess ? (
                        <Link
                            to="/auth/signin"
                            className="w-full bg-green-600 text-white rounded-lg py-2 font-semibold hover:bg-green-700 transition text-center"
                        >
                            Jump Right Back to Login
                        </Link>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={loading}
                            className={`w-full rounded-lg py-2 font-semibold transition ${loading
                                ? "bg-gray-400 cursor-not-allowed text-gray-100"
                                : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                        >
                            {loading ? <Loader2 className="animate-spin inline-block mr-2" /> : null}
                            Send Verification Email Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerify;
