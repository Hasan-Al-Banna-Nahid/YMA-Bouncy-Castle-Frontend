import type { LoginValues, RegisterValues } from "@/types/auth";
import * as yup from "yup";

/** LOGIN */
export const loginSchema: yup.ObjectSchema<LoginValues> = yup
  .object({
    email: yup.string().required("Email is required").max(140, "Too long"),
    password: yup.string().required("Password is required"),
    remember: yup.boolean().optional(),
  })
  .required();

/** REGISTER */
export const registerSchema: yup.ObjectSchema<RegisterValues> = yup
  .object({
    name: yup
      .string()
      .required("Name is required")
      .max(120, "Name is too long"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    passwordConfirm: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
