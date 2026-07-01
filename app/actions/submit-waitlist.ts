"use server";

import { createServiceRoleSupabaseClient } from "@/lib/supabase/server";
import {
  validateEmail,
  type WaitlistFormData,
} from "@/lib/validation/waitlist";

function toNullable(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function submitWaitlistAction(data: WaitlistFormData): Promise<void> {
  if (!validateEmail(data.email)) {
    throw new Error("INVALID_EMAIL");
  }

  const supabase = createServiceRoleSupabaseClient();

  const { error } = await supabase.from("leads").insert({
    email: data.email.trim(),
    name: toNullable(data.name),
    role: toNullable(data.role),
    product_idea: toNullable(data.product_idea),
    pain_point: toNullable(data.pain_point),
    interview_intent: data.interview_intent,
    status: "新名單",
    source: "/",
  });

  if (error) {
    console.error("submitWaitlistAction failed:", error.message);
    throw new Error("SUBMIT_FAILED");
  }
}
