import { AUDIENCE } from "@/lib/landing/content";

export function AudienceSection() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-20">
        <h2 className="mb-8 text-2xl font-bold text-on-background sm:text-3xl">適合對象</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AUDIENCE.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <span
                className="material-symbols-outlined mt-0.5 text-secondary"
                aria-hidden
              >
                check_circle
              </span>
              <span className="text-sm text-on-background sm:text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
