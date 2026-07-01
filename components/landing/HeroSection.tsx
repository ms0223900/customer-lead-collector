import {
  COURSE_NAME,
  HERO_EYEBROW,
  TAGLINE,
} from "@/lib/landing/content";

import { CtaButton } from "./CtaButton";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-background-alt to-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-16 md:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-20 lg:py-20">
        <div className="flex flex-1 flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
            {HERO_EYEBROW}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-on-background sm:text-4xl lg:text-5xl">
            {COURSE_NAME}
          </h1>
          <p className="text-lg leading-relaxed text-on-background-muted sm:text-xl">
            {TAGLINE}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton location="hero">加入等候名單</CtaButton>
            <p className="text-sm text-on-background-subtle">
              填寫表單，課程開放時第一時間通知你
            </p>
          </div>
        </div>

        <div className="w-full max-w-md flex-shrink-0 rounded-2xl border border-border bg-card p-8 shadow-sm lg:max-w-sm">
          <div className="flex flex-col gap-3 text-center">
            <span
              className="material-symbols-outlined mx-auto text-4xl text-secondary"
              aria-hidden
            >
              auto_awesome
            </span>
            <p className="text-lg font-semibold text-on-background">AI × SDD 實戰流程</p>
            <p className="text-sm text-on-background-muted">Spec → Build → Deploy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
