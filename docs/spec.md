# 客戶名單收集系統 Spec

## 1. 背景與目標

課程創作者在正式開課前，需要先確認市場是否對課程主題有興趣。

本 MVP 以《聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品》這堂課作為銷售主題，建立一個簡單的課程銷售頁與等候名單收集系統。

目標不是建立完整行銷自動化系統，而是先完成一個可以驗證需求的最小版本（Minimal Viable Product, MVP）：
- 訪客能理解課程價值並留下等候名單
- 管理者能查看名單並觀察基本轉換數據

本專案同時作為教學演示，示範如何將軟體開發流程（SDD）從「股票追蹤工具」完美映射到「課程銷售與名單收集系統」。

## 2. 目標使用者

### 管理者（課程 / 產品創作者）
需要建立銷售頁、收集名單，並觀察數據來評估市場對課程主題的興趣，進而決定是否正式開課、或如何調整銷售文案。

### 訪客（潛在學員）
對「不懂程式也能用 AI 做出可上線產品」感興趣的潛在學員。想快速了解課程價值、適合對象、學習成果，並可以填寫表單留下 Email 以獲得課程開放通知。

## 3. 技術棧

- **Framework**：Next.js 16 (App Router)
- **Language**：TypeScript
- **Styling**：Tailwind CSS 4
- **Database**：Supabase (PostgreSQL)
- **Deploy**：Vercel

## 4. MVP 功能範圍

### Must Have（必做）
- 顯示課程銷售 Landing Page 區塊
- 顯示等候名單表單
- 表單送出後儲存名單資料至 `leads`
- 後台可以查看名單列表
- 後台可以查看單筆名單詳細資料
- 管理者可以更新名單狀態（新名單、高意願、已聯絡、已訪談、不適合）
- 系統自動記錄基本事件：`page_view`、`cta_click`、`form_submit_success` 寫入 `analytics_events`
- 管理者 Dashboard 顯示基本數據（非前端假資料，由資料庫即時計算）：總瀏覽數、CTA 點擊數、總名單數、轉換率、今日新增名單、最近 7 天新增名單、高意願名單數

### Should Have（應該做）
- 管理者可以對名單新增/修改「備註」
- 表單送出錯誤時記錄 `form_submit_error`
- AI 銷售頁文案產生器展示版（使用固定範例或 Mock 結果，不串真正 AI API）

### Could Have（可以做）
- 高意願名單篩選
- 最近 7 天名單趨勢圖
- 銷售頁文案套用預覽

### Won't Have（明確不做）
- 真正 AI API 串接
- Email 自動寄送（如 Welcoming Email）
- Email 行銷與電子報活動
- GA4 / GTM / Facebook Pixel 整合
- UTM 追蹤與進階歸因
- A/B 測試
- 線上付款與金流
- 會員登入系統
- 完整 CRM 功能
- 複雜多帳號權限管理
- 多銷售頁管理

## 5. 核心流程

1. 訪客進入課程銷售頁。
2. 系統在 Server 端/Client 端記錄一次 `page_view` 事件，並自動產生/讀取 `sessionId` 寫入 `analytics_events`。
3. 訪客閱讀課程介紹、痛點與課程承諾。
4. 訪客點擊「加入等候名單」CTA 按鈕。
5. 系統記錄一次 `cta_click` 事件。
6. 訪客填寫等候名單表單。
7. 系統驗證 Email 與必填欄位，不合格時記錄 `form_submit_error`。
8. 格式正確時，系統在 `leads` 建立一筆名單資料。
9. 表單成功送出後，系統記錄一次 `form_submit_success` 事件（關聯 `leadId`）。
10. 管理者進入後台路徑（如 `/admin`），系統讀取並呈現名單列表。
11. 管理者在 Dashboard 觀察由 `analytics_events` 與 `leads` 即時計算的轉換指標。

## 6. 功能需求

