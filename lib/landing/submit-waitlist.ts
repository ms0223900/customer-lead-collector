import type { WaitlistFormData } from "@/lib/validation/waitlist";

/** Sprint 1 mock — replaced by Server Action in Sprint 2 (US-05). */
export async function submitWaitlist(
  _data: WaitlistFormData,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));
}
