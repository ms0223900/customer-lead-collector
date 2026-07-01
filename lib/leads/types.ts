export const LEAD_STATUSES = [
  "新名單",
  "高意願",
  "已聯絡",
  "已訪談",
  "不適合",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type Lead = {
  id: string;
  name: string | null;
  email: string;
  role: string | null;
  product_idea: string | null;
  pain_point: string | null;
  interview_intent: boolean;
  status: LeadStatus;
  note: string | null;
  source: string | null;
  created_at: string;
  updated_at: string | null;
};
