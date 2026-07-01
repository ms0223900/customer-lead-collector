import { MODULES } from "@/lib/landing/content";

export function ModulesSection() {
  return (
    <section className="bg-card py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-20">
        <h2 className="mb-3 text-2xl font-bold text-on-background sm:text-3xl">
          課程內容摘要
        </h2>
        <p className="mb-10 text-on-background-muted">
          從選題到上線，六個關鍵步驟帶你走完最小成功路線
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => (
            <article
              key={mod.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-background p-5"
            >
              <span className="text-xs font-semibold text-secondary">{mod.step}</span>
              <h3 className="text-base font-semibold text-on-background">{mod.title}</h3>
              <p className="text-sm text-on-background-muted">{mod.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
