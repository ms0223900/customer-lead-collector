export const SUCCESS_MSG =
  "你已成功加入等候名單！課程開放時，我們會第一時間通知你。如果你願意接受訪談，我們可能會優先聯絡你了解需求。";

export const EMAIL_ERROR_MSG = "請輸入有效的 Email 地址";

export const API_ERROR_MSG = "表單送出失敗，請稍後再試";

export function validateEmail(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;

  const atIndex = trimmed.indexOf("@");
  if (atIndex <= 0) return false;

  const domain = trimmed.slice(atIndex + 1);
  if (!domain || !domain.includes(".")) return false;

  return true;
}

export type WaitlistFormData = {
  name: string;
  email: string;
  role: string;
  product_idea: string;
  pain_point: string;
  interview_intent: boolean;
};
