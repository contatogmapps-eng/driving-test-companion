import * as yup from "yup";

const email = yup
  .string()
  .trim()
  .required("Email is required")
  .email("Enter a valid email address");

const password = yup
  .string()
  .required("Password is required")
  .min(8, "Password must contain at least 8 characters");

export const forgotPasswordSchema = yup.object({ email });

export const loginSchema = yup.object({
  email,
  password,
});

export const registerSchema = yup.object({
  fullName: yup.string().trim().required("Full name is required"),
  email,
  password,
  passwordConfirmation: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),

  terms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms of Use and Privacy Policy"),
});

export type ForgotPasswordData = yup.InferType<typeof forgotPasswordSchema>;
export type LoginData = yup.InferType<typeof loginSchema>;
export type RegisterData = yup.InferType<typeof registerSchema>;
