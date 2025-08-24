"use client";
import { Button } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import { FiEyeOff } from "react-icons/fi";
type InputProps = {
  name: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, type, label, defaultValue, className, ...rest }, ref) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field, fieldState }) => {
          const isPassword = type === "password";
          return (
            <div className="w-full flex flex-col gap-1">
              {label && <Label>{label}</Label>}
              <div className="relative">
                <ShadcnInput
                  id={name}
                  type={
                    isPassword ? (showPassword ? "text" : "password") : type
                  }
                  {...field}
                  {...rest}
                  ref={ref}
                  className={cn(
                    className,
                    isPassword && "pr-10",
                    "focus-visible:border-1",
                    fieldState.invalid && "border-destructive",
                    "placeholder:text-gray-300"
                  )}
                />
                {isPassword && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <FiEyeOff size={16} className=" text-gray-400" />
                    ) : (
                      <FaEye size={16} className=" text-gray-400" />
                    )}
                  </Button>
                )}
              </div>
              {fieldState.error?.message && (
                <span className="text-xs text-destructive">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          );
        }}
      />
    );
  }
);

Input.displayName = "Input";
