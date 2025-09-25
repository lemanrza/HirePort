import * as Yup from "yup";

export const companyRegisterSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Company email is required"),
  name: Yup.string().required("Company name is required"),
  hrName: Yup.string().required("HR name is required"),
  hrNumber: Yup.string()
    .required("HR number is required")
    .matches(/^\+?[1-9]\d{6,14}$/, "Invalid phone number"),
});

export const companyLoginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Company email is required"),
  password: Yup.string().required("Password is required"),
});