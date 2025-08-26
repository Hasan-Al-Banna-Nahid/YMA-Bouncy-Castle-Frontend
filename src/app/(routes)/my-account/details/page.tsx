"use client";

import api from "@/api/api";
import { BrandButton } from "@/common/BrandButton";
import { Input } from "@/common/Input";
import { useAuthStore } from "@/store/auth-store";
import { AccountDetailsValues } from "@/types/user";
import { accountDetailsSchema } from "@/validation/accountDetails";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = AccountDetailsValues;

export default function AccountDetailsPage() {
  const { user, setUser } = useAuthStore();
  const qc = useQueryClient();

  const methods = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(accountDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      photo: null,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    register,
    watch,
  } = methods;

  // --- Pre-fill from store user ---
  const parsed = useMemo(() => {
    const full = (user?.name ?? "").trim();
    if (!full) return { firstName: "", lastName: "" };
    const parts = full.split(/\s+/);
    const firstName = parts[0] ?? "";
    const lastName = parts.slice(1).join(" ");
    return { firstName, lastName };
  }, [user?.name]);

  useEffect(() => {
    if (!user) return;
    reset({
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      displayName: user.name ?? "",
      email: user.email ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      photo: null,
    });
  }, [user, parsed, reset]);

  // --- Local preview for a newly chosen photo ---
  const fileList = watch("photo");
  const file = fileList?.[0];
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const objUrl = URL.createObjectURL(file);
    setPreviewUrl(objUrl);
    return () => URL.revokeObjectURL(objUrl);
  }, [file]);

  const currentPhoto = previewUrl || (user as any)?.photo || "";

  // --- Mutation: /auth/update-me ---
  type UpdateMeResponse = { message?: string; data?: { user?: any } };

  const updateMe = useMutation<
    UpdateMeResponse,
    AxiosError<{ message?: string }>,
    FormValues
  >({
    mutationFn: async (values) => {
      const fd = new FormData();
      fd.append("firstName", values.firstName ?? "");
      fd.append("lastName", values.lastName ?? "");
      fd.append("displayName", values.displayName ?? "");
      fd.append("email", values.email ?? "");
      if (values.currentPassword)
        fd.append("currentPassword", values.currentPassword);
      if (values.newPassword) fd.append("newPassword", values.newPassword);
      if (values.confirmPassword)
        fd.append("confirmPassword", values.confirmPassword);
      if (values.photo && values.photo[0]) fd.append("photo", values.photo[0]);

      const { data } = await api.post<UpdateMeResponse>("/auth/update-me", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      return data;
    },
    onSuccess: (data) => {
      const updated = data?.data?.user;
      if (updated) setUser(updated);
      qc.invalidateQueries({ queryKey: ["user"] });
      toast.success(data?.message ?? "Account updated successfully.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message ?? "Failed to update account.");
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    updateMe.mutate(values);
  });

  return (
    <FormProvider {...methods}>
      <section className="w-full">
        <div className="mx-auto w-full max-w-[980px] px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Profile photo */}
            <div className="space-y-3">
              <h2 className="text-[20px] md:text-[22px] font-extrabold tracking-wide">
                PROFILE PHOTO
              </h2>
              <div className="flex items-center gap-4">
                {currentPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentPhoto}
                    alt="Profile"
                    className="h-16 w-16 rounded-full object-cover border"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 border" />
                )}
                <div>
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-[#0c1116]"
                  >
                    Change image
                  </label>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    {...register("photo")}
                    className="mt-2 block text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG/PNG up to ~2MB recommended.
                  </p>
                </div>
              </div>
            </div>

            {/* Top section (four fields) */}
            <div className="grid grid-cols-1 gap-6">
              <Input
                name="firstName"
                label="First name *"
                placeholder="First name *"
                autoComplete="given-name"
              />
              <Input
                name="lastName"
                label="Last name *"
                placeholder="Last name *"
                autoComplete="family-name"
              />
              <Input
                name="displayName"
                label="Display name *"
                placeholder="Display name *"
                autoComplete="nickname"
              />
              <p className="text-[13px] italic text-black -mt-2">
                This will be how your name will be displayed in the account
                section and in reviews
              </p>
              <Input
                name="email"
                label="Email address *"
                placeholder="Email address *"
                autoComplete="email"
              />
            </div>

            {/* Divider-like spacing */}
            <div className="pt-2" />

            {/* Password change section */}
            <h2 className="text-[20px] md:text-[22px] font-extrabold tracking-wide">
              PASSWORD CHANGE
            </h2>

            <div className="space-y-6">
              <Input
                name="currentPassword"
                type="password"
                label="Current password (leave blank to leave unchanged)"
                placeholder=""
                autoComplete="current-password"
              />
              <Input
                name="newPassword"
                type="password"
                label="New password (leave blank to leave unchanged)"
                placeholder=""
                autoComplete="new-password"
              />
              <Input
                name="confirmPassword"
                type="password"
                label="Confirm new password"
                placeholder=""
                autoComplete="new-password"
              />
            </div>

            {/* Save button */}
            <div className="pt-2">
              <BrandButton
                type="submit"
                disabled={isSubmitting || updateMe.isPending}
                className="w-full sm:w-[240px]"
              >
                {isSubmitting || updateMe.isPending
                  ? "SAVING..."
                  : "SAVE CHANGES"}
              </BrandButton>
            </div>
          </form>
        </div>
      </section>
    </FormProvider>
  );
}
