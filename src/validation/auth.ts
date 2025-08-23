import { LoginValues, RegisterValues } from "@/types/auth";
import * as yup from "yup";

export const loginSchema: yup.Schema<LoginValues> = yup.object({
  emailOrUsername: yup
    .string()
    .required("Username or email is required")
    .max(140, "Too long"),
  password: yup.string().required("Password is required"),
  remember: yup.boolean().optional(),
});

export const registerSchema: yup.Schema<RegisterValues> = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .max(100, "Name is too long"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  passwordConfirm: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
