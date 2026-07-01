/** Shared helpers for admin design generators (US-D06+) */

import { V, text } from "./pen-landing-shared.mjs";

export { V, text };

export const STATUS_BADGES = {
  新名單: { fg: "#2563EB", bg: "#EFF6FF" },
  高意願: { fg: "#C2410C", bg: "#FFF7ED" },
  已聯絡: { fg: "#7C3AED", bg: "#F5F3FF" },
  已訪談: { fg: "#15803D", bg: "#F0FDF4" },
  不適合: { fg: "#475569", bg: "#F1F5F9" },
};

export const TABLE_COLS = [
  { key: "name", label: "姓名", width: 140 },
  { key: "email", label: "Email", width: 260 },
  { key: "role", label: "身分", width: 120 },
  { key: "status", label: "狀態", width: 110 },
  { key: "created", label: "建立時間", width: 160 },
];

export const SAMPLE_LEADS = [
  {
    name: "王小明",
    email: "ming@example.com",
    role: "工程師",
    status: "新名單",
    created: "2026/06/28 14:30",
  },
  {
    name: "李美玲",
    email: "mei@example.com",
    role: "產品經理",
    status: "高意願",
    created: "2026/06/27 10:15",
  },
  {
    name: "陳大文",
    email: "chen@example.com",
    role: "設計師",
    status: "已聯絡",
    created: "2026/06/26 09:00",
  },
  {
    name: "張小華",
    email: "zhang@example.com",
    role: "創業家",
    status: "已訪談",
    created: "2026/06/25 18:20",
  },
  {
    name: "林測試",
    email: "test@example.com",
    role: "學生",
    status: "不適合",
    created: "2026/06/24 11:00",
  },
];

export function statusBadge(id, status) {
  const style = STATUS_BADGES[status] ?? STATUS_BADGES["新名單"];
  return {
    id,
    name: `Badge / ${status}`,
    type: "frame",
    layout: "horizontal",
    alignItems: "center",
    justifyContent: "center",
    padding: [4, 10],
    cornerRadius: 9999,
    fill: style.bg,
    children: [
      text(`${id}-text`, "Badge Text", status, {
        fontSize: 12,
        fontWeight: "500",
        fill: style.fg,
      }),
    ],
  };
}

export function adminShell(prefix, mainChildren, opts = {}) {
  const navItems = [
    { id: "leads", label: "名單管理", active: true },
    { id: "dashboard", label: "Dashboard", active: false, placeholder: true },
    { id: "ai", label: "AI 文案", active: false, placeholder: true },
  ];

  return {
    id: `${prefix}-shell`,
    name: "Admin Shell",
    type: "frame",
    layout: "vertical",
    width: "fill_container",
    cornerRadius: "$radius.lg",
    fill: "$color.surface",
    stroke: { type: "color", color: "$color.border" },
    strokeWidth: 1,
    clip: true,
    children: [
      {
        id: `${prefix}-topbar`,
        name: "Admin Topbar",
        type: "frame",
        layout: "horizontal",
        width: "fill_container",
        height: 56,
        padding: [0, 24],
        fill: "#1E293B",
        justifyContent: "space_between",
        alignItems: "center",
        children: [
          text(`${prefix}-brand`, "Brand", "Lead Collector · 管理後台", {
            fontSize: 14,
            fontWeight: "600",
            fill: "#F8FAFC",
          }),
          text(`${prefix}-route`, "Route", "/admin", {
            fontSize: 12,
            fill: "#94A3B8",
          }),
        ],
      },
      {
        id: `${prefix}-nav`,
        name: "Admin Nav",
        type: "frame",
        layout: "horizontal",
        width: "fill_container",
        padding: [0, 24],
        gap: 4,
        fill: "$color.bg",
        stroke: { type: "color", color: "$color.border" },
        strokeWidth: { bottom: 1 },
        children: navItems.map((item) => ({
          id: `${prefix}-nav-${item.id}`,
          name: `Nav / ${item.label}`,
          type: "frame",
          layout: "horizontal",
          padding: [12, 16],
          children: [
            text(`${prefix}-nav-${item.id}-text`, "Nav Label", item.label, {
              fontSize: 14,
              fontWeight: item.active ? "600" : "400",
              fill: item.active
                ? "$color.secondary"
                : item.placeholder
                  ? "$color.text-muted"
                  : "$color.text-secondary",
            }),
          ],
        })),
      },
      {
        id: `${prefix}-main`,
        name: "Main Content",
        type: "frame",
        layout: "vertical",
        width: "fill_container",
        padding: 32,
        gap: 24,
        fill: "$color.bg",
        children: mainChildren,
      },
    ],
  };
}

