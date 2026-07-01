import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import { LEADS_LOAD_ERROR } from "@/lib/admin/constants";
import type { Lead } from "@/lib/leads/types";

const LEAD_SELECT =
  "id, name, email, role, product_idea, pain_point, interview_intent, status, note, source, created_at, updated_at";

export async function getLeadsList(): Promise<Lead[]> {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from("leads")
    .select(LEAD_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getLeadsList failed:", error.message);
    throw new Error(LEADS_LOAD_ERROR);
  }

  return (data ?? []) as Lead[];
}
