import { LEADS_EMPTY_DESC, LEADS_EMPTY_TITLE } from "@/lib/admin/constants";

export function LeadsEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card px-6 py-16 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full bg-background-alt text-3xl"
        aria-hidden
      >
        📋
      </div>
      <h2 className="text-xl font-semibold text-on-background">{LEADS_EMPTY_TITLE}</h2>
      <p className="max-w-md text-sm leading-relaxed text-on-background-muted">
        {LEADS_EMPTY_DESC}
      </p>
    </div>
  );
}