export function tableHeader(prefix) {
  return {
    id: `${prefix}-thead`,
    name: "Table Header",
    type: "frame",
    layout: "horizontal",
    width: "fill_container",
    height: 44,
    padding: [0, 16],
    gap: 12,
    fill: "#F1F5F9",
    cornerRadius: [8, 8, 0, 0],
    children: TABLE_COLS.map((col) =>
      text(`${prefix}-th-${col.key}`, `Header ${col.label}`, col.label, {
        fontSize: 12,
        fontWeight: "600",
        fill: "$color.text-secondary",
        width: col.width,
        textGrowth: "fixed-width",
      })
    ).concat([
      text(`${prefix}-th-action`, "Header Action", "", { width: 32 }),
    ]),
  };
}

export function tableRow(prefix, lead, opts = {}) {
  const { status } = lead;
  return {
    id: `${prefix}-row`,
    name: `Table Row / ${lead.name}`,
    type: "frame",
    layout: "horizontal",
    alignItems: "center",
    width: "fill_container",
    height: 56,
    padding: [0, 16],
    gap: 12,
    fill: opts.hover ? "#F0F9FF" : "$color.surface",
    stroke: { type: "color", color: "$color.border" },
    strokeWidth: { bottom: 1 },
    children: [
      text(`${prefix}-name`, "Name", lead.name, {
        fontSize: 14,
        fontWeight: opts.clickable ? "600" : "400",
        fill: opts.clickable ? "$color.secondary" : "$color.text",
        width: TABLE_COLS[0].width,
        textGrowth: "fixed-width",
      }),
      text(`${prefix}-email`, "Email", lead.email, {
        fontSize: 14,
        fill: "$color.text-secondary",
        width: TABLE_COLS[1].width,
        textGrowth: "fixed-width",
      }),
      text(`${prefix}-role`, "Role", lead.role, {
        fontSize: 14,
        fill: "$color.text-secondary",
        width: TABLE_COLS[2].width,
        textGrowth: "fixed-width",
      }),
      {
        id: `${prefix}-status-wrap`,
        name: "Status Cell",
        type: "frame",
        width: TABLE_COLS[3].width,
        layout: "horizontal",
        children: [statusBadge(`${prefix}-badge`, status)],
      },
      text(`${prefix}-created`, "Created", lead.created, {
        fontSize: 13,
        fill: "$color.text-muted",
        width: TABLE_COLS[4].width,
        textGrowth: "fixed-width",
      }),
      text(`${prefix}-chevron`, "Chevron", opts.clickable ? "›" : "", {
        fontSize: 18,
        fill: "$color.text-muted",
        width: 32,
      }),
    ],
  };
}

export function leadsTable(prefix, leads, opts = {}) {
  return {
    id: `${prefix}-table`,
    name: "Leads Table",
    type: "frame",
    layout: "vertical",
    width: "fill_container",
    cornerRadius: "$radius.md",
    stroke: { type: "color", color: "$color.border" },
    strokeWidth: 1,
    clip: true,
    children: [
      tableHeader(prefix),
      ...leads.map((lead, i) =>
        tableRow(`${prefix}-r${i}`, lead, {
          clickable: opts.clickable && i === 0,
          hover: opts.clickable && i === 0,
        })
      ),
    ],
  };
}

export function variantLabel(id, label) {
  return {
    id,
    name: `Variant Label / ${label}`,
    type: "frame",
    layout: "horizontal",
    width: "fill_container",
    padding: [10, 16],
    fill: "#334155",
    cornerRadius: [8, 8, 0, 0],
    children: [
      text(`${id}-text`, "Label", label, {
        fontSize: 13,
        fontWeight: "600",
        fill: "#F8FAFC",
      }),
    ],
  };
}
