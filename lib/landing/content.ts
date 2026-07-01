export const COURSE_NAME =
  "聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品";

export const TAGLINE =
  "半天內，用 AI 協作完成可上線的副業 MVP——從 Spec 到 Deploy，全程實戰";

export const HERO_EYEBROW = "線上實戰工作坊";

export const PROMISE_HEADLINE = "半天內完成可上線副業 MVP";

export const PROMISE_BODY =
  "從釐清需求、撰寫 Spec、設定 AI Rules，到 Build、Debug、Deploy——帶著你走完一條可複製的最小成功路線。結束時你會擁有一個真正可對外展示的產品，而不只是筆記或半成品。";

export const PAINS = [
  {
    id: "pain-1",
    title: "想做 Side Project 但不會寫程式",
    desc: "有點子、有動力，卻卡在技術門檻，遲遲無法把想法變成可使用的產品。",
  },
  {
    id: "pain-2",
    title: "嘗試 AI 卻卡在需求與部署",
    desc: "用 ChatGPT 寫了片段程式，但不知道怎麼整理成 Spec、怎麼真正部署上線。",
  },
  {
    id: "pain-3",
    title: "學了很多卻做不出完整 MVP",
    desc: "看了不少教學，缺少一套從 0 到 1 的實戰流程，無法在有限時間內交付成果。",
  },
] as const;

export const AUDIENCE = [
  "非工程背景的創業者 / 產品人",
  "想轉型做 Side Project 的上班族",
  "已接觸 AI 但缺系統化流程的學習者",
  "希望快速驗證市場的獨立開發新手",
] as const;

export const MODULES = [
  { id: "mod-1", step: "01", title: "選題", desc: "鎖定可驗證的副業方向" },
  { id: "mod-2", step: "02", title: "Spec", desc: "用 AI 協作寫出可執行規格" },
  { id: "mod-3", step: "03", title: "Rules", desc: "設定 AI 工作模式與底線" },
  { id: "mod-4", step: "04", title: "Build", desc: "App Router 全端實作" },
  { id: "mod-5", step: "05", title: "Debug", desc: "除錯與驗收對照 spec" },
  { id: "mod-6", step: "06", title: "Deploy", desc: "Vercel 一鍵上線" },
] as const;

export const ROLE_OPTIONS = [
  "工程師",
  "產品經理",
  "設計師",
  "行銷人",
  "創業家",
  "學生",
] as const;

export const LOGO_TEXT = "AI 課程 · Lead Collector";
