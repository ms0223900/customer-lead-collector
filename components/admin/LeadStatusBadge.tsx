import { STATUS_BADGE_STYLES } from "@/lib/admin/constants";
import type { LeadStatus } from "@/lib/leads/types";

type LeadStatusBadgeProps = {
  status: LeadStatus;
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  const style = STATUS_BADGE_STYLES[status] ?? STATUS_BADGE_STYLES["新名單"];

  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ color: style.fg, backgroundColor: style.bg }}
    >
      {status}
    </span>
  );
}
