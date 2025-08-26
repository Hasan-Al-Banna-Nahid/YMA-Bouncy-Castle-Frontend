"use client";

import api from "@/api/api";
import { Input } from "@/common/Input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { LoginValues, RegisterValues } from "@/types/auth";
import { User } from "@/types/user";
import { loginSchema, registerSchema } from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
type NormalizedLogin = { user: User; message?: string };
type ApiError = { message?: string };
export default function AuthForm() {
  const [mode, setMode] = React.useState<"login" | "register">("login");
  const router = useRouter();
  const { setUser } = useAuthStore();
  /* ------------------------------ LOGIN ------------------------------ */
  const loginForm = useForm<LoginValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
    mode: "onBlur",
  });

  const loginMutation = useMutation<
    NormalizedLogin,
    AxiosError<ApiError>,
    LoginValues
  >({
    mutationFn: async (payload) => {
      const res = await api.post<{ message?: string; data: { user: User } }>(
        "/auth/login",
        payload
      );
      const body = res.data;
      return { user: body.data.user, message: body.message };
    },
    onSuccess({ user, message }) {
      setUser(user);
      toast.success(message ?? "Logged in successfully.");
      router.push("/my-account");
    },
    onError(error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmitLogin = loginForm.handleSubmit((values) =>
    loginMutation.mutate(values)
  );

  /* ----------------------------- REGISTER ---------------------------- */
  const registerForm = useForm<RegisterValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onBlur",
  });

  const registerMutation = useMutation<
    { message?: string },
    AxiosError<{ message?: string }>,
    RegisterValues
  >({
    mutationFn: async (payload) => {
      const { data } = await api.post<{ message?: string }>(
        "/auth/register",
        payload
      );
      return data;
    },
    onSuccess(data) {
      toast.success(
        data?.message ??
          "Registration successful. Check your inbox for the link."
      );
      // optional: move user to login and clear fields for a crisp UX
      setMode("login");
      registerForm.reset();
    },
    onError(error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmitRegister = registerForm.handleSubmit((values) =>
    registerMutation.mutate(values)
  );

  return (
    <>
      <div className="mx-auto w-full max-w-[620px] px-4 py-10">
        {/* Title + switcher (matches your look) */}
        <div className="mb-8 flex items-center gap-3">
          <h1
            className={cn(
              "text-[34px] font-black leading-none",
              "text-foreground"
            )}
          >
            {mode === "login" ? "Login" : "Create Account"}
          </h1>

          <span className="text-gray-400">or</span>

          <button
            type="button"
            onClick={() =>
              setMode((m) => (m === "login" ? "register" : "login"))
            }
            className="relative text-base font-semibold hover:text-brand focus:text-brand cursor-pointer"
          >
            {mode === "login" ? "Create Account" : "Login"}
            <span className="absolute -bottom-[6px] left-0 h-[1px] w-full bg-foreground/60" />
          </button>
        </div>

        {/* ------------------------------ LOGIN VIEW ------------------------------ */}
        {mode === "login" ? (
          <FormProvider {...loginForm}>
            <form onSubmit={onSubmitLogin} className="space-y-6">
              <Input
                name="email"
                label="Email address *"
                placeholder="Email address *"
                autoComplete="email"
              />

              <Input
                name="password"
                type="password"
                label="Password *"
                placeholder="Password *"
                autoComplete="current-password"
              />

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-input text-brand"
                    {...loginForm.register("remember")}
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm underline-offset-4 hover:underline"
                >
                  Lost your password?
                </Link>
              </div>

              <Button
                type="submit"
                className="h-14 w-full bg-brand text-white hover:bg-black transition duration-300"
                disabled={loginMutation.isPending}
              >
                {!loginMutation.isError && loginMutation.isPending
                  ? "LOGGING IN..."
                  : "LOG IN"}
              </Button>

              {loginMutation.isError && (
                <p className="text-sm text-destructive">
                  {loginMutation.error.response?.data?.message ??
                    "Failed to login."}
                </p>
              )}
            </form>
          </FormProvider>
        ) : (
          /* ----------------------------- REGISTER VIEW ---------------------------- */
          <FormProvider {...registerForm}>
            <form onSubmit={onSubmitRegister} className="space-y-6">
              {/* Design polish: tighter label spacing, consistent field widths */}
              <div className="grid grid-cols-1 gap-6">
                <Input
                  name="name"
                  label="Full name *"
                  placeholder="Full name *"
                  autoComplete="name"
                />

                <Input
                  name="email"
                  label="Email address *"
                  placeholder="Email address *"
                  autoComplete="email"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    name="password"
                    type="password"
                    label="Password *"
                    placeholder="Password *"
                    autoComplete="new-password"
                  />
                  <Input
                    name="passwordConfirm"
                    type="password"
                    label="Confirm password *"
                    placeholder="Confirm password *"
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Helper copy — aligned to your WordPress page style */}
              <div className="space-y-3 text-[15px] text-black leading-7">
                <p>
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </p>
              </div>

              <Button
                type="submit"
                className="h-14 w-full bg-brand text-white hover:bg-black cursor-pointer transition duration-300"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "REGISTERING..." : "REGISTER"}
              </Button>

              {registerMutation.isError && (
                <p className="text-sm text-destructive">
                  {registerMutation.error.response?.data?.message ??
                    "Failed to register."}
                </p>
              )}

              {registerMutation.isSuccess && (
                <p className="text-sm text-green-600">
                  Check your inbox for the password setup link.
                </p>
              )}
            </form>
          </FormProvider>
        )}
      </div>
    </>
  );
}
