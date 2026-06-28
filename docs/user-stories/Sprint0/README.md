# Sprint 0：專案初始化、資料模型與圖面設計

本 Sprint 為 MVP **前置作業**，包含工程初始化與**圖面設計 US**（`US-D01`～`US-D10`）。設計稿完成後，再進入 Sprint 1 實作開發。

---

## 工程初始化（無獨立 US 檔）

- 建立 Next.js 專案、Tailwind、Supabase 連線
- 撰寫 [`docs/spec.md`](../../spec.md)
- 建立 `leads`、`analytics_events` 表（可選 `landing_page_copy`）

**建議 Commit**：`chore: initialize lead collection MVP project`

詳見 [`US-製作指引.md`](../US-製作指引.md) Sprint 0 小節。

---

## 圖面設計 US 一覽

| 編號 | 標題 | 優先級 | 依賴 | 支撐實作 Sprint |
|------|------|--------|------|-----------------|
| [US-D01](./US-D01-設計元件與Design-Tokens.md) | 設計元件與 Design Tokens | P0 | spec | Sprint 1–2+ |
| [US-D02](./US-D02-設計課程銷售頁桌機版.md) | 設計課程銷售頁（桌機版） | P0 | US-D01 | Sprint 1（US-01、US-03） |
| [US-D03](./US-D03-設計課程銷售頁手機版.md) | 設計課程銷售頁（手機版） | P0 | US-D01、US-D02 | Sprint 1（US-01） |
| [US-D04](./US-D04-設計等候名單表單狀態稿.md) | 設計等候名單表單狀態稿 | P0 | US-D01 | Sprint 1–2（US-04、US-05 UI） |
| [US-D05](./US-D05-設計後台框架.md) | 設計後台框架 | P1 | US-D01 | Sprint 2+（可簡化） |
| [US-D06](./US-D06-設計後台名單列表.md) | 設計後台名單列表 | P0 | US-D01 | Sprint 2（US-07） |
| [US-D07](./US-D07-設計Dashboard指標網格.md) | 設計 Dashboard 指標網格 | P1 | US-D01、US-D05 | Sprint 3（US-09） |
| [US-D08](./US-D08-設計單筆名單詳情.md) | 設計單筆名單詳情 | P1 | US-D01、US-D06 | Sprint 4（US-08） |
| [US-D09](./US-D09-設計AI文案產生器展示版.md) | 設計 AI 文案產生器展示版 | P1 | US-D01、US-D05 | Sprint 5（US-10） |
| [US-D10](./US-D10-設計文案套用預覽.md) | 設計文案套用預覽 | P2 | US-D09、US-D02 | Sprint 5 可選（US-11） |

---

## 依賴關係圖

```
spec.md
    │
    └── US-D01（元件 / Tokens）
            │
            ├── US-D02（Landing 桌機）── US-D03（Landing 手機）
            │         │
            │         └── US-D04（表單狀態）
            │
            ├── US-D05（後台框架）
            │         │
            │         ├── US-D06（名單列表）── US-D08（名單詳情）
            │         ├── US-D07（Dashboard）
            │         └── US-D09（AI 展示版）── US-D10（文案預覽，可選）
            │
            └── （US-D04 亦依賴 D01）
```

---

## 建議完成順序

### 完整 MVP 設計

```
US-D01 → US-D02 → US-D03 → US-D04
              → US-D05 → US-D06
              → US-D07（Sprint 3 前）
              → US-D08（Sprint 4 前）
              → US-D09 → US-D10（可選，Sprint 5 前）
```

### 僅 Sprint 1 + Sprint 2 時的最少設計包

若開發範圍只到 Sprint 1、2，**至少完成**：

| 必做 | 說明 |
|------|------|
| US-D01 | 共用元件 |
| US-D02 | Landing 桌機 |
| US-D03 | Landing 手機 |
| US-D04 | 表單 5 種狀態 |
| US-D06 | 後台名單列表（含空狀態、錯誤） |

US-D05 可簡化為「頁面標題 + 表格」而不畫完整多頁籤。US-D07～D10 可略過。

---

## 設計交付物建議（Figma 結構）

```
📁 Lead Collector MVP
├── 🎨 00-Foundation（US-D01）
├── 📱 01-Landing（US-D02、US-D03、US-D04）
├── 🖥️ 02-Admin（US-D05、US-D06、US-D07、US-D08）
└── 🤖 03-AI-Mock（US-D09、US-D10）
```

每張稿請標註對應**實作 US**（如 US-01）與 **spec 章節**，方便 AI 或開發者對照驗收。

---

## 與實作 US 的對照

| 設計 US | 實作 US |
|---------|---------|
| US-D02、US-D03 | US-01 |
| US-D02（CTA 註解） | US-03 |
| US-D04 | US-04、US-05（UI） |
| US-D06 | US-07 |
| US-D07 | US-09 |
| US-D08 | US-08 |
| US-D09 | US-10 |
| US-D10 | US-11 |

**建議 Commit（設計階段）**：`docs: add Sprint 0 design user stories` 或依完成張數分批，例如 `design: landing page and form states mockups`。
