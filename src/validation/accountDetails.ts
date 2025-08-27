import * as yup from "yup";

export const accountDetailsSchema = yup.object({
  name: yup.string().trim().min(2).required(),
  email: yup.string().email().required(),
  currentPassword: yup.string().trim().optional(),
  newPassword: yup
    .string()
    .trim()
    .when("currentPassword", {
      is: (v: string) => !!v,
      then: (s) =>
        s.min(6, "Minimum 6 characters").required("New password required"),
      otherwise: (s) => s.optional(),
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
  photo: yup.mixed().optional(),
});
