#!/usr/bin/env node
/**
 * Generates US-D01 Foundation & Components .pen file (Pencil format v2.13)
 * Run: node docs/design/generate-us-d01-pen.mjs
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "US-D01-foundation-components.pen");

const V = {
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
  "color.success": { type: "color", value: "#22C55E" },
  "color.success-bg": { type: "color", value: "#F0FDF4" },
  "color.error": { type: "color", value: "#EF4444" },
  "color.error-bg": { type: "color", value: "#FEF2F2" },
  "color.warning": { type: "color", value: "#F59E0B" },
  "color.warning-bg": { type: "color", value: "#FFFBEB" },
  "radius.sm": { type: "number", value: 6 },
  "radius.md": { type: "number", value: 8 },
  "radius.lg": { type: "number", value: 12 },
  "spacing.1": { type: "number", value: 4 },
  "spacing.2": { type: "number", value: 8 },
  "spacing.3": { type: "number", value: 12 },
  "spacing.4": { type: "number", value: 16 },
  "spacing.6": { type: "number", value: 24 },
  "spacing.8": { type: "number", value: 32 },
  "font.display": { type: "number", value: 36 },
  "font.h2": { type: "number", value: 28 },
  "font.h3": { type: "number", value: 20 },
  "font.body": { type: "number", value: 16 },
  "font.label": { type: "number", value: 14 },
  "font.caption": { type: "number", value: 12 },
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
    height: opts.height,
    x: opts.x ?? 0,
    y: opts.y ?? 0,
  };
}

function swatch(id, name, colorVar, label, x, y) {
  return {
    id,
    name,
    type: "frame",
    x,
    y,
    width: 120,
    height: 100,
    layout: "vertical",
    gap: 8,
    alignItems: "center",
    children: [
      {
        id: `${id}-box`,
        type: "rectangle",
        width: 120,
        height: 64,
        cornerRadius: "$radius.md",
        fill: colorVar,
        stroke: { type: "color", color: "$color.border" },
        strokeWidth: 1,
      },
      text(`${id}-label`, `${name} label`, label, {
        fontSize: 12,
        fill: "$color.text-secondary",
        textAlign: "center",
        width: 120,
        textGrowth: "fixed-width",
      }),
    ],
  };
}

function badge(id, name, label, fg, bg, reusable = false) {
  return {
    id,
    name,
    type: "frame",
    reusable,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [4, 10],
    cornerRadius: 9999,
    fill: bg,
    children: [
      text(`${id}-text`, `${name} text`, label, {
        fontSize: 12,
        fontWeight: "500",
        fill: fg,
      }),
    ],
  };
}

function inputField(id, name, labelText, placeholder, opts = {}) {
  const hasError = opts.error;
  return {
    id,
    name,
    type: "frame",
    reusable: opts.reusable ?? false,
    layout: "vertical",
    gap: 6,
    width: opts.width ?? 360,
    children: [
      text(`${id}-label`, `${name} label`, labelText, {
        fontSize: 14,
        fontWeight: "500",
        fill: "$color.text",
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
          text(`${id}-placeholder`, `${name} placeholder`, placeholder, {
            fontSize: 16,
            fill: hasError ? "$color.text" : "$color.text-muted",
            textGrowth: "fixed-width",
            width: 320,
          }),
        ],
      },
      ...(hasError
        ? [
            text(`${id}-error`, `${name} error`, opts.errorMsg, {
              fontSize: 12,
              fill: "$color.error",
              textGrowth: "fixed-width",
              width: 360,
            }),
          ]
        : []),
    ],
  };
}

function primaryButton(id, name, label, state = "default", reusable = false) {
  const fills = {
    default: "$color.primary",
    hover: "$color.primary-hover",
    disabled: "$color.primary-disabled",
  };
  const opacities = { default: 1, hover: 1, disabled: 0.7 };
  return {
    id,
    name,
    type: "frame",
    reusable,
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 48,
    padding: [0, 24],
    cornerRadius: "$radius.md",
    fill: fills[state],
    opacity: opacities[state],
    children: [
      text(`${id}-label`, `${name} label`, label, {
        fontSize: 16,
        fontWeight: "600",
        fill: "#FFFFFF",
      }),
    ],
  };
}

function tableRow(id, name, cells, reusable = false) {
  return {
    id,
    name,
    type: "frame",
    reusable,
    layout: "horizontal",
    alignItems: "center",
    width: 960,
    height: 56,
    padding: [0, 16],
    fill: "$color.surface",
    stroke: { type: "color", color: "$color.border" },
    strokeWidth: { bottom: 1 },
    gap: 16,
    children: cells.map((cell, i) =>
      text(`${id}-cell-${i}`, `${name} cell ${i}`, cell.text, {
        fontSize: 14,
        fontWeight: cell.bold ? "600" : "400",
        fill: cell.muted ? "$color.text-secondary" : "$color.text",
        width: cell.width,
        textGrowth: "fixed-width",
      })
    ),
  };
}

const doc = {
  version: "2.13",
  variables: V,
  children: [
    {
      id: "page",
      name: "US-D01 Foundation & Components",
      type: "frame",
      x: 0,
      y: 0,
      width: 1440,
      layout: "vertical",
      gap: 48,
      padding: 48,
      fill: "$color.bg",
      children: [
        text("page-title", "Page Title", "US-D01 · Foundation & Components", {
          fontSize: 36,
          fontWeight: "700",
          fill: "$color.text",
        }),
        text("page-subtitle", "Page Subtitle", "Lead Collector MVP · 《聊著聊著，AI 就做完了》", {
          fontSize: 16,
          fill: "$color.text-secondary",
        }),

        // ── Foundation: Colors ──
        {
          id: "sec-colors",
          name: "Section / Colors",
          type: "frame",
          layout: "vertical",
          gap: 16,
          width: "fill_container",
          children: [
            text("sec-colors-title", "Colors Title", "Foundation ···Colors", {
              fontSize: 20,
              fontWeight: "600",
            }),
            {
              id: "color-swatches",
              name: "Color Swatches",
              type: "frame",
              layout: "horizontal",
              gap: 16,
              width: "fill_container",
              children: [
                swatch("sw-primary", "Primary CTA", "$color.primary", "Primary #F97316", 0, 0),
                swatch("sw-secondary", "Secondary", "$color.secondary", "Secondary #0EA5E9", 0, 0),
                swatch("sw-bg", "Background", "$color.bg", "BG #F8FAFC", 0, 0),
                swatch("sw-surface", "Surface", "$color.surface", "Surface #FFF", 0, 0),
                swatch("sw-success", "Success", "$color.success", "Success #22C55E", 0, 0),
                swatch("sw-error", "Error", "$color.error", "Error #EF4444", 0, 0),
                swatch("sw-warning", "Warning", "$color.warning", "Warning #F59E0B", 0, 0),
              ],
            },
            text("color-tailwind-note", "Tailwind Note", "Tailwind mapping: primary→orange-500, secondary→sky-500, bg→slate-50, text→slate-900", {
              fontSize: 12,
              fill: "$color.text-muted",
            }),
          ],
        },

        // ── Foundation: Typography ──
        {
          id: "sec-typography",
          name: "Section / Typography",
          type: "frame",
          layout: "vertical",
          gap: 12,
          width: "fill_container",
          fill: "$color.surface",
          cornerRadius: "$radius.lg",
          padding: 24,
          stroke: { type: "color", color: "$color.border" },
          strokeWidth: 1,
          children: [
            text("sec-type-title", "Typography Title", "Foundation / Typography (Fira Sans)", {
              fontSize: 20,
              fontWeight: "600",
            }),
            text("type-display", "Display", "Display / H1 — 36px Bold — 課程銷售頁主標", {
              fontSize: 36,
              fontWeight: "700",
            }),
            text("type-h2", "H2", "H2 — 28px Semibold — 區塊標題", {
              fontSize: 28,
              fontWeight: "600",
            }),
            text("type-h3", "H3", "H3 — 20px Semibold — 卡片標題", {
              fontSize: 20,
              fontWeight: "600",
            }),
            text("type-body", "Body", "Body — 16px Regular — 正文與表單說明文字", {
              fontSize: 16,
            }),
            text("type-label", "Label", "Label — 14px Medium — 表單欄位標籤", {
              fontSize: 14,
              fontWeight: "500",
            }),
            text("type-error", "Error", "Error — 12px Regular — 請輸入有效的 Email 地址", {
              fontSize: 12,
              fill: "$color.error",
            }),
          ],
        },

        // ── Components: Buttons ──
        {
          id: "sec-buttons",
          name: "Section / Buttons",
          type: "frame",
          layout: "vertical",
          gap: 16,
          width: "fill_container",
          children: [
            text("sec-btn-title", "Buttons Title", "Components / Primary Button", {
              fontSize: 20,
              fontWeight: "600",
            }),
            {
              id: "btn-row",
              name: "Button States Row",
              type: "frame",
              layout: "horizontal",
              gap: 24,
              alignItems: "center",
              children: [
                primaryButton("comp-btn-primary", "Button / Primary", "加入等候名單", "default", true),
                primaryButton("btn-primary-hover", "Button / Primary Hover", "加入等候名單", "hover"),
                primaryButton("btn-primary-disabled", "Button / Primary Disabled", "加入等候名單", "disabled"),
              ],
            },
            text("btn-note", "Button Note", "Default · Hover (#EA580C) · Disabled (opacity 70%)", {
              fontSize: 12,
              fill: "$color.text-muted",
            }),
          ],
        },

        // ── Components: Form Fields ──
        {
          id: "sec-forms",
          name: "Section / Form Fields",
          type: "frame",
          layout: "horizontal",
          gap: 48,
          width: "fill_container",
          children: [
            {
              id: "form-fields-default",
              name: "Form Fields / Default",
              type: "frame",
              layout: "vertical",
              gap: 20,
              width: 400,
              children: [
                text("sec-form-title", "Form Title", "Components / Form Fields", {
                  fontSize: 20,
                  fontWeight: "600",
                }),
                inputField("comp-input-text", "Input / Text", "姓名", "請輸入您的姓名", { reusable: true }),
                inputField("comp-input-email", "Input / Email", "Email *", "name@example.com", { reusable: true }),
                {
                  id: "comp-select",
                  name: "Select / Role",
                  type: "frame",
                  reusable: true,
                  layout: "vertical",
                  gap: 6,
                  width: 360,
                  children: [
                    text("select-label", "Select Label", "身分 / 角色", { fontSize: 14, fontWeight: "500" }),
                    {
                      id: "select-box",
                      type: "frame",
                      layout: "horizontal",
                      alignItems: "center",
                      justifyContent: "space_between",
                      width: "fill_container",
                      height: 44,
                      padding: [0, 12],
                      cornerRadius: "$radius.md",
                      fill: "$color.surface",
                      stroke: { type: "color", color: "$color.border" },
                      strokeWidth: 1,
                      children: [
                        text("select-value", "Select Value", "請選擇身分", {
                          fontSize: 16,
                          fill: "$color.text-muted",
                        }),
                        text("select-chevron", "Chevron", "▾", { fontSize: 14, fill: "$color.text-muted" }),
                      ],
                    },
                  ],
                },
                {
                  id: "comp-checkbox",
                  name: "Checkbox / Interview",
                  type: "frame",
                  reusable: true,
                  layout: "horizontal",
                  gap: 10,
                  alignItems: "center",
                  children: [
                    {
                      id: "checkbox-box",
                      type: "rectangle",
                      width: 20,
                      height: 20,
                      cornerRadius: 4,
                      fill: "$color.surface",
                      stroke: { type: "color", color: "$color.border" },
                      strokeWidth: 2,
                    },
                    text("checkbox-label", "Checkbox Label", "我願意接受訪談，協助了解需求", {
                      fontSize: 14,
                      fill: "$color.text",
                      textGrowth: "fixed-width",
                      width: 320,
                    }),
                  ],
                },
              ],
            },
            {
              id: "form-error-demo",
              name: "Form Fields / Error State",
              type: "frame",
              layout: "vertical",
              gap: 20,
              width: 400,
              fill: "$color.error-bg",
              cornerRadius: "$radius.lg",
              padding: 24,
              children: [
                text("error-demo-title", "Error Demo Title", "Error State Demo", {
                  fontSize: 20,
                  fontWeight: "600",
                  fill: "$color.error",
                }),
                inputField("input-email-error", "Input / Email Error", "Email *", "invalid-email", {
                  error: true,
                  errorMsg: "請輸入有效的 Email 地址",
                }),
                {
                  id: "alert-warning",
                  name: "Alert / Warning Mock",
                  type: "frame",
                  layout: "horizontal",
                  gap: 10,
                  padding: 12,
                  cornerRadius: "$radius.md",
                  fill: "$color.warning-bg",
                  width: "fill_container",
                  children: [
                    text("alert-warning-text", "Warning Text", "⚠ 此版本為展示版，文案為 Mock 產生，尚未串接真實 AI API", {
                      fontSize: 12,
                      fill: "#92400E",
                      textGrowth: "fixed-width",
                      width: 320,
                    }),
                  ],
                },
              ],
            },
          ],
        },

        // ── Components: Status Badges ──
        {
          id: "sec-badges",
          name: "Section / Status Badges",
          type: "frame",
          layout: "vertical",
          gap: 16,
          width: "fill_container",
          children: [
            text("sec-badge-title", "Badges Title", "Components / Status Badges (leads.status)", {
              fontSize: 20,
              fontWeight: "600",
            }),
            {
              id: "badge-row",
              name: "Badge Row",
              type: "frame",
              layout: "horizontal",
              gap: 12,
              children: [
                badge("badge-new", "Badge / 新名單", "新名單", "#2563EB", "#EFF6FF", true),
                badge("badge-high", "Badge / 高意願", "高意願", "#C2410C", "#FFF7ED", true),
                badge("badge-contacted", "Badge / 已聯絡", "已聯絡", "#7C3AED", "#F5F3FF", true),
                badge("badge-interviewed", "Badge / 已訪談", "已訪談", "#15803D", "#F0FDF4", true),
                badge("badge-unfit", "Badge / 不適合", "不適合", "#475569", "#F1F5F9", true),
              ],
            },
          ],
        },

        // ── Components: Table Row ──
        {
          id: "sec-table",
          name: "Section / Table Row",
          type: "frame",
          layout: "vertical",
          gap: 16,
          width: "fill_container",
          children: [
            text("sec-table-title", "Table Title", "Components / Admin Table Row", {
              fontSize: 20,
              fontWeight: "600",
            }),
            {
              id: "table-header",
              name: "Table Header",
              type: "frame",
              layout: "horizontal",
              width: 960,
              height: 40,
              padding: [0, 16],
              fill: "#F1F5F9",
              gap: 16,
              children: ["姓名", "Email", "身分", "狀態", "建立時間"].map((h, i) =>
                text(`th-${i}`, `Header ${h}`, h, {
                  fontSize: 12,
                  fontWeight: "600",
                  fill: "$color.text-secondary",
                  width: [120, 240, 100, 100, 160][i],
                  textGrowth: "fixed-width",
                })
              ),
            },
            {
              id: "comp-table-row",
              name: "Table Row / Lead",
              type: "ref",
              ref: "table-row-base",
            },
          ],
        },

        // ── Breakpoints ──
        {
          id: "sec-breakpoints",
          name: "Section / Breakpoints",
          type: "frame",
          layout: "horizontal",
          gap: 24,
          width: "fill_container",
          children: [
            {
              id: "bp-desktop",
              name: "Breakpoint / Desktop",
              type: "frame",
              layout: "vertical",
              gap: 8,
              width: 400,
              padding: 20,
              cornerRadius: "$radius.lg",
              fill: "$color.bg-alt",
              stroke: { type: "color", color: "$color.secondary" },
              strokeWidth: 2,
              children: [
                text("bp-desktop-title", "Desktop Title", "Desktop ≥ 1024px", {
                  fontSize: 16,
                  fontWeight: "600",
                  fill: "$color.secondary",
                }),
                text("bp-desktop-desc", "Desktop Desc", "Landing 多欄排版 · Admin 表格完整顯示 · Dashboard 3–4 欄網格", {
                  fontSize: 14,
                  fill: "$color.text-secondary",
                  textGrowth: "fixed-width",
                  width: 360,
                }),
              ],
            },
            {
              id: "bp-mobile",
              name: "Breakpoint / Mobile",
              type: "frame",
              layout: "vertical",
              gap: 8,
              width: 375,
              padding: 20,
              cornerRadius: "$radius.lg",
              fill: "$color.surface",
              stroke: { type: "color", color: "$color.border" },
              strokeWidth: 2,
              children: [
                text("bp-mobile-title", "Mobile Title", "Mobile 375–767px", {
                  fontSize: 16,
                  fontWeight: "600",
                }),
                text("bp-mobile-desc", "Mobile Desc", "單欄堆疊 · CTA 全寬 · 表格橫向捲動或卡片化", {
                  fontSize: 14,
                  fill: "$color.text-secondary",
                  textGrowth: "fixed-width",
                  width: 320,
                }),
              ],
            },
          ],
        },
      ],
    },

    // Reusable components library (off-canvas, for ref instances)
    {
      id: "component-library",
      name: "Component Library",
      type: "frame",
      x: 1500,
      y: 0,
      width: 400,
      layout: "vertical",
      gap: 24,
      padding: 24,
      fill: "#E2E8F0",
      children: [
        tableRow(
          "table-row-base",
          "Component / Table Row",
          [
            { text: "王小明", width: 120 },
            { text: "ming@example.com", width: 240, muted: true },
            { text: "工程師", width: 100, muted: true },
            { text: "新名單", width: 100 },
            { text: "2026/06/28 14:30", width: 160, muted: true },
          ],
          true
        ),
      ],
    },
  ],
};

writeFileSync(OUT, JSON.stringify(doc, null, 2), "utf8");
console.log(`Written: ${OUT}`);
