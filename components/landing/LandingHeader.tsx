import { LOGO_TEXT } from "@/lib/landing/content";

import { CtaButton } from "./CtaButton";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8 lg:px-20">
        <span className="text-base font-semibold text-on-background">{LOGO_TEXT}</span>
        <CtaButton location="header">加入等候名單</CtaButton>
      </div>
    </header>
  );
}
