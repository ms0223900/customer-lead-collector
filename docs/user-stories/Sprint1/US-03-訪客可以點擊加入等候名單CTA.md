### US-03：訪客可以點擊加入等候名單 CTA

**作為** 一位訪客  
**我想要** 點擊「加入等候名單」按鈕  
**以便** 快速移動到表單區塊並開始填寫

**輸入格式**：
- Hero 或其他區塊上的 CTA 按鈕點擊
- 當前頁面 `session_id`（供事件追蹤）

**輸出格式**：
- 頁面捲動至等候名單表單區塊，或表單區塊展開／聚焦
- 一筆 `analytics_events` 紀錄：
  - `event_type`: `cta_click`
  - `page`, `session_id`, `created_at`
  - `metadata`（可選）：CTA 位置，例如 `hero` / `footer`

**驗收條件**：
- [x] Hero 區塊有明顯「加入等候名單」CTA 按鈕
- [x] 點擊 CTA 後，頁面捲動至等候名單表單，或表單區塊可見
- [ ] 點擊 CTA 時，系統建立一筆 `analytics_events` 資料（Sprint 3）
- [ ] 事件的 `event_type` 為 `cta_click`（Sprint 3）
- [ ] 事件包含 `page`、`session_id`、`created_at`（Sprint 3）

**依賴關係**：
- US-01：Landing Page 與 CTA 已存在
- Sprint 0：`analytics_events` 資料表（若本 Sprint 一併實作事件追蹤）

**優先級**：P0  
**相關功能**：Landing Page CTA（spec §6.1）、事件追蹤 `cta_click`（spec §6.4）
