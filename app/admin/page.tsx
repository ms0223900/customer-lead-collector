import { AdminShell } from "@/components/admin/AdminShell";
import { LeadsEmptyState } from "@/components/admin/LeadsEmptyState";
import { LeadsErrorBanner } from "@/components/admin/LeadsErrorBanner";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { LEADS_LOAD_ERROR } from "@/lib/admin/constants";
import { getLeadsList } from "@/lib/leads/queries";

export default async function AdminPage() {
  let leads: Awaited<ReturnType<typeof getLeadsList>> | undefined;
  let loadError = false;

  try {
    leads = await getLeadsList();
  } catch (error) {
    loadError = true;
    if (error instanceof Error && error.message !== LEADS_LOAD_ERROR) {
      console.error("AdminPage unexpected error:", error);
    }
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-on-background">等候名單</h1>
          <p className="mt-1.5 text-sm text-on-background-muted">
            {loadError
              ? "無法載入資料"
              : `共 ${leads?.length ?? 0} 筆 · 資料來源 leads 表`}
          </p>
        </div>

        {loadError ? (
          <>
            <LeadsErrorBanner />
            <div
              className="overflow-hidden rounded-xl border border-border bg-card opacity-50"
              aria-hidden
            >
              <div className="h-11 bg-card-muted" />
              <div className="h-14 border-t border-border" />
              <div className="h-14 border-t border-border" />
              <div className="h-14 border-t border-border" />
            </div>
          </>
        ) : leads && leads.length === 0 ? (
          <LeadsEmptyState />
        ) : leads ? (
          <LeadsTable leads={leads} />
        ) : null}
      </div>
    </AdminShell>
  );
}
