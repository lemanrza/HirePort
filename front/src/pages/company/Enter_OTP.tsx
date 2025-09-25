import { useState } from "react";
import controller from "../../services/commonRequest";
import { enqueueSnackbar } from "notistack";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const companyId = new URLSearchParams(window.location.search).get("companyId");

  const handleVerify = async () => {
    try {
      setLoading(true);
      await controller.post("/auth/verifyCompanyOtp", { companyId, otp });
      enqueueSnackbar("Phone verified successfully!", { variant: "success" });
      window.location.href = "/login"; 
    } catch (error) {
      enqueueSnackbar("Invalid or expired OTP", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Verify Phone Number</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border rounded-lg mb-4"
        />
        <button
          onClick={handleVerify}
          disabled={loading || !otp}
          className={`w-full py-2 rounded-lg text-white font-semibold ${
            loading || !otp ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