### 6.1 課程銷售 Landing Page
呈現《聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品》的課程價值，至少包含以下區塊：
- **Hero 區塊**：課程名稱、一句話價值主張、加入等候名單 CTA。
- **痛點區塊**：列出學員痛點（如「想做 Side Project 但不會寫程式」、「嘗試 AI 卻卡在需求與部署」等）。
- **課程承諾**：明確的學習成果（如「半天內完成可上線副業 MVP」）。
- **適合對象**：定義目標學員身分。
- **課程內容摘要**：選題、Spec、Rules、Build、Debug、Deploy 實戰。
- **等候名單 CTA**：引導留下 Email 以便通知。

### 6.2 等候名單表單
訪客填寫表單以加入等候名單，欄位包括：
- 姓名（文字）
- Email（必填，且格式須正確）
- 身分 / 角色（下拉選單/文字，如：工程師、產品經理、設計師、行銷人、創業家、學生等）
- 最想用 AI 做出的產品（文字）
- 目前卡關點（文字）
- 是否願意接受訪談（布林值）

表單送出後，系統顯示成功畫面：「你已成功加入等候名單！課程開放時，我們會第一時間通知你。如果你願意接受訪談，我們可能會優先聯絡你了解需求。」

### 6.3 名單管理 (Admin Panel)
管理者可在後台進行以下操作：
- 查看名單列表，呈現姓名、Email、身分、狀態、建立時間。
- 點擊查看單筆名單的完整詳細資料。
- 更新名單狀態（新名單 / 高意願 / 已聯絡 / 已訪談 / 不適合）。
- 對單筆名單新增、修改備註（備註可空）。

### 6.4 簡易事件追蹤
將關鍵訪客行為記錄到 `analytics_events`：
- `page_view`：進入銷售頁。
- `cta_click`：點擊任何加入等候名單 CTA 按鈕。
- `form_submit_success`：等候名單表單送出成功。
- `form_submit_error`：等候名單表單送出失敗（可記錄失敗欄位或原因）。

Dashboard 數據必須即時從事件與名單資料表中統計計算，不允許在前端寫死假數據。

### 6.5 管理者 Dashboard
提供基本轉換與流量數據：
- 總瀏覽數：`page_view` 事件數
- CTA 點擊數：`cta_click` 事件數
- 總名單數：`leads` 總筆數（或 `form_submit_success` 事件數）
- 轉換率：`總名單數 / 總瀏覽數 * 100%`（若總瀏覽數為 0 則顯示 0%）
- 今日新增名單：今日建立的名單筆數
- 最近 7 天新增名單：最近 7 天建立的名單筆數
- 高意願名單數：願意接受訪談（`interviewIntent` = true）或狀態為「高意願」的名單數

### 6.6 AI 銷售頁文案產生器（Mock 展示版）
此功能為教學展示，**不串接真實 AI API**。
管理者可輸入：課程名稱、目標學員、核心痛點、課程承諾、語氣風格。
系統儲存此設定並返回固定範例結果（Hero 標題、副標、痛點段落、課程承諾段落、CTA 文案、FAQ 草稿），並在介面上清楚標示「此版本為展示版，文案為 Mock 產生，尚未串接真實 AI API」。

## 7. 資料模型 (Supabase)

### leads

| 欄位 | 型態 | 必填 | 說明 |
|---|---|---|---|
| id | uuid | 是 | 名單 ID (Primary Key) |
| name | text | 否 | 姓名 |
| email | text | 是 | Email |
| role | text | 否 | 身分 / 角色 |
| product_idea | text | 否 | 最想用 AI 做出的產品 |
| pain_point | text | 否 | 目前卡關點 |
| interview_intent | boolean | 是 | 是否願意接受訪談 (預設 `false`) |
| status | text | 是 | 狀態 (新名單 / 高意願 / 已聯絡 / 已訪談 / 不適合，預設 `新名單`) |
| note | text | 否 | 管理者備註 |
| source | text | 否 | 來源頁面 |
| created_at | timestamptz | 是 | 建立時間 |
| updated_at | timestamptz | 否 | 更新時間 |

### analytics_events

