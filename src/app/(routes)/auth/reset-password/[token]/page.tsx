"use client";

import api from "@/api/api";
import { BrandButton } from "@/common/BrandButton";
import { Input } from "@/common/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

/* ---------------- Types & validation ---------------- */
type ResetValues = {
  password: string;
  passwordConfirm: string;
};

const schema: yup.ObjectSchema<ResetValues> = yup.object({
  password: yup
    .string()
    .required("New password is required")
    .min(8, "Must be at least 8 characters"),
  passwordConfirm: yup
    .string()
    .required("Please re-enter the new password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

/* ---------------- Page ---------------- */
export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();

  const methods = useForm<ResetValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const mutation = useMutation<
    { message?: string },
    AxiosError<{ message?: string }>,
    ResetValues
  >({
    // If your API expects token in the URL, keep it like this:
    mutationFn: async (payload) => {
      const { data } = await api.post<{ message?: string }>(
        `/auth/reset-password/${token}`,
        payload
      );
      return data;
    },
    // (If your API expects token in the body, swap to:
    // () => api.post(`/auth/reset-password`, { token, ...payload }))
    onSuccess: (data) => {
      toast.success(data?.message ?? "Password has been updated.");
      router.push("/auth"); // back to login
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ?? "Could not reset password. Try again."
      );
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <FormProvider {...methods}>
      <section className="w-full">
        <div className="mx-auto w-full max-w-[620px] px-4 py-10">
          {/* Intro copy (matches screenshot proportions/spacing) */}
          <p className="text-[15px] leading-7 text-[#0c1116]">
            Enter a new password below.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <Input
              name="password"
              type="password"
              label="New password *"
              placeholder=""
              autoComplete="new-password"
            />

            <Input
              name="passwordConfirm"
              type="password"
              label="Re-enter new password *"
              placeholder=""
              autoComplete="new-password"
            />

            <BrandButton
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="w-full sm:w-[200px]"
            >
              {isSubmitting || mutation.isPending ? "SAVING..." : "SAVE"}
            </BrandButton>
          </form>
        </div>
      </section>
    </FormProvider>
  );
}
