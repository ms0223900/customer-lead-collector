"use client";

import type { ReactNode } from "react";

export type CtaLocation = "header" | "hero" | "footer";

type CtaButtonProps = {
  children: ReactNode;
  location: CtaLocation;
  className?: string;
  fullWidth?: boolean;
};

export function CtaButton({
  children,
  location,
  className = "",
  fullWidth = false,
}: CtaButtonProps) {
  function handleClick() {
    // TODO(Sprint 3): trackEvent("cta_click", { location })
    void location;

    const waitlist = document.getElementById("waitlist");
    waitlist?.scrollIntoView({ behavior: "smooth", block: "start" });

    const firstField = waitlist?.querySelector<HTMLElement>(
      "input, select, textarea",
    );
    window.setTimeout(() => firstField?.focus(), 400);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        fullWidth ? "w-full" : "w-full sm:w-auto",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