| 欄位 | 型態 | 必填 | 說明 |
|---|---|---|---|
| id | uuid | 是 | 事件 ID (Primary Key) |
| event_type | text | 是 | 事件類型 (page_view / cta_click / form_submit_success / form_submit_error) |
| page | text | 是 | 發生頁面路徑 (例如 `/`) |
| session_id | text | 是 | 簡易訪客識別 (Client 端 cookie/localStorage 產生) |
| lead_id | uuid | 否 | 關聯 leads.id (Nullable) |
| metadata | jsonb | 否 | 補充資訊 (例如錯誤訊息、點擊的 CTA 位置) |
| created_at | timestamptz | 是 | 事件發生時間 |

### landing_page_copy

| 欄位 | 型態 | 必填 | 說明 |
|---|---|---|---|
| id | uuid | 是 | 文案 ID (Primary Key) |
| course_name | text | 是 | 課程名稱 |
| hero_title | text | 否 | Hero 標題 |
| hero_subtitle | text | 否 | Hero 副標 |
| pain_points | jsonb | 否 | 痛點文案 |
| promise | text | 否 | 課程承諾 |
| cta_text | text | 否 | CTA 文案 |
| faq | jsonb | 否 | FAQ 草稿 |
| source | text | 是 | 來源類型 (mock / ai_api) |
| created_at | timestamptz | 是 | 建立時間 |
| updated_at | timestamptz | 否 | 更新時間 |

## 8. UI 範圍

系統規劃為兩個主要路由：
1. **訪客前台 (`/`)**
   - 包含銷售頁 Landing Page 區塊。
   - 嵌入「加入等候名單」表單與 CTA。
   - 送出表單後，不跳頁，在原地淡入顯示成功狀態與感謝訊息。
2. **管理者後台 (`/admin`)**
   - 需透過簡易密碼或環境變數保護（無完整權限/會員系統）。
   - **Dashboard 數據看板網格**：總瀏覽數、總名單數、轉換率等 7 個指標卡片。
   - **名單管理表格**：列出名單，支援點擊單筆展開詳細彈窗、修改狀態、輸入備註與儲存。
   - **AI 文案展示頁籤**：輸入表單，提交後即時顯示固定 Mock 文案。

## 9. 驗收標準

完成本 MVP 時，應符合以下條件：
- 訪客可以正常開啟銷售 Landing Page。
- 開啟銷售頁時，系統在 DB 的 `analytics_events` 寫入一筆 `page_view` 資料（含有 session_id）。
- 訪客點擊銷售頁上任何 CTA 按鈕時，系統寫入一筆 `cta_click` 事件。
- 訪客可以填寫並送出名單表單。
- Email 未填或格式錯誤（缺少 @ 等）時，表單無法送出，並於欄位下方顯示繁中錯誤提示。同時系統應在 DB 寫入 `form_submit_error`。
- 表單成功送出後，DB 的 `leads` 表中會新增一筆對應名單，且 `analytics_events` 會新增一筆 `form_submit_success` 事件（已正確填寫 `lead_id`）。
- 訪客端表單自動替換為「成功加入」的繁中感謝訊息。
- 管理者可以開啟後台。後台 Dashboard 各項指標能即時對應 DB 的資料筆數與事件總數，而非靜態死資料。
- 管理者可以在列表點擊任何名單查看詳細，並能修改其狀態（如「已聯絡」）與新增備註。按下儲存後，重新整理後台，修改內容成功儲存。
- AI 銷售頁文案產生器展示版在填入資訊並送出後，能顯示一段精緻的 Mock 文案，且頁面標示「展示版不串接真實 AI API」警語。

## 10. 教學備註

這份 Spec 的重點在於向學員演示：
1. 如何將看似龐大的行銷收集器，聚焦並限制在**最小成功路線**。
2. 如何在 MVP 中，用簡易的「事件資料表 (analytics_events)」代替複雜的 GA4，向學員揭開 Dashboard 背後資料統計的原理。
3. 如何將 AI 產生功能進行優雅的 **Mock 封裝**，將教學重點保留在 SDD 流程與架構，而非失焦於第三方 API 的異常除錯與 API Key 額度管理。
