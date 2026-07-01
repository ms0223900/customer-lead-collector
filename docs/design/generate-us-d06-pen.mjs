#!/usr/bin/env node
/** US-D06 Admin Leads List — Run: node docs/design/generate-us-d06-pen.mjs */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { text } from "./pen-landing-shared.mjs";
import {
  V,
  SAMPLE_LEADS,
  adminShell,
  leadsTable,
  variantLabel,
} from "./pen-admin-shared.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "US-D06-admin-leads-list.pen");

function pageHeader(prefix, title, subtitle) {
  return {
    id: `${prefix}-header`,
    name: "Page Header",
    type: "frame",
    layout: "vertical",
    gap: 6,
    width: "fill_container",
    children: [
      text(`${prefix}-title`, "Title", title, {
        fontSize: 24,
        fontWeight: "700",
      }),
      text(`${prefix}-sub`, "Subtitle", subtitle, {
        fontSize: 14,
        fill: "$color.text-secondary",
      }),
    ],
  };
}

const variantWithData = {
  id: "variant-data",
  name: "Variant / With Data",
  type: "frame",
  layout: "vertical",
  width: "fill_container",
  gap: 0,
  children: [
    variantLabel("v-data-label", "1 · 有資料（最新在上）"),
    adminShell("data", [
      pageHeader("data", "等候名單", `共 ${SAMPLE_LEADS.length} 筆 · 資料來源 leads 表`),
      leadsTable("data", SAMPLE_LEADS, { clickable: true }),
      {
        id: "data-click-note",
        name: "Click Note",
        type: "frame",
        layout: "horizontal",
        padding: [10, 14],
        cornerRadius: "$radius.md",
        fill: "#FEF3C7",
        stroke: { type: "color", color: "#F59E0B" },
        strokeWidth: 1,
        width: "fill_container",
        children: [
          text("data-click-text", "Note", "📌 列表列可點擊查看詳情（US-D08 / US-08，Sprint 4）；Sprint 2 僅需列表呈現", {
            fontSize: 12,
            fill: "#92400E",
            textGrowth: "fixed-width",
            width: 900,
            lineHeight: 1.5,
          }),
        ],
      },
    ]),
  ],
};

const variantEmpty = {
  id: "variant-empty",
  name: "Variant / Empty",
  type: "frame",
  layout: "vertical",
  width: "fill_container",
  gap: 0,
  children: [
    variantLabel("v-empty-label", "2 · 空狀態"),
    adminShell("empty", [
      pageHeader("empty", "等候名單", "共 0 筆"),
      {
        id: "empty-state",
        name: "Empty State",
        type: "frame",
        layout: "vertical",
        gap: 16,
        width: "fill_container",
        padding: [64, 32],
        alignItems: "center",
        cornerRadius: "$radius.lg",
        fill: "$color.surface",
        stroke: { type: "color", color: "$color.border" },
        strokeWidth: 1,
        children: [
          {
            id: "empty-icon",
            type: "frame",
            width: 64,
            height: 64,
            cornerRadius: 9999,
            fill: "$color.bg-alt",
            layout: "horizontal",
            alignItems: "center",
            justifyContent: "center",
            children: [
              text("empty-icon-text", "Icon", "📋", { fontSize: 28 }),
            ],
          },
          text("empty-title", "Empty Title", "目前尚無等候名單", {
            fontSize: 20,
            fontWeight: "600",
            fill: "$color.text",
          }),
          text("empty-desc", "Empty Desc", "訪客填寫銷售頁表單後，名單會顯示於此", {
            fontSize: 14,
            fill: "$color.text-secondary",
            textAlign: "center",
            textGrowth: "fixed-width",
            width: 400,
            lineHeight: 1.6,
          }),
        ],
      },
    ]),
  ],
};

const variantError = {
  id: "variant-error",
  name: "Variant / Error",
  type: "frame",
  layout: "vertical",
  width: "fill_container",
  gap: 0,
  children: [
    variantLabel("v-error-label", "3 · 讀取失敗"),
    adminShell("error", [
      pageHeader("error", "等候名單", "無法載入資料"),
      {
        id: "error-banner",
        name: "Error Banner",
        type: "frame",
        layout: "horizontal",
        gap: 10,
        width: "fill_container",
        padding: [14, 16],
        cornerRadius: "$radius.md",
        fill: "$color.error-bg",
        stroke: { type: "color", color: "$color.error" },
        strokeWidth: 1,
        children: [
          text("error-banner-text", "Error", "無法載入名單，請稍後再試", {
            fontSize: 14,
            fontWeight: "500",
            fill: "$color.error",
          }),
        ],
      },
      {
        id: "error-skeleton",
        name: "Table Skeleton",
        type: "frame",
        layout: "vertical",
        width: "fill_container",
        cornerRadius: "$radius.md",
        fill: "$color.surface",
        stroke: { type: "color", color: "$color.border" },
        strokeWidth: 1,
        opacity: 0.5,
        children: [
          {
            id: "error-skeleton-header",
            type: "frame",
            height: 44,
            width: "fill_container",
            fill: "#F1F5F9",
          },
          ...[1, 2, 3].map((i) => ({
            id: `error-skeleton-row-${i}`,
            type: "frame",
            height: 56,
            width: "fill_container",
            fill: "$color.surface",
            stroke: { type: "color", color: "$color.border" },
            strokeWidth: { bottom: 1 },
          })),
        ],
      },
      text("error-note", "Error Note", "頁面結構保持完整，僅主內容區顯示錯誤提示", {
        fontSize: 12,
        fill: "$color.text-muted",
      }),
    ]),
  ],
};

const doc = {
  version: "2.13",
  variables: V,
  children: [
    {
      id: "page",
      name: "US-D06 Admin Leads List",
      type: "frame",
      x: 0,
      y: 0,
      width: 1440,
      layout: "vertical",
      gap: 48,
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
            text("meta-title", "Meta", "US-D06 · 後台名單列表", {
              fontSize: 14,
              fontWeight: "600",
              fill: "#F8FAFC",
            }),
            text("meta-us", "Impl US", "實作：US-07 · 路由 /admin · leads 五欄", {
              fontSize: 12,
              fill: "#94A3B8",
            }),
          ],
        },
        text("page-desc", "Desc", "三種變體 · 引用 US-D01 Badge / 表格列 · US-D05 簡化版 Shell", {
          fontSize: 14,
          fill: "$color.text-secondary",
        }),
        variantWithData,
        variantEmpty,
        variantError,
      ],
    },
  ],
};

writeFileSync(OUT, JSON.stringify(doc, null, 2), "utf8");
console.log(`Written: ${OUT}`);
