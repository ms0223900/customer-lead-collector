#!/usr/bin/env node
/** US-D03 Mobile Landing Page — Run: node docs/design/generate-us-d03-pen.mjs */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  V,
  COURSE_NAME,
  TAGLINE,
  PAINS,
  AUDIENCE,
  MODULES,
  text,
  primaryButton,
  sectionTitle,
  painCard,
  moduleCard,
  inputField,
  annotationNote,
  defaultFormFields,
} from "./pen-landing-shared.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "US-D03-landing-mobile.pen");
const W = 375;
const PAD = 20;
const CONTENT_W = W - PAD * 2;

const doc = {
  version: "2.13",
  variables: V,
  children: [
    {
      id: "landing-mobile",
      name: "US-D03 Landing Page / Mobile",
      type: "frame",
      x: 0,
      y: 0,
      width: W,
      layout: "vertical",
      fill: "$color.bg",
      children: [
        {
          id: "meta-bar",
          name: "Design Meta",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [10, PAD],
          gap: 4,
          fill: "#1E293B",
          children: [
            text("meta-title", "Meta", "US-D03 · 手機版 375px", {
              fontSize: 11,
              fontWeight: "600",
              fill: "#F8FAFC",
            }),
            text("meta-us", "Impl US", "US-01 響應式 · 內容對齊 US-D02", {
              fontSize: 10,
              fill: "#94A3B8",
            }),
          ],
        },
        {
          id: "header",
          name: "Header",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [12, PAD],
          gap: 12,
          fill: "$color.surface",
          stroke: { type: "color", color: "$color.border" },
          strokeWidth: { bottom: 1 },
          children: [
            text("logo", "Logo", "AI 課程", {
              fontSize: 14,
              fontWeight: "600",
            }),
            primaryButton("header-cta", "Header CTA", "加入等候名單", {
              width: "fill_container",
            }),
          ],
        },
        {
          id: "hero",
          name: "Section / Hero",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [32, PAD],
          gap: 20,
          fill: "$color.bg-alt",
          children: [
            text("hero-eyebrow", "Eyebrow", "線上實戰工作坊", {
              fontSize: 12,
              fontWeight: "600",
              fill: "$color.secondary",
            }),
            text("hero-title", "Course Name", COURSE_NAME, {
              fontSize: 26,
              fontWeight: "700",
              lineHeight: 1.25,
              textGrowth: "fixed-width",
              width: CONTENT_W,
            }),
            text("hero-tagline", "Tagline", TAGLINE, {
              fontSize: 15,
              fill: "$color.text-secondary",
              textGrowth: "fixed-width",
              width: CONTENT_W,
              lineHeight: 1.6,
            }),
            primaryButton("hero-cta", "Hero CTA", "加入等候名單", {
              width: "fill_container",
            }),
            {
              id: "hero-visual",
              name: "Hero Visual",
              type: "frame",
              width: "fill_container",
              height: 160,
              cornerRadius: "$radius.lg",
              fill: "$color.surface",
              stroke: { type: "color", color: "$color.border" },
              strokeWidth: 1,
              layout: "vertical",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              children: [
                text("hero-visual-title", "Visual", "AI × SDD 實戰流程", {
                  fontSize: 16,
                  fontWeight: "600",
                  fill: "$color.secondary",
                }),
                text("hero-visual-sub", "Visual Sub", "Spec → Build → Deploy", {
                  fontSize: 12,
                  fill: "$color.text-muted",
                }),
              ],
            },
          ],
        },
        {
          id: "pain-points",
          name: "Section / Pain Points",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [40, PAD],
          gap: 20,
          children: [
            text("pain-title", "Pain Title", "你是否也有這些卡關？", {
              fontSize: 22,
              fontWeight: "700",
              textGrowth: "fixed-width",
              width: CONTENT_W,
            }),
            ...PAINS.map((p) => painCard(p.id, p.title, p.desc, CONTENT_W)),
          ],
        },
        {
          id: "promise",
          name: "Section / Promise",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [40, PAD],
          gap: 16,
          fill: "$color.surface",
          children: [
            text("promise-title", "Promise Title", "課程承諾", {
              fontSize: 22,
              fontWeight: "700",
            }),
            {
              id: "promise-box",
              name: "Promise Box",
              type: "frame",
              layout: "vertical",
              gap: 12,
              width: "fill_container",
              padding: 20,
              cornerRadius: "$radius.lg",
              fill: "$color.bg-alt",
              stroke: { type: "color", color: "$color.secondary" },
              strokeWidth: 2,
              children: [
                text("promise-headline", "Headline", "半天內完成可上線副業 MVP", {
                  fontSize: 22,
                  fontWeight: "700",
                  textGrowth: "fixed-width",
                  width: CONTENT_W - 40,
                }),
                text("promise-body", "Body", "從釐清需求、撰寫 Spec、設定 AI Rules，到 Build、Debug、Deploy——帶著你走完一條可複製的最小成功路線。", {
                  fontSize: 14,
                  fill: "$color.text-secondary",
                  textGrowth: "fixed-width",
                  width: CONTENT_W - 40,
                  lineHeight: 1.7,
                }),
              ],
            },
          ],
        },
        {
          id: "audience",
          name: "Section / Audience",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [40, PAD],
          gap: 16,
          children: [
            text("audience-title", "Audience Title", "適合對象", {
              fontSize: 22,
              fontWeight: "700",
            }),
            ...AUDIENCE.map((item, i) => ({
              id: `audience-${i}`,
              name: `Audience / ${i}`,
              type: "frame",
              layout: "horizontal",
              gap: 8,
              padding: [12, 16],
              width: "fill_container",
              cornerRadius: "$radius.md",
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
                  fontSize: 13,
                  textGrowth: "fixed-width",
                  width: CONTENT_W - 50,
                }),
              ],
            })),
          ],
        },
        {
          id: "curriculum",
          name: "Section / Curriculum",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [40, PAD],
          gap: 16,
          fill: "$color.surface",
          children: [
            text("curriculum-title", "Curriculum Title", "課程內容摘要", {
              fontSize: 22,
              fontWeight: "700",
            }),
            text("curriculum-sub", "Sub", "六個實戰模組", {
              fontSize: 14,
              fill: "$color.text-secondary",
            }),
            ...MODULES.map((m) =>
              moduleCard(m.id, m.step, m.title, m.desc, CONTENT_W)
            ),
          ],
        },
        {
          id: "waitlist",
          name: "Section / Waitlist (#waitlist)",
          type: "frame",
          layout: "vertical",
          width: "fill_container",
          padding: [40, PAD],
          gap: 20,
          fill: "#FFF7ED",
          children: [
            text("waitlist-title", "Waitlist Title", "加入等候名單", {
              fontSize: 22,
              fontWeight: "700",
            }),
            text("waitlist-sub", "Sub", "留下 Email，課程開放時第一時間通知你", {
              fontSize: 14,
              fill: "$color.text-secondary",
              textGrowth: "fixed-width",
              width: CONTENT_W,
            }),
            primaryButton("waitlist-cta", "Waitlist CTA", "立即加入等候名單", {
              width: "fill_container",
            }),
            {
              id: "waitlist-form",
              name: "Waitlist Form / Default",
              type: "frame",
              layout: "vertical",
              gap: 16,
              width: "fill_container",
              padding: 20,
              cornerRadius: "$radius.lg",
              fill: "$color.surface",
              stroke: { type: "color", color: "$color.border" },
              strokeWidth: 1,
              children: [
                ...defaultFormFields("m-form"),
                primaryButton("m-form-submit", "Submit", "送出等候名單", {
                  width: "fill_container",
                }),
              ],
            },
            annotationNote(
              "mobile-form-note",
              "表單狀態（Loading / Error / Success）見 US-D04",
              CONTENT_W
            ),
          ],
        },
        {
          id: "footer",
          name: "Footer",
          type: "frame",
          layout: "horizontal",
          width: "fill_container",
          padding: [24, PAD],
          fill: "#1E293B",
          justifyContent: "center",
          children: [
            text("footer-copy", "Copyright", "© 2026 Lead Collector MVP", {
              fontSize: 11,
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
