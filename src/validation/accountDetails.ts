import type { AccountDetailsValues } from "@/types/user";
import * as yup from "yup";

const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

export const accountDetailsSchema: yup.ObjectSchema<AccountDetailsValues> = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    displayName: yup.string().required("Display name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),

    // Source field (no dependency on others)
    newPassword: yup
      .string()
      .transform(emptyToUndefined)
      .min(6, "Password must be at least 6 characters")
      .optional(),

    // Depends ONLY on newPassword
    currentPassword: yup
      .string()
      .transform(emptyToUndefined)
      .when("newPassword", {
        is: (np: unknown) => Boolean(np),
        then: (s) => s.required("Current password is required"),
        otherwise: (s) => s.optional(),
      }),

    photo: yup.mixed<FileList>().nullable().optional(),

    // Depends ONLY on newPassword
    confirmPassword: yup
      .string()
      .transform(emptyToUndefined)
      .when("newPassword", {
        is: (np: unknown) => Boolean(np),
        then: (s) =>
          s
            .required("Please confirm your new password")
            .oneOf([yup.ref("newPassword")], "Passwords do not match"),
        otherwise: (s) => s.optional(),
      }),
  })
  .required();
