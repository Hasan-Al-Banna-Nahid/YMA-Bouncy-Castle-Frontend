import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  text?: string;
  bgColor?: string; 
  hoverColor?: string;
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function SubscribeButton({
  text = "SUBSCRIBE",
  bgColor = "bg-[var(--color-brand)]",
  hoverColor = "hover:bg-black",
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 343 176.96"
      className="shrink-0"
      fill="white"
      aria-hidden="true"
    >
      <path
        d="M252.91-.02L232.124 20.4l25.2 24.75H0v28.88h286.72l14.7 14.44-14.7 14.45H0v28.87h257.32l-25.2 24.76 20.786 20.42 90.09-88.5z"
        fillRule="evenodd"
      />
    </svg>
  ),
  className,
  type = "submit",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "h-[52px] sm:h-[56px] w-full sm:w-auto inline-flex items-center justify-center gap-3",
        "px-5 sm:px-6 text-[14px] sm:text-[15px] font-extrabold text-white",
        "transition duration-300 cursor-pointer",
        bgColor,
        hoverColor,
        className
      )}
    >
      {text}
      {icon}
    </button>
  );
}
