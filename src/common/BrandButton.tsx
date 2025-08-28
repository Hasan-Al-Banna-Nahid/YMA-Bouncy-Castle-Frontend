import { cn } from "@/lib/utils";
import * as React from "react";

export function BrandButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "h-[56px] px-6 inline-flex items-center justify-center font-extrabold tracking-wide",
        "bg-brand text-white hover:bg-black transition duration-300 cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}
