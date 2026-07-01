import type { LeadStatus } from "@/lib/leads/types";

export const LEADS_EMPTY_TITLE = "目前尚無等候名單";
export const LEADS_EMPTY_DESC = "訪客填寫銷售頁表單後，名單會顯示於此";
export const LEADS_LOAD_ERROR = "無法載入名單，請稍後再試";

export const STATUS_BADGE_STYLES: Record<
  LeadStatus,
  { fg: string; bg: string }
> = {
  新名單: { fg: "#2563EB", bg: "#EFF6FF" },
  高意願: { fg: "#C2410C", bg: "#FFF7ED" },
  已聯絡: { fg: "#7C3AED", bg: "#F5F3FF" },
  已訪談: { fg: "#15803D", bg: "#F0FDF4" },
  不適合: { fg: "#475569", bg: "#F1F5F9" },
};

export const TABLE_COLUMNS = [
  { key: "name", label: "姓名" },
  { key: "email", label: "Email" },
  { key: "role", label: "身分" },
  { key: "status", label: "狀態" },
  { key: "created_at", label: "建立時間" },
] as const;
