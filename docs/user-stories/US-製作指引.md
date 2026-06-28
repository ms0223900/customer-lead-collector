# User Story 製作指引

本指引以 Notion [Build Sprint](https://app.notion.com/p/2cbf652e258a41279d3f38913ca4fde6) 為基準，說明如何從 Spec 產出 US、如何挑選實作、如何驗收與 Commit。對應 US 清單見 [`README.md`](./README.md)。

---

## 1. 定位與核心流程

Build Sprint 的目標**不是一次做完所有功能**，而是依照 SDD（Spec-Driven Development）小步交付：

```
Spec（docs/spec.md）
    ↓
User Stories（docs/user-stories/）
    ↓
挑一張或一組 US
    ↓
AI 實作（先計畫、再動手）
    ↓
人工驗收（對照 US 驗收條件）
    ↓
補缺漏
    ↓
Commit
    ↓
下一組 US
```

**核心展示訊息**：換成「課程銷售與名單收集」題目後，同一套 Build Sprint 流程仍可重複使用。

---

## 2. 如何撰寫一張正式 US

每張 US 使用 [`user-stories` skill](../../.claude/skills/user-stories/SKILL.md) 模板，至少包含：

| 區塊 | 說明 |
|------|------|
| 作為 / 我想要 / 以便 | 標準 User Story 三段式 |
| **輸入格式** | API payload、表單欄位、前置資料、環境 |
| **輸出格式** | 畫面、DB 紀錄、API response、狀態變化 |
| **驗收條件** | 可勾選、可測試的 checklist |
| **依賴關係** | 前置 US、Sprint、外部條件 |
| **優先級** | P0（Must）/ P1（Should）/ P2（Could 或後續） |
| **相關功能** | 對應 `spec.md` 章節 |

### 撰寫原則（來自 US 設計頁）

1. **最小閉環優先**：銷售頁 → 等候名單 → 後台 → Dashboard  
2. **Mock 與真 API 分離**：US-10 展示版 ≠ US-12 真 API  
3. **Dashboard 必有資料來源**：指標自 `leads` / `analytics_events` 計算  
4. **一張 US = 一輪可 Commit 的交付單元**  

### 檔案命名與目錄

US 依 Sprint 分資料夾存放：

```
docs/user-stories/Sprint{N}/US-{編號}-{簡短標題}.md
```

Sprint 0 為初始化（無正式 US），見 [`Sprint0/README.md`](./Sprint0/README.md)。

新增 US 後，更新 [`README.md`](./README.md) 一覽表與依賴圖。

---

## 3. Sprint 對照表

| Sprint | 目標 | 對應 US | 建議 Commit |
|--------|------|---------|-------------|
| **0** 初始化與圖面設計 | 專案、spec、資料表、設計稿 | US-D01～US-D10 | `chore: initialize…` / `design: …` |
| **1** Landing + 表單 | 訪客看得到、填得了 | US-01, US-03, US-04 | `feat: add course landing page and waitlist form` |
| **2** 名單持久化 | 資料存 DB、後台列表 | US-05, US-07 | `feat: persist waitlist leads and add admin leads list` |
| **3** 事件 + Dashboard | 數據來自 DB | US-02, US-06, US-09 | `feat: track funnel events and add analytics dashboard` |
| **4** 名單管理 | 狀態與備註 | US-08 | `feat: add lead detail and status management` |
| **5** AI 展示版 | Mock 文案產生器 | US-10,（可選）US-11 | `feat: add mock AI landing page copy generator` |
| **6** 真 AI API | 後續迭代 | US-12 | `feat: integrate AI API for landing page copy generation` |

---

## 4. 各 Sprint 操作細則

### Sprint 0：專案初始化、資料模型與圖面設計

**工作項目**：
- 建立 Next.js 專案、Tailwind、Supabase 連線
- 撰寫 [`docs/spec.md`](../spec.md)
- 建立本目錄 US 文件
- 建立 `leads`、`analytics_events` 表（可選 `landing_page_copy`）
- **圖面設計**：依 [`Sprint0/README.md`](./Sprint0/README.md) 完成設計 US（`US-D01`～`US-D10`）

**設計 US 建議順序**（Sprint 1 開發前至少完成粗體項）：
- **US-D01** → **US-D02** → **US-D03** → **US-D04**（Landing + 表單）
- **US-D06**（Sprint 2 前；US-D05 可簡化）
- US-D07～D10：依後續 Sprint 排程

**驗收檢查**：
- [ ] `npm run dev` 可啟動
- [ ] `spec.md` 含 MVP 範圍與 Won't Have
- [ ] `leads` 欄位足以儲存等候名單
- [ ] `analytics_events` 足以儲存四種事件類型
- [ ] Sprint 1 前：US-D01～D04 設計稿可對照實作 US-01～04
- [ ] Sprint 2 前：US-D06 設計稿可對照實作 US-07

---

### Sprint 1：課程銷售頁與等候名單表單

**對應 US**：US-01、US-03、US-04  

**本輪做**：Landing 版面、文案、CTA、表單、client 驗證、loading / 成功 / 錯誤 UI  

**本輪不做**：寫 DB、Dashboard、後台、事件追蹤、AI 文案  

**驗收**：對照 US-01 / US-03 / US-04 驗收條件全勾  

**建議 AI 指令**：

```text
請閱讀 docs/spec.md 與 docs/user-stories/，依序實作 US-01、US-03、US-04。

目標是完成課程銷售 Landing Page 與等候名單表單。
這一輪先不用串接資料庫，也不用做 Dashboard。

請先提出實作計畫，列出你會修改哪些檔案，再開始實作。
```

> 若範圍過大，可拆為 Sprint 1-A（US-01）、Sprint 1-B（US-03 + US-04）。

---

### Sprint 2：串接名單資料庫與後台列表

**對應 US**：US-05、US-07  

**本輪做**：表單寫入 `leads`、後台列表、空狀態、最新排序  

**本輪不做**：狀態編輯、詳情、Dashboard、事件追蹤、AI  

**建議 AI 指令**：

```text
請閱讀 docs/spec.md 與 docs/user-stories/，實作 US-05 與 US-07。

目標是讓等候名單表單資料真的儲存到 leads 資料表，並建立管理後台列表頁。
這一輪先不要做 Dashboard，也不要做 AI 文案產生器。
請先提出資料流與修改計畫，再開始實作。
```

---

### Sprint 3：事件追蹤與簡易 Dashboard

**對應 US**：US-02、US-06、US-09  

**本輪做**：`page_view` / `cta_click` / `form_submit_*`、Dashboard 七項指標自 DB 聚合  

**本輪不做**：GA4、UTM、A/B Test、登入權限  

**建議 AI 指令**：

```text
請閱讀 docs/spec.md 與 docs/user-stories/，實作 US-02、US-06、US-09。

重點是讓 Dashboard 背後有資料來源，請不要使用純前端假資料。
請先提出資料表、事件紀錄與統計邏輯，再開始實作。
```

---

### Sprint 4：名單狀態管理

**對應 US**：US-08  

**本輪做**：單筆詳情、狀態更新、備註、儲存後列表同步  

**驗收**：重新整理後狀態保留；Dashboard 高意願名單數可反映變更  

---

### Sprint 5：AI 文案展示版

**對應 US**：US-10、（可選）US-11  

**本輪做**：Mock 產生器、展示版警語、固定範例結果  

**明確不做**：真 AI API、API Key、token / prompt 工程  

**建議 AI 指令**：

```text
請閱讀 docs/spec.md 與 docs/user-stories/，實作 US-10。

這一輪只做 AI 銷售頁文案產生器的教學展示版，不串接真正 AI API。
畫面上必須清楚標示「展示版，尚未串接真正 AI API」。
真正 API 串接留到 US-12，不要在這一輪實作。
```

---

### Sprint 6：真正 AI API（後續迭代）

**對應 US**：US-12  

**不列入**第一支展示影片主線。API Key 僅後端環境變數。

---

## 5. 每個 Sprint 共同檢查清單

開始前：
- [ ] 本輪**只做**指定 US，不順手加功能
- [ ] 已閱讀 `spec.md` 與對應 US 文件
- [ ] AI 開始前先提出修改計畫（檔案清單、資料流）

實作後：
- [ ] 逐條對照 US **驗收條件**勾選
- [ ] 有缺漏先補，不直接進下一 US
- [ ] `npm run build` / `lint` / `typecheck` 盡可能通過
- [ ] Commit message 清楚描述本輪完成內容
- [ ] 需求不清時，先回頭更新 `spec.md` 或 US 文件，再繼續實作

---

## 6. 課程展示建議

**主線影片**（加分案例）：Sprint 1 → 2 → 3 → 5  

**可快轉或口頭帶過**：Sprint 0、4、6  

**四段關鍵訊息**：
1. 先讓頁面看得到  
2. 再讓資料存得起來  
3. 接著讓數據有來源  
4. 最後再加 AI 展示版，不急著串 API  

**Demo 最低目標**（Build Sprint 備註）：完成到 Sprint 2 即可看到「等候名單」閉環。

---

## 7. 與 spec 衝突時怎麼辦

1. **以 `docs/spec.md` 為產品行為準則**  
2. US 文件描述「如何交付與驗收」  
3. 發現 spec 缺漏：先更新 spec §12 或 US，再實作  
4. 欄位命名、事件類型以 spec §7 為準（如 `event_type`、`session_id`）

---

## 8. 快速參考連結

- [Spec](../spec.md)
- [US 總覽](./README.md)
- Notion：[US 設計](https://app.notion.com/p/64a1c41c17494fae8ed5069afda11535) · [Build Sprint](https://app.notion.com/p/2cbf652e258a41279d3f38913ca4fde6)
