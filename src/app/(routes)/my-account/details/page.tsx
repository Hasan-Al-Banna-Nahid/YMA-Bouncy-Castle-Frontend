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
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AccountDetailsPage() {
  const { user, setUser } = useAuthStore();
  const qc = useQueryClient();

  const methods = useForm<AccountDetailsValues>({
    mode: "onBlur",
    resolver: yupResolver(
      accountDetailsSchema
    ) as Resolver<AccountDetailsValues>,
    defaultValues: {
      name: "",
      email: "",
      // Keep text inputs controlled from the start
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      // File inputs should not be given a value prop; leaving as null here is fine
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

  // Keep reset values in the same "shape" as defaultValues
  useEffect(() => {
    if (!user) return;
    reset({
      name: user.name ?? "",
      email: user.email ?? "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      photo: null, // leave file input uncontrolled
    });
  }, [user, reset]);

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

  type UpdateMeResponse = { message?: string; data?: { user?: any } };

  const updateMe = useMutation<
    UpdateMeResponse,
    AxiosError<{ message?: string }>,
    AccountDetailsValues
  >({
    mutationFn: async (values) => {
      const fd = new FormData();
      fd.append("name", values.name ?? "");

      if (values.photo && values.photo[0]) {
        fd.append("photo", values.photo[0]);
      }

      if (values.currentPassword)
        fd.append("currentPassword", values.currentPassword);
      if (values.newPassword) fd.append("newPassword", values.newPassword);
      if (values.confirmPassword)
        fd.append("newPasswordConfirm", values.confirmPassword);

      const { data } = await api.patch<UpdateMeResponse>("/auth/update-me", fd);
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
    const wantsPasswordChange =
      !!values.currentPassword ||
      !!values.newPassword ||
      !!values.confirmPassword;

    if (wantsPasswordChange) {
      if (
        !values.currentPassword ||
        !values.newPassword ||
        !values.confirmPassword
      ) {
        toast.error(
          "To change your password, fill current, new, and confirm fields."
        );
        return;
      }
      if (values.newPassword !== values.confirmPassword) {
        toast.error("New password and confirmation do not match.");
        return;
      }
    }

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
                  <Image
                    src={currentPhoto}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full object-cover border"
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

            <div className="grid grid-cols-1 gap-6">
              <Input
                name="name"
                label="Name *"
                placeholder="Your full name"
                autoComplete="name"
              />
              <Input
                name="email"
                label="Email address"
                placeholder="Email address"
                autoComplete="email"
                disabled
              />
              <p className="text-[13px] italic text-black -mt-2">
                You can update your name and profile photo. Email is not
                editable.
              </p>
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
                label="Current password (leave blank to keep existing)"
                placeholder=""
                autoComplete="current-password"
              />
              <Input
                name="newPassword"
                type="password"
                label="New password (leave blank to keep existing)"
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
