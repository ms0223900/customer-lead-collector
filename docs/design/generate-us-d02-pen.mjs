#!/usr/bin/env node
/**
 * Generates US-D02 Desktop Landing Page .pen file (Pencil format v2.13)
 * Run: node docs/design/generate-us-d02-pen.mjs
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "US-D02-landing-desktop.pen");

const COURSE_NAME =
  "聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品";
const TAGLINE = "半天內，用 AI 協作完成可上線的副業 MVP——從 Spec 到 Deploy，全程實戰";

const V = {
  "color.primary": { type: "color", value: "#F97316" },
  "color.primary-hover": { type: "color", value: "#EA580C" },
  "color.secondary": { type: "color", value: "#0EA5E9" },
  "color.bg": { type: "color", value: "#F8FAFC" },
  "color.bg-alt": { type: "color", value: "#F0F9FF" },
  "color.surface": { type: "color", value: "#FFFFFF" },
  "color.text": { type: "color", value: "#0F172A" },
  "color.text-secondary": { type: "color", value: "#64748B" },
  "color.text-muted": { type: "color", value: "#94A3B8" },
  "color.border": { type: "color", value: "#E2E8F0" },
  "radius.md": { type: "number", value: 8 },
  "radius.lg": { type: "number", value: 12 },
  "radius.xl": { type: "number", value: 16 },
};

function text(id, name, content, opts = {}) {
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

function primaryButton(id, name, label, width = 220) {
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
    fill: "$color.primary",
    children: [
      text(`${id}-label`, `${name} label`, label, {
        fontSize: 16,
        fontWeight: "600",
        fill: "#FFFFFF",
      }),
    ],
  };
}

function sectionTitle(id, title) {
  return text(id, `${title} heading`, title, {
    fontSize: 28,
    fontWeight: "700",
    fill: "$color.text",
    textGrowth: "fixed-width",
    width: 900,
  });
}

function painCard(id, title, desc) {
  return {
    id,
    name: `Pain Card / ${title}`,
    type: "frame",
    layout: "vertical",
    gap: 12,
    width: 380,
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
        width: 320,
      }),
      text(`${id}-desc`, "Description", desc, {
        fontSize: 14,
        fill: "$color.text-secondary",
        textGrowth: "fixed-width",
        width: 320,
        lineHeight: 1.6,
      }),
    ],
  };
}

function moduleCard(id, step, title, desc) {
  return {
    id,
    name: `Module / ${title}`,
    type: "frame",
    layout: "vertical",
    gap: 8,
    width: 200,
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
        width: 160,
        lineHeight: 1.5,
      }),
    ],
  };
}

function inputField(id, labelText, placeholder, opts = {}) {
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
        stroke: { type: "color", color: "$color.border" },
        strokeWidth: 1,
        children: [
          text(`${id}-ph`, "Placeholder", placeholder, {
            fontSize: 16,
            fill: "$color.text-muted",
          }),
        ],
      },
    ],
  };
}

function annotationNote(id, content) {
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
        width: 1200,
        lineHeight: 1.5,
      }),
    ],
  };
}

const doc = {
  version: "2.13",
  variables: V,
  children: [
    {
      id: "landing-desktop",
      name: "US-D02 Landing Page / Desktop",
      type: "frame",
      x: 0,
      y: 0,
      width: 1440,
      layout: "vertical",
      fill: "$color.bg",
      children: [
        // ── Design meta bar ──
        {
          id: "meta-bar",
          name: "Design Meta",
          type: "frame",
          layout: "horizontal",
          width: "fill_container",
          padding: [12, 48],
          fill: "#1E293B",
          justifyContent: "space_between",
          alignItems: "center",
          children: [
            text("meta-title", "Meta", "US-D02 · 課程銷售頁（桌機版 ≥1024px）", {
              fontSize: 12,
              fontWeight: "600",
              fill: "#F8FAFC",
            }),
            text("meta-us", "Impl US", "實作：US-01 Landing Page · US-03 CTA Scroll", {
              fontSize: 12,
              fill: "#94A3B8",
            }),
          ],
        },

        // ── Sticky header ──
        {
          id: "header",
          name: "Header",
          type: "frame",
          layout: "horizontal",
          width: "fill_container",
          height: 64,
          padding: [0, 80],
          fill: "$color.surface",
          stroke: { type: "color", color: "$color.border" },
          strokeWidth: { bottom: 1 },
          justifyContent: "space_between",
          alignItems: "center",
          children: [
            text("logo", "Logo", "AI 課程 · Lead Collector", {
              fontSize: 16,
              fontWeight: "600",
              fill: "$color.text",
            }),
            primaryButton("header-cta", "Header CTA", "加入等候名單", 180),
          ],
        },

        // ── Hero ──
        {
          id: "hero",
          name: "Section / Hero",
          type: "frame",
          layout: "horizontal",
          width: "fill_container",
          padding: [80, 80],
          gap: 64,
          fill: {
            type: "gradient",
            gradientType: "linear",
            rotation: 180,
            colors: [
              { color: "$color.bg-alt", position: 0 },
              { color: "$color.bg", position: 1 },
            ],
          },
          alignItems: "center",
          children: [
            {
              id: "hero-content",
              name: "Hero Content",
              type: "frame",
              layout: "vertical",
              gap: 24,
              width: 640,
              children: [
                text("hero-eyebrow", "Eyebrow", "線上實戰工作坊", {
                  fontSize: 14,
                  fontWeight: "600",
                  fill: "$color.secondary",
                }),
                text("hero-title", "Course Name", COURSE_NAME, {
                  fontSize: 40,
                  fontWeight: "700",
                  lineHeight: 1.2,
                  textGrowth: "fixed-width",
                  width: 620,
                }),
                text("hero-tagline", "Tagline", TAGLINE, {
                  fontSize: 18,
                  fill: "$color.text-secondary",
                  textGrowth: "fixed-width",
                  width: 580,
                  lineHeight: 1.6,
                }),
                primaryButton("hero-cta", "Hero CTA", "加入等候名單", 240),
                annotationNote(
                  "hero-cta-note",
                  "📌 US-03：Hero CTA 點擊 → smooth scroll 至 #waitlist 表單區；同時觸發 analytics_events cta_click"
                ),
              ],
            },
            {
              id: "hero-visual",
              name: "Hero Visual",
              type: "frame",
              width: 520,
              height: 360,
              cornerRadius: "$radius.xl",
              fill: "$color.surface",
              stroke: { type: "color", color: "$color.border" },
              strokeWidth: 1,
              layout: "vertical",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              children: [
                text("hero-visual-title", "Visual", "AI × SDD 實戰流程", {
                  fontSize: 20,
                  fontWeight: "600",
                  fill: "$color.secondary",
                }),
                text("hero-visual-sub", "Visual Sub", "Spec → Build → Deploy", {
                  fontSize: 14,
                  fill: "$color.text-muted",
                }),
              ],
            },
          ],
        },

        // ── Pain Points ──
        {
          id: "pain-points",
          name: "Section / Pain Points",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [80, 80],
          gap: 40,
          fill: "$color.bg",
          children: [
            sectionTitle("pain-title", "你是否也有這些卡關？"),
            {
              id: "pain-cards",
              name: "Pain Cards",
              type: "frame",
              layout: "horizontal",
              gap: 24,
              width: "fill_container",
              children: [
                painCard(
                  "pain-1",
                  "想做 Side Project 但不會寫程式",
                  "有點子、有動力，卻卡在技術門檻，遲遲無法把想法變成可使用的產品。"
                ),
                painCard(
                  "pain-2",
                  "嘗試 AI 卻卡在需求與部署",
                  "用 ChatGPT 寫了片段程式，但不知道怎麼整理成 Spec、怎麼真正部署上線。"
                ),
                painCard(
                  "pain-3",
                  "學了很多卻做不出完整 MVP",
                  "看了不少教學，缺少一套從 0 到 1 的實戰流程，無法在有限時間內交付成果。"
                ),
              ],
            },
          ],
        },

        // ── Course Promise ──
        {
          id: "promise",
          name: "Section / Promise",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [64, 80],
          gap: 24,
          fill: "$color.surface",
          children: [
            sectionTitle("promise-title", "課程承諾"),
            {
              id: "promise-box",
              name: "Promise Highlight",
              type: "frame",
              layout: "vertical",
              gap: 16,
              width: "fill_container",
              padding: 40,
              cornerRadius: "$radius.xl",
              fill: "$color.bg-alt",
              stroke: { type: "color", color: "$color.secondary" },
              strokeWidth: 2,
              children: [
                text("promise-headline", "Headline", "半天內完成可上線副業 MVP", {
                  fontSize: 32,
                  fontWeight: "700",
                  fill: "$color.text",
                }),
                text("promise-body", "Body", "從釐清需求、撰寫 Spec、設定 AI Rules，到 Build、Debug、Deploy——帶著你走完一條可複製的最小成功路線。結束時你會擁有一個真正可對外展示的產品，而不只是筆記或半成品。", {
                  fontSize: 16,
                  fill: "$color.text-secondary",
                  textGrowth: "fixed-width",
                  width: 1200,
                  lineHeight: 1.7,
                }),
              ],
            },
          ],
        },

        // ── Target Audience ──
        {
          id: "audience",
          name: "Section / Audience",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [80, 80],
          gap: 32,
          fill: "$color.bg",
          children: [
            sectionTitle("audience-title", "適合對象"),
            {
              id: "audience-grid",
              name: "Audience Grid",
              type: "frame",
              layout: "horizontal",
              gap: 16,
              width: "fill_container",
              children: [
                "非工程背景的創業者 / 產品人",
                "想轉型做 Side Project 的上班族",
                "已接觸 AI 但缺系統化流程的學習者",
                "希望快速驗證市場的獨立開發新手",
              ].map((item, i) => ({
                id: `audience-${i}`,
                name: `Audience / ${i}`,
                type: "frame",
                layout: "horizontal",
                gap: 10,
                padding: [14, 20],
                cornerRadius: 9999,
                fill: "$color.surface",
                stroke: { type: "color", color: "$color.border" },
                strokeWidth: 1,
                children: [
                  text(`audience-${i}-dot`, "Dot", "✓", {
                    fontSize: 14,
                    fontWeight: "600",
                    fill: "$color.primary",
                  }),
                  text(`audience-${i}-text`, "Text", item, {
                    fontSize: 14,
                    fill: "$color.text",
                  }),
                ],
              })),
            },
          ],
        },

        // ── Course Content ──
        {
          id: "curriculum",
          name: "Section / Curriculum",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [80, 80],
          gap: 40,
          fill: "$color.surface",
          children: [
            sectionTitle("curriculum-title", "課程內容摘要"),
            text("curriculum-sub", "Sub", "六個實戰模組，對應 SDD 完整開發流程", {
              fontSize: 16,
              fill: "$color.text-secondary",
            }),
            {
              id: "curriculum-grid",
              name: "Curriculum Grid",
              type: "frame",
              layout: "horizontal",
              gap: 16,
              width: "fill_container",
              children: [
                moduleCard("mod-1", "01", "選題", "鎖定可驗證的副業方向"),
                moduleCard("mod-2", "02", "Spec", "用 AI 協作寫出可執行規格"),
                moduleCard("mod-3", "03", "Rules", "設定 AI 工作模式與底線"),
                moduleCard("mod-4", "04", "Build", "App Router 全端實作"),
                moduleCard("mod-5", "05", "Debug", "除錯與驗收對照 spec"),
                moduleCard("mod-6", "06", "Deploy", "Vercel 一鍵上線"),
              ],
            },
          ],
        },

        // ── Waitlist CTA + Form ──
        {
          id: "waitlist",
          name: "Section / Waitlist Form (#waitlist)",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [80, 80],
          gap: 32,
          fill: {
            type: "gradient",
            gradientType: "linear",
            rotation: 180,
            colors: [
              { color: "#FFF7ED", position: 0 },
              { color: "$color.bg", position: 1 },
            ],
          },
          children: [
            {
              id: "waitlist-header",
              name: "Waitlist Header",
              type: "frame",
              layout: "vertical",
              gap: 12,
              width: "fill_container",
              alignItems: "center",
              children: [
                sectionTitle("waitlist-title", "加入等候名單"),
                text("waitlist-sub", "Sub", "留下 Email，課程開放時第一時間通知你", {
                  fontSize: 16,
                  fill: "$color.text-secondary",
                }),
                primaryButton("waitlist-cta-top", "Waitlist CTA Top", "立即加入等候名單", 260),
              ],
            },
            annotationNote(
              "waitlist-anchor-note",
              "📌 #waitlist anchor：Hero / Header CTA smooth scroll 終點。表單 Default 狀態；Loading / Error / Success 見 US-D04"
            ),
            {
              id: "waitlist-form",
              name: "Waitlist Form / Default",
              type: "frame",
              layout: "vertical",
              gap: 20,
              width: 720,
              padding: 40,
              cornerRadius: "$radius.xl",
              fill: "$color.surface",
              stroke: { type: "color", color: "$color.border" },
              strokeWidth: 1,
              children: [
                {
                  id: "form-row-1",
                  name: "Form Row 1",
                  type: "frame",
                  layout: "horizontal",
                  gap: 16,
                  width: "fill_container",
                  children: [
                    inputField("form-name", "姓名", "請輸入您的姓名"),
                    inputField("form-email", "Email *", "name@example.com"),
                  ],
                },
                inputField("form-role", "身分 / 角色", "請選擇身分 ▾"),
                inputField("form-product", "最想用 AI 做出的產品", "例如：客戶名單收集系統"),
                inputField("form-pain", "目前卡關點", "例如：不知道怎麼從 Spec 開始"),
                {
                  id: "form-checkbox-row",
                  name: "Checkbox Row",
                  type: "frame",
                  layout: "horizontal",
                  gap: 10,
                  alignItems: "center",
                  children: [
                    {
                      id: "form-checkbox",
                      type: "rectangle",
                      width: 20,
                      height: 20,
                      cornerRadius: 4,
                      fill: "$color.surface",
                      stroke: { type: "color", color: "$color.border" },
                      strokeWidth: 2,
                    },
                    text("form-checkbox-label", "Checkbox", "我願意接受訪談，協助了解需求", {
                      fontSize: 14,
                    }),
                  ],
                },
                {
                  id: "form-submit-wrap",
                  name: "Submit Wrap",
                  type: "frame",
                  layout: "horizontal",
                  width: "fill_container",
                  children: [
                    primaryButton("form-submit", "Submit", "送出等候名單", "fill_container"),
                  ],
                },
              ],
            },
          ],
        },

        // ── Footer ──
        {
          id: "footer",
          name: "Footer",
          type: "frame",
          layout: "horizontal",
          width: "fill_container",
          padding: [32, 80],
          fill: "#1E293B",
          justifyContent: "center",
          children: [
            text("footer-copy", "Copyright", "© 2026 Lead Collector MVP · 教學演示專案", {
              fontSize: 12,
              fill: "#94A3B8",
            }),
          ],
        },
      ],
    },
  ],
};

writeFileSync(OUT, JSON.stringify(doc, null, 2), "utf8");
console.log(`Written: ${OUT}`);
