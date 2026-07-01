/** Shared content & helpers for US-D02 / D03 / D04 landing design generators */

export const COURSE_NAME =
  "聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品";
export const TAGLINE =
  "半天內，用 AI 協作完成可上線的副業 MVP——從 Spec 到 Deploy，全程實戰";

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
];

export const AUDIENCE = [
  "非工程背景的創業者 / 產品人",
  "想轉型做 Side Project 的上班族",
  "已接觸 AI 但缺系統化流程的學習者",
  "希望快速驗證市場的獨立開發新手",
];

export const MODULES = [
  { id: "mod-1", step: "01", title: "選題", desc: "鎖定可驗證的副業方向" },
  { id: "mod-2", step: "02", title: "Spec", desc: "用 AI 協作寫出可執行規格" },
  { id: "mod-3", step: "03", title: "Rules", desc: "設定 AI 工作模式與底線" },
  { id: "mod-4", step: "04", title: "Build", desc: "App Router 全端實作" },
  { id: "mod-5", step: "05", title: "Debug", desc: "除錯與驗收對照 spec" },
  { id: "mod-6", step: "06", title: "Deploy", desc: "Vercel 一鍵上線" },
];

export const SUCCESS_MSG =
  "你已成功加入等候名單！課程開放時，我們會第一時間通知你。如果你願意接受訪談，我們可能會優先聯絡你了解需求。";
export const EMAIL_ERROR_MSG = "請輸入有效的 Email 地址";
export const API_ERROR_MSG = "表單送出失敗，請稍後再試";

export const V = {
  "color.primary": { type: "color", value: "#F97316" },
  "color.primary-hover": { type: "color", value: "#EA580C" },
  "color.primary-disabled": { type: "color", value: "#FDBA74" },
  "color.secondary": { type: "color", value: "#0EA5E9" },
  "color.bg": { type: "color", value: "#F8FAFC" },
  "color.bg-alt": { type: "color", value: "#F0F9FF" },
  "color.surface": { type: "color", value: "#FFFFFF" },
  "color.text": { type: "color", value: "#0F172A" },
  "color.text-secondary": { type: "color", value: "#64748B" },
  "color.text-muted": { type: "color", value: "#94A3B8" },
  "color.border": { type: "color", value: "#E2E8F0" },
  "color.error": { type: "color", value: "#EF4444" },
  "color.error-bg": { type: "color", value: "#FEF2F2" },
  "color.success": { type: "color", value: "#22C55E" },
  "color.success-bg": { type: "color", value: "#F0FDF4" },
  "radius.md": { type: "number", value: 8 },
  "radius.lg": { type: "number", value: 12 },
  "radius.xl": { type: "number", value: 16 },
};

export function text(id, name, content, opts = {}) {
  return {
    id,
    name,
    type: "text",
    content,
    fontFamily: "Fira Sans",
    fontSize: opts.fontSize ?? 16,
    fontWeight: opts.fontWeight ?? "400",
    fill: opts.fill ?? "$color.text",
    lineHeight: opts.lineHeight ?? 1.5,
    textGrowth: opts.textGrowth ?? "auto",
    width: opts.width,
    textAlign: opts.textAlign,
  };
}

export function primaryButton(id, name, label, opts = {}) {
  const width = opts.width ?? 220;
  const w = width === "fill_container" ? "fill_container" : width;
  return {
    id,
    name,
    type: "frame",
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    width: w,
    height: 48,
    padding: [0, 24],
    cornerRadius: "$radius.md",
    fill: opts.disabled ? "$color.primary-disabled" : "$color.primary",
    opacity: opts.disabled ? 0.7 : 1,
    children: [
      text(`${id}-label`, `${name} label`, label, {
        fontSize: 16,
        fontWeight: "600",
        fill: "#FFFFFF",
      }),
    ],
  };
}

export function sectionTitle(id, title, width = 900) {
  return text(id, `${title} heading`, title, {
    fontSize: 28,
    fontWeight: "700",
    fill: "$color.text",
    textGrowth: "fixed-width",
    width,
  });
}

export function inputField(id, labelText, placeholder, opts = {}) {
  const hasError = opts.error;
  return {
    id,
    name: `Field / ${labelText}`,
    type: "frame",
    layout: "vertical",
    gap: 6,
    width: opts.width ?? "fill_container",
    children: [
      text(`${id}-label`, "Label", labelText, {
        fontSize: 14,
        fontWeight: "500",
      }),
      {
        id: `${id}-input`,
        type: "frame",
        layout: "horizontal",
        alignItems: "center",
        width: "fill_container",
        height: 44,
        padding: [0, 12],
        cornerRadius: "$radius.md",
        fill: "$color.surface",
        stroke: {
          type: "color",
          color: hasError ? "$color.error" : "$color.border",
        },
        strokeWidth: hasError ? 2 : 1,
        children: [
          text(`${id}-ph`, "Placeholder", placeholder, {
            fontSize: 16,
            fill: hasError ? "$color.text" : "$color.text-muted",
          }),
        ],
      },
      ...(hasError && opts.errorMsg
        ? [
            text(`${id}-err`, "Error", opts.errorMsg, {
              fontSize: 12,
              fill: "$color.error",
              textGrowth: "fixed-width",
              width: opts.errorWidth ?? 300,
            }),
          ]
        : []),
    ],
  };
}

