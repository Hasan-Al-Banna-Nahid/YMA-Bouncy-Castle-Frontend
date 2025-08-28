"use client";

import api from "@/api/api";
import { BrandButton } from "@/common/BrandButton";
import { Input } from "@/common/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

/* ---------------- Types & validation ---------------- */
type ForgotValues = {
  email: string;
};

const forgotSchema: yup.ObjectSchema<ForgotValues> = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

/* ---------------- Component ---------------- */
export default function ForgotPasswordPage() {
  const [sent, setSent] = React.useState(false);

  const methods = useForm<ForgotValues>({
    mode: "onBlur",
    resolver: yupResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const mutation = useMutation<
    { message?: string },
    AxiosError<{ message?: string }>,
    ForgotValues
  >({
    mutationFn: async (payload) => {
      const { data } = await api.post<{ message?: string }>(
        "/auth/forgot-password",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(
        data?.message ??
          "If the account exists, we’ve sent a reset link to your email."
      );
      setSent(true);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ??
          "We couldn’t process your request. Please try again."
      );
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <FormProvider {...methods}>
      <section className="w-full">
        <div className="mx-auto w-full max-w-[620px] px-4 py-10">
          {/* Description text */}
          <p className="text-[15px] leading-7 text-[#0c1116]">
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </p>

          {/* Success notice replaces the form after a successful submit */}
          {sent ? (
            <div className="mt-6 rounded-md bg-[#f7f8fa] p-4 text-[15px] leading-7 text-[#0c1116]">
              A password reset email has been sent to the email address on file
              for your account, but may take several minutes to show up in your
              inbox. Please wait at least 10 minutes before attempting another
              reset.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-6">
              <Input
                name="email"
                label="Email address *"
                placeholder="Email address *Required"
                autoComplete="email"
              />

              <BrandButton
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className="w-full sm:w-[260px]"
              >
                {isSubmitting || mutation.isPending
                  ? "PROCESSING..."
                  : "RESET PASSWORD"}
              </BrandButton>
            </form>
          )}
        </div>
      </section>
    </FormProvider>
  );
}
