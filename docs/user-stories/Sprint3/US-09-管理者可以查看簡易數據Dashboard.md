### US-09：管理者可以查看簡易數據 Dashboard

**作為** 管理者  
**我想要** 查看基本轉換數據  
**以便** 判斷課程銷售頁是否有效

**輸入格式**：
- Server 端自 Supabase 聚合查詢：
  - `analytics_events`（`page_view`、`cta_click`、`form_submit_success`）
  - `leads`（總筆數、`created_at` 區間、`status`、`interview_intent`）

**輸出格式**：
- 後台 Dashboard 指標卡片（7 項，spec §6.5）：
  - 總瀏覽數
  - CTA 點擊數
  - 總名單數
  - 轉換率（總名單數 / 總瀏覽數 × 100%；分母為 0 時顯示 0%）
  - 今日新增名單
  - 最近 7 天新增名單
  - 高意願名單數（`interview_intent = true` 或 `status = 高意願`）

**驗收條件**：
- [ ] Dashboard 顯示上述 7 項指標
- [ ] 總瀏覽數來自 `analytics_events` 的 `page_view` 計數
- [ ] CTA 點擊數來自 `analytics_events` 的 `cta_click` 計數
- [ ] 總名單數來自 `leads` 或 `form_submit_success` 事件計數
- [ ] 轉換率計算正確；總瀏覽數為 0 時顯示 0%，不出現除以 0 錯誤
- [ ] 今日新增與最近 7 天新增依 `leads.created_at` 計算
- [ ] 高意願名單數依 spec §6.5 規則計算
- [ ] 所有數字由資料庫即時統計，**不得**寫死前端假資料

**依賴關係**：
- US-02、US-06：事件追蹤資料
- US-05、US-07：名單資料
- US-08（可選）：狀態「高意願」影響高意願名單數統計

**優先級**：P0  
**相關功能**：管理者 Dashboard（spec §6.5、§8）、驗收標準（spec §9）