export function painCard(id, title, desc, cardWidth = 380) {
  return {
    id,
    name: `Pain Card / ${title}`,
    type: "frame",
    layout: "vertical",
    gap: 12,
    width: cardWidth,
    padding: 24,
    cornerRadius: "$radius.lg",
    fill: "$color.surface",
    stroke: { type: "color", color: "$color.border" },
    strokeWidth: 1,
    children: [
      {
        id: `${id}-icon`,
        type: "frame",
        width: 40,
        height: 40,
        cornerRadius: 9999,
        fill: "$color.bg-alt",
        layout: "horizontal",
        alignItems: "center",
        justifyContent: "center",
        children: [
          text(`${id}-icon-text`, "Icon", "!", {
            fontSize: 18,
            fontWeight: "700",
            fill: "$color.secondary",
          }),
        ],
      },
      text(`${id}-title`, "Title", title, {
        fontSize: 18,
        fontWeight: "600",
        textGrowth: "fixed-width",
        width: cardWidth - 48,
      }),
      text(`${id}-desc`, "Description", desc, {
        fontSize: 14,
        fill: "$color.text-secondary",
        textGrowth: "fixed-width",
        width: cardWidth - 48,
        lineHeight: 1.6,
      }),
    ],
  };
}

export function moduleCard(id, step, title, desc, cardWidth = 200) {
  return {
    id,
    name: `Module / ${title}`,
    type: "frame",
    layout: "vertical",
    gap: 8,
    width: cardWidth,
    padding: 20,
    cornerRadius: "$radius.lg",
    fill: "$color.surface",
    stroke: { type: "color", color: "$color.border" },
    strokeWidth: 1,
    children: [
      text(`${id}-step`, "Step", step, {
        fontSize: 12,
        fontWeight: "600",
        fill: "$color.secondary",
      }),
      text(`${id}-title`, "Title", title, {
        fontSize: 16,
        fontWeight: "600",
      }),
      text(`${id}-desc`, "Desc", desc, {
        fontSize: 12,
        fill: "$color.text-secondary",
        textGrowth: "fixed-width",
        width: cardWidth - 40,
        lineHeight: 1.5,
      }),
    ],
  };
}

export function annotationNote(id, content, noteWidth = 1200) {
  return {
    id,
    name: "Annotation",
    type: "frame",
    layout: "horizontal",
    gap: 8,
    padding: [10, 14],
    cornerRadius: "$radius.md",
    fill: "#FEF3C7",
    stroke: { type: "color", color: "#F59E0B" },
    strokeWidth: 1,
    width: "fill_container",
    children: [
      text(`${id}-text`, "Note", content, {
        fontSize: 12,
        fill: "#92400E",
        textGrowth: "fixed-width",
        width: noteWidth,
        lineHeight: 1.5,
      }),
    ],
  };
}

export function defaultFormFields(prefix) {
  return [
    inputField(`${prefix}-name`, "姓名", "請輸入您的姓名"),
    inputField(`${prefix}-email`, "Email *", "name@example.com"),
    inputField(`${prefix}-role`, "身分 / 角色", "請選擇身分 ▾"),
    inputField(`${prefix}-product`, "最想用 AI 做出的產品", "例如：客戶名單收集系統"),
    inputField(`${prefix}-pain`, "目前卡關點", "例如：不知道怎麼從 Spec 開始"),
    {
      id: `${prefix}-checkbox-row`,
      name: "Checkbox Row",
      type: "frame",
      layout: "horizontal",
      gap: 10,
      alignItems: "center",
      width: "fill_container",
      children: [
        {
          id: `${prefix}-checkbox`,
          type: "rectangle",
          width: 20,
          height: 20,
          cornerRadius: 4,
          fill: "$color.surface",
          stroke: { type: "color", color: "$color.border" },
          strokeWidth: 2,
        },
        text(`${prefix}-checkbox-label`, "Checkbox", "我願意接受訪談，協助了解需求", {
          fontSize: 14,
          textGrowth: "fixed-width",
          width: 260,
        }),
      ],
    },
  ];
}
