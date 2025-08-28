"use client";

import "./loader.css";

type Props = {
  fullscreen?: boolean; // show a page overlay
  label?: string; // optional text under the spinner
};

export default function Loader({
  fullscreen = true,
  label = "Loading…",
}: Props) {
  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-50 grid place-items-center bg-white/70 backdrop-blur-sm"
          : "grid place-items-center p-6"
      }
    >
      <div
        className="flex flex-col items-center gap-3"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="loader" />
        <span className="sr-only">{label}</span>
        {!fullscreen && <p className="text-sm text-gray-500">{label}</p>}
      </div>
    </div>
  );
}
