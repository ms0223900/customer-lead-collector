"use client";

import { useState } from "react";

import { ROLE_OPTIONS } from "@/lib/landing/content";
import { submitWaitlist } from "@/lib/landing/submit-waitlist";
import {
  API_ERROR_MSG,
  EMAIL_ERROR_MSG,
  SUCCESS_MSG,
  validateEmail,
  type WaitlistFormData,
} from "@/lib/validation/waitlist";

type FormStatus = "idle" | "loading" | "validation_error" | "api_error" | "success";

const initialForm: WaitlistFormData = {
  name: "",
  email: "",
  role: "",
  product_idea: "",
  pain_point: "",
  interview_intent: false,
};

export function WaitlistForm() {
  const [form, setForm] = useState<WaitlistFormData>(initialForm);
  const [status, setStatus] = useState<FormStatus>("idle");

  function updateField<K extends keyof WaitlistFormData>(
    key: K,
    value: WaitlistFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "email" && status === "validation_error") {
      setStatus("idle");
    }
    if (status === "api_error") {
      setStatus("idle");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateEmail(form.email)) {
      setStatus("validation_error");
      return;
    }

    setStatus("loading");

    try {
      await submitWaitlist(form);
      setStatus("success");
    } catch {
      setStatus("api_error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-xl border-2 border-success bg-success-bg p-6 text-center sm:p-8"
        role="status"
        aria-live="polite"
      >
        <span
          className="material-symbols-outlined text-5xl text-success"
          aria-hidden
        >
          check_circle
        </span>
        <h3 className="text-xl font-bold text-on-background">加入成功！</h3>
        <p className="max-w-md text-sm leading-relaxed text-on-background-muted sm:text-base">
          {SUCCESS_MSG}
        </p>
      </div>
    );
  }

  const emailHasError = status === "validation_error";
  const isLoading = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:gap-5 sm:p-6"
      noValidate
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-name" className="text-sm font-medium text-on-background">
          姓名
        </label>
        <input
          id="waitlist-name"
          type="text"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="請輸入您的姓名"
          disabled={isLoading}
          className="h-11 rounded-lg border border-border bg-card px-3 text-base text-on-background placeholder:text-on-background-subtle focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-email" className="text-sm font-medium text-on-background">
          Email <span className="text-error">*</span>
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="name@example.com"
          disabled={isLoading}
          aria-invalid={emailHasError}
          aria-describedby={emailHasError ? "waitlist-email-error" : undefined}
          className={[
            "h-11 rounded-lg border bg-card px-3 text-base text-on-background placeholder:text-on-background-subtle focus:outline-none focus:ring-2 disabled:opacity-60",
            emailHasError
              ? "border-error focus:border-error focus:ring-error/20"
              : "border-border focus:border-secondary focus:ring-secondary/20",
          ].join(" ")}
        />
        {emailHasError ? (
          <p id="waitlist-email-error" className="text-xs text-error" role="alert">
            {EMAIL_ERROR_MSG}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-role" className="text-sm font-medium text-on-background">
          身分 / 角色
        </label>
        <select
          id="waitlist-role"
          value={form.role}
          onChange={(e) => updateField("role", e.target.value)}
          disabled={isLoading}
          className="h-11 rounded-lg border border-border bg-card px-3 text-base text-on-background focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
        >
          <option value="">請選擇身分</option>
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="waitlist-product"
          className="text-sm font-medium text-on-background"
        >
          最想用 AI 做出的產品
        </label>
        <input
          id="waitlist-product"
          type="text"
          value={form.product_idea}
          onChange={(e) => updateField("product_idea", e.target.value)}
          placeholder="例如：客戶名單收集系統"
          disabled={isLoading}
          className="h-11 rounded-lg border border-border bg-card px-3 text-base text-on-background placeholder:text-on-background-subtle focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="waitlist-pain" className="text-sm font-medium text-on-background">
          目前卡關點
        </label>
        <input
          id="waitlist-pain"
          type="text"
          value={form.pain_point}
          onChange={(e) => updateField("pain_point", e.target.value)}
          placeholder="例如：不知道怎麼從 Spec 開始"
          disabled={isLoading}
          className="h-11 rounded-lg border border-border bg-card px-3 text-base text-on-background placeholder:text-on-background-subtle focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 disabled:opacity-60"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={form.interview_intent}
          onChange={(e) => updateField("interview_intent", e.target.checked)}
          disabled={isLoading}
          className="mt-0.5 h-5 w-5 rounded border-border text-primary focus:ring-primary disabled:opacity-60"
        />
        <span className="text-sm text-on-background">
          我願意接受訪談，協助了解需求
        </span>
      </label>

      {status === "api_error" ? (
        <p className="rounded-lg bg-error-bg px-3 py-2 text-sm text-error" role="alert">
          {API_ERROR_MSG}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary text-base font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-primary-disabled disabled:opacity-70"
      >
        {isLoading ? "送出中…" : "送出等候名單"}
      </button>
    </form>
  );
}
