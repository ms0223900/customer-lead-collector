#!/usr/bin/env node
/** US-D04 Waitlist Form States — Run: node docs/design/generate-us-d04-pen.mjs */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  V,
  SUCCESS_MSG,
  EMAIL_ERROR_MSG,
  API_ERROR_MSG,
  text,
  primaryButton,
  inputField,
  defaultFormFields,
} from "./pen-landing-shared.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "US-D04-form-states.pen");

const PANEL_W = 340;
const PANEL_PAD = 20;

function stateLabel(id, label) {
  return {
    id,
    name: `State Label / ${label}`,
    type: "frame",
    layout: "horizontal",
    width: "fill_container",
    padding: [8, 12],
    cornerRadius: "$radius.md",
    fill: "#1E293B",
    children: [
      text(`${id}-text`, "Label", label, {
        fontSize: 13,
        fontWeight: "600",
        fill: "#F8FAFC",
      }),
    ],
  };
}

function formPanel(id, name, stateLabelText, bodyChildren) {
  return {
    id,
    name,
    type: "frame",
    layout: "vertical",
    gap: 12,
    width: PANEL_W,
    children: [stateLabel(`${id}-label`, stateLabelText), ...bodyChildren],
  };
}

function formCard(id, children) {
  return {
    id,
    name: "Form Card",
    type: "frame",
    layout: "vertical",
    gap: 14,
    width: "fill_container",
    padding: PANEL_PAD,
    cornerRadius: "$radius.lg",
    fill: "$color.surface",
    stroke: { type: "color", color: "$color.border" },
    strokeWidth: 1,
    children,
  };
}

const defaultPanel = formPanel("state-default", "State / Default", "1 · Default", [
  formCard("default-card", [
    ...defaultFormFields("d"),
    primaryButton("d-submit", "Submit", "送出等候名單", { width: "fill_container" }),
  ]),
]);

const validationPanel = formPanel("state-validation", "State / Validation Error", "2 · Validation Error", [
  formCard("validation-card", [
    inputField("v-name", "姓名", "請輸入您的姓名"),
    inputField("v-email", "Email *", "", {
      error: true,
      errorMsg: EMAIL_ERROR_MSG,
      errorWidth: PANEL_W - PANEL_PAD * 2,
    }),
    inputField("v-role", "身分 / 角色", "請選擇身分 ▾"),
    inputField("v-product", "最想用 AI 做出的產品", "例如：客戶名單收集系統"),
    inputField("v-pain", "目前卡關點", "例如：不知道怎麼從 Spec 開始"),
    {
      id: "v-checkbox-row",
      type: "frame",
      layout: "horizontal",
      gap: 10,
      alignItems: "center",
      children: [
        {
          id: "v-checkbox",
          type: "rectangle",
          width: 20,
          height: 20,
          cornerRadius: 4,
          fill: "$color.surface",
          stroke: { type: "color", color: "$color.border" },
          strokeWidth: 2,
        },
        text("v-checkbox-label", "Checkbox", "我願意接受訪談，協助了解需求", {
          fontSize: 13,
          textGrowth: "fixed-width",
          width: 240,
        }),
      ],
    },
    primaryButton("v-submit", "Submit", "送出等候名單", { width: "fill_container" }),
  ]),
]);

const loadingPanel = formPanel("state-loading", "State / Loading", "3 · Loading", [
  formCard("loading-card", [
    ...defaultFormFields("l"),
    primaryButton("l-submit", "Submit", "送出中…", {
      width: "fill_container",
      disabled: true,
    }),
    text("l-hint", "Hint", "按鈕 disabled，避免重複提交", {
      fontSize: 11,
      fill: "$color.text-muted",
      textAlign: "center",
      textGrowth: "fixed-width",
      width: PANEL_W - PANEL_PAD * 2,
    }),
  ]),
]);

