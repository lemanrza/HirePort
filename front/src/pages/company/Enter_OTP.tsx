import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import controller from "../../services/commonRequest";
import { enqueueSnackbar } from "notistack";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const companyId = new URLSearchParams(window.location.search).get("companyId");

  const initialValues = {
    otp: "", // string olaraq saxlayırıq, məsələn "123456"
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .matches(/^\d{6}$/, "Please enter a valid 6-digit OTP")
      .required("OTP is required"),
  });

  const handleVerify = async (values: any, { setSubmitting }: any) => {
    try {
      setLoading(true);
      await controller.post("/auth/verifyCompanyOtp", {
        companyId,
        otp: values.otp,
      });
      enqueueSnackbar("Phone verified successfully!", { variant: "success" });
      window.location.href = "/login";
    } catch (error) {
      enqueueSnackbar("Invalid or expired OTP", { variant: "error" });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Verify Phone Number
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleVerify}
        >
          {({ isSubmitting, setFieldValue, values, errors, touched }) => (
            <Form className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={values.otp}
                  onChange={(val) => setFieldValue("otp", val)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {touched.otp && errors.otp && (
                <div className="text-red-500 text-sm text-center">
                  {errors.otp}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full py-3 rounded-full font-semibold transition bg-green-600 hover:bg-green-700"
              >
                {loading || isSubmitting ? "Verifying..." : "Verify"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOtp;
