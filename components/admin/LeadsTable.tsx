import { TABLE_COLUMNS } from "@/lib/admin/constants";
import type { Lead } from "@/lib/leads/types";

import { LeadStatusBadge } from "./LeadStatusBadge";

type LeadsTableProps = {
  leads: Lead[];
};

function formatCreatedAt(iso: string): string {
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

function displayValue(value: string | null): string {
  return value?.trim() ? value : "—";
}

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-card-muted">
            {TABLE_COLUMNS.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="px-4 py-3 font-semibold text-on-background"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-border last:border-b-0 hover:bg-background-alt/50"
            >
              <td className="px-4 py-3.5 text-on-background">
                {displayValue(lead.name)}
              </td>
              <td className="px-4 py-3.5 text-on-background-muted">{lead.email}</td>
              <td className="px-4 py-3.5 text-on-background-muted">
                {displayValue(lead.role)}
              </td>
              <td className="px-4 py-3.5">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3.5 whitespace-nowrap text-on-background-muted">
                {formatCreatedAt(lead.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