const successPanel = formPanel("state-success", "State / Success", "4 · Success", [
  {
    id: "success-card",
    name: "Success Card",
    type: "frame",
    layout: "vertical",
    gap: 16,
    width: "fill_container",
    padding: PANEL_PAD,
    cornerRadius: "$radius.lg",
    fill: "$color.success-bg",
    stroke: { type: "color", color: "$color.success" },
    strokeWidth: 2,
    alignItems: "center",
    children: [
      {
        id: "success-icon",
        type: "frame",
        width: 48,
        height: 48,
        cornerRadius: 9999,
        fill: "$color.success",
        layout: "horizontal",
        alignItems: "center",
        justifyContent: "center",
        children: [
          text("success-check", "Check", "✓", {
            fontSize: 24,
            fontWeight: "700",
            fill: "#FFFFFF",
          }),
        ],
      },
      text("success-title", "Success Title", "加入成功！", {
        fontSize: 20,
        fontWeight: "700",
        fill: "#15803D",
      }),
      text("success-body", "Success Body", SUCCESS_MSG, {
        fontSize: 14,
        fill: "$color.text-secondary",
        textGrowth: "fixed-width",
        width: PANEL_W - PANEL_PAD * 2,
        lineHeight: 1.7,
        textAlign: "center",
      }),
      text("success-ref", "Spec Ref", "（spec §6.2 原文）", {
        fontSize: 10,
        fill: "$color.text-muted",
      }),
    ],
  },
]);

const apiErrorPanel = formPanel("state-api-error", "State / API Error", "5 · API Error", [
  {
    id: "api-error-banner",
    name: "API Error Banner",
    type: "frame",
    layout: "horizontal",
    width: "fill_container",
    padding: 12,
    cornerRadius: "$radius.md",
    fill: "$color.error-bg",
    stroke: { type: "color", color: "$color.error" },
    strokeWidth: 1,
    children: [
      text("api-error-text", "Error", API_ERROR_MSG, {
        fontSize: 13,
        fill: "$color.error",
        textGrowth: "fixed-width",
        width: PANEL_W - PANEL_PAD * 2 - 24,
      }),
    ],
  },
  formCard("api-card", [
    ...defaultFormFields("a"),
    primaryButton("a-submit", "Submit", "送出等候名單", { width: "fill_container" }),
  ]),
  text("api-note", "Note", "表單級錯誤提示，頁面不崩潰", {
    fontSize: 11,
    fill: "$color.text-muted",
    textGrowth: "fixed-width",
    width: PANEL_W - PANEL_PAD * 2,
  }),
]);

const doc = {
  version: "2.13",
  variables: V,
  children: [
    {
      id: "form-states-page",
      name: "US-D04 Form States",
      type: "frame",
      x: 0,
      y: 0,
      width: 1900,
      layout: "vertical",
      gap: 32,
      padding: 40,
      fill: "$color.bg",
      children: [
        {
          id: "meta-bar",
          name: "Design Meta",
          type: "frame",
          layout: "horizontal",
          width: "fill_container",
          justifyContent: "space_between",
          padding: [12, 20],
          fill: "#1E293B",
          children: [
            text("meta-title", "Meta", "US-D04 · 等候名單表單狀態稿", {
              fontSize: 14,
              fontWeight: "600",
              fill: "#F8FAFC",
            }),
            text("meta-us", "Impl US", "US-04（Sprint 1）· US-05 成功 UI（Sprint 2）", {
              fontSize: 12,
              fill: "#94A3B8",
            }),
          ],
        },
        text("page-desc", "Desc", "五種狀態並排 · 引用 US-D01 表單元件 · 不跳頁切換", {
          fontSize: 14,
          fill: "$color.text-secondary",
        }),
        {
          id: "states-row",
          name: "Form States Row",
          type: "frame",
          layout: "horizontal",
          gap: 24,
          width: "fill_container",
          children: [
            defaultPanel,
            validationPanel,
            loadingPanel,
            successPanel,
            apiErrorPanel,
          ],
        },
      ],
    },
  ],
};

writeFileSync(OUT, JSON.stringify(doc, null, 2), "utf8");
console.log(`Written: ${OUT}`);
