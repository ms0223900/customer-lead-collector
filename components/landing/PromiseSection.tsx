import { PROMISE_BODY, PROMISE_HEADLINE } from "@/lib/landing/content";

export function PromiseSection() {
  return (
    <section className="bg-card py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-20">
        <h2 className="mb-8 text-2xl font-bold text-on-background sm:text-3xl">課程承諾</h2>
        <div className="rounded-2xl border-2 border-secondary bg-background-alt p-6 sm:p-10">
          <h3 className="mb-4 text-2xl font-bold text-on-background sm:text-3xl">
            {PROMISE_HEADLINE}
          </h3>
          <p className="text-base leading-relaxed text-on-background-muted sm:text-lg">
            {PROMISE_BODY}
          </p>
        </div>
      </div>
    </section>
  );
}
