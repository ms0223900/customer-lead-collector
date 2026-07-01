import { PAINS } from "@/lib/landing/content";

export function PainPointsSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-20">
        <h2 className="mb-10 text-2xl font-bold text-on-background sm:text-3xl">
          你是否也有這些卡關？
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((pain) => (
            <article
              key={pain.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background-alt text-lg font-bold text-secondary"
                aria-hidden
              >
                !
              </div>
              <h3 className="text-lg font-semibold text-on-background">{pain.title}</h3>
              <p className="text-sm leading-relaxed text-on-background-muted">{pain.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
