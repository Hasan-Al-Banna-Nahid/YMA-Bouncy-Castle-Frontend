"use client";

import api from "@/api/api";
import { Input } from "@/common/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

import { BrandButton } from "@/common/BrandButton";
import PageHeader from "@/components/PageHeader";
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message?: string;
};

const contactSchema: yup.ObjectSchema<ContactValues> = yup.object({
  name: yup.string().trim().required("Your name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().trim().required("Subject is required"),
  message: yup.string().optional(),
});

export default function ContactPage() {
  const methods = useForm<ContactValues>({
    mode: "onBlur",
    resolver: yupResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = methods;

  const mutation = useMutation<
    { message?: string },
    AxiosError<{ message?: string }>,
    ContactValues
  >({
    mutationFn: async (payload) => {
      const { data } = await api.post<{ message?: string }>("/mail/send", {
        ...payload,
        to: "kabir.ahmed110351@gmail.com",
        fromName: "YMA",
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data?.message ?? "Your message has been sent.");
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message ?? "Failed to send message.");
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <section className="w-full">
      <PageHeader title="Contact" crumbRight="CONTACT" />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[320px_1fr]">
          {/* ---------------------------- Left: details ---------------------------- */}
          <aside className="relative rounded-sm bg-[var(--color-brand)] text-white">
            {/* header */}
            <div className="px-6 sm:px-7 py-6 border-b border-white/30">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-6 bg-white/80" />
                <h3 className="text-lg font-extrabold tracking-wide">
                  Contact Details
                </h3>
              </div>
            </div>

            {/* items */}
            <ul className="px-6 sm:px-7 py-5 space-y-7">
              <li>
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center h-10 w-10 rounded-full border border-white/40">
                    <HiOutlineLocationMarker className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white/85 text-[13px]">
                      Head Office Address
                    </div>
                    <div className="mt-1 font-extrabold leading-6">
                      28 Roding Road
                      <br />
                      Loughton
                      <br />
                      IG10 3ED
                      <br />
                      United Kingdom
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-white/20" />
              </li>

              <li>
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center h-10 w-10 rounded-full border border-white/40">
                    <HiOutlinePhone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white/85 text-[13px]">
                      For Rental Support
                    </div>
                    <a
                      href="tel:07951431111"
                      className="mt-1 block font-extrabold hover:opacity-90"
                    >
                      07951431111
                    </a>
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-white/20" />
              </li>

              <li>
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center h-10 w-10 rounded-full border border-white/40">
                    <HiOutlineClock className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white/85 text-[13px]">
                      The Office Hours
                    </div>
                    <div className="mt-1 font-extrabold">
                      7 days a week– 8am to 7pm
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-px w-full bg-white/20" />
              </li>

              <li>
                <div className="flex items-start gap-4">
                  <div className="grid place-items-center h-10 w-10 rounded-full border border-white/40">
                    <HiOutlineMail className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-white/85 text-[13px]">
                      Send Us Email
                    </div>
                    <a
                      href="mailto:info@ymabouncycastles.uk"
                      className="mt-1 block font-extrabold hover:opacity-90"
                    >
                      info@ymabouncycastles.uk
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            {/* bottom accent line to mimic screenshot */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20" />
          </aside>

          {/* ----------------------------- Right: form ----------------------------- */}
          <FormProvider {...methods}>
            <form
              onSubmit={onSubmit}
              className="rounded-sm bg-white"
              noValidate
            >
              <div className="px-4 sm:px-6 lg:px-8">
                <h2 className="text-[30px] sm:text-[34px] font-extrabold text-[#0c1116]">
                  Send a Message
                </h2>

                {/* subtitle note */}
                <p className="mt-3 text-[14px] text-[#6e7680]">
                  Your email address will not be published. Required fields are
                  marked with *
                </p>

                <div className="mt-6 grid gap-5">
                  <Input
                    name="name"
                    label="Your name *"
                    placeholder="Your name"
                    autoComplete="name"
                  />

                  <Input
                    name="email"
                    label="Your email *"
                    placeholder="Your email"
                    autoComplete="email"
                  />

                  <Input
                    name="subject"
                    label="Subject *"
                    placeholder="Subject"
                  />

                  {/* Textarea (RHF Controller to keep same style as inputs) */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-foreground"
                    >
                      Your message
                    </label>
                    <Controller
                      control={control}
                      name="message"
                      render={({ field, fieldState }) => (
                        <>
                          <textarea
                            id="message"
                            rows={8}
                            className={[
                              "w-full rounded-none border border-[#E5E7EB] bg-transparent",
                              "px-4 py-3 text-[15px] leading-6 outline-none",
                              "focus-visible:border-foreground/60",
                              fieldState.invalid ? "border-destructive" : "",
                            ].join(" ")}
                            placeholder=""
                            {...field}
                          />
                          {fieldState.error?.message && (
                            <span className="text-xs text-destructive">
                              {fieldState.error.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-7">
                  <BrandButton
                    type="submit"
                    disabled={isSubmitting || mutation.isPending}
                  >
                    {isSubmitting || mutation.isPending
                      ? "SENDING..."
                      : "SUBMIT"}
                  </BrandButton>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
