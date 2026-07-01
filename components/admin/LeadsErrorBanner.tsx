import { LEADS_LOAD_ERROR } from "@/lib/admin/constants";

export function LeadsErrorBanner() {
  return (
    <div
      className="rounded-lg border border-error bg-error-bg px-4 py-3.5 text-sm font-medium text-error"
      role="alert"
    >
      {LEADS_LOAD_ERROR}
    </div>
  );
}
