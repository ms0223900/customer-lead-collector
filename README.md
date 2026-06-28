# 客戶名單收集系統 · Customer Lead Collector

課程用 MVP：前台提供課程銷售一頁式 Landing Page 搭配等候名單表單，並內建簡單的訪客事件追蹤；後台提供管理者 Dashboard 即時統計數據（總瀏覽、表單轉換率、今日新增等）以及完整的學員名單管理。

> 演示主題：《聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品》課程銷售與等候名單收集。

## 功能概覽

| 功能 | 說明 |
| ---- | ------------------------------------------------------- |
| 課程銷售 Landing Page | 呈現《聊著聊著，AI 就做完了》課程核心價值、痛點承諾、適合對象與 FAQ |
| 等候名單表單 | 訪客填寫姓名、Email、身分、卡關點與訪談意願，前端即時驗證、送出後自動淡入感謝訊息 |
| 簡易事件追蹤 | 自動記錄 `page_view`、`cta_click`、`form_submit_success`、`form_submit_error` 等訪客行為 |
| 管理者 Dashboard | 即時自資料庫計算：總瀏覽、總名單、轉換率、今日新增名單、7 天新增、高意願名單 |
| 名單與備註管理 | 後台列出名單、點擊查看單筆詳情，支援修改名單狀態與撰寫管理者備註 |
| AI 文案產生器 Mock版 | 輸入課程設定，即時產生精緻的 Mock 文案，用於說明與演練 AI 規格設計 |

完整產品規格見 `[docs/spec.md](docs/spec.md)`。

## 技術棧

- **Framework**：Next.js 16 (App Router)
- **Language**：TypeScript
- **Styling**：Tailwind CSS 4
- **Database**：Supabase (PostgreSQL)
- **Deploy**：Vercel

## 環境需求

- [Node.js](https://nodejs.org/) **18+**（建議 20 或 22 LTS）
- [npm](https://www.npmjs.com/)（隨 Node 安裝）
- [Supabase](https://supabase.com/) 專案（免費方案即可）
- [Vercel](https://vercel.com/) 帳號，用於部署

## 安裝

```bash
# 1. 進入專案目錄
cd customer-lead-collector

# 2. 安裝依賴
npm install

# 3. 複製環境變數範本
cp .env.example .env.local
```

## 環境變數設定

編輯 `.env.local`，填入以下值（**請勿將此檔提交至 Git**）：

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# 新版 Supabase 可能標示為 publishable key:
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Supabase 資料庫建表

請在 Supabase 的 **SQL Editor** 中執行以下 SQL 語法來建立 MVP 所需的資料表：

```sql
-- 1. 建立 leads 資料表
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT NOT NULL,
  role TEXT,
  product_idea TEXT,
  pain_point TEXT,
  interview_intent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT '新名單',
  note TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  CONSTRAINT leads_status_check CHECK (status IN ('新名單', '高意願', '已聯絡', '已訪談', '不適合'))
);

-- 2. 建立 analytics_events 資料表
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  page TEXT NOT NULL,
  session_id TEXT NOT NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT analytics_events_type_check CHECK (event_type IN ('page_view', 'cta_click', 'form_submit_success', 'form_submit_error'))
);

-- 3. 建立 landing_page_copy 資料表
CREATE TABLE IF NOT EXISTS public.landing_page_copy (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name TEXT NOT NULL,
  hero_title TEXT,
  hero_subtitle TEXT,
  pain_points JSONB,
  promise TEXT,
  cta_text TEXT,
  faq JSONB,
  source TEXT NOT NULL DEFAULT 'mock',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ,
  CONSTRAINT landing_page_copy_source_check CHECK (source IN ('mock', 'ai_api'))
);

-- 啟動 Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_page_copy ENABLE ROW LEVEL SECURITY;

-- 課程 Demo 最小政策：允許匿名直接寫入 leads、寫入 analytics_events、讀取 landing_page_copy
CREATE POLICY "Allow anon insert leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon insert events" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon select copy" ON public.landing_page_copy FOR SELECT USING (true);

-- 管理特權（透過 service_role）具有所有權限（Supabase 預設已啟用，無需額外撰寫政策）
```

## AI 開發模式一鍵切換

本專案內建一鍵切換 AI 開發模式腳本，讓 AI 在不同開發階段展現最適配的程式設計哲學：

- **快速原型模式 (Prototype Mode)**：專注於開發速度與功能上線，減少不必要的過度封裝，允許適度的 inline 邏輯與 TypeScript any 放寬。
  ```bash
  npm run ai:prototype
  ```
- **生產與重構維護模式 (Production Mode)**：強制執行最嚴謹的型別定義、Clean Architecture 分層、單元測試、防禦性程式碼與錯誤邊界捕捉。
  ```bash
  npm run ai:production
  ```
- **查看目前模式**：
  ```bash
  npm run ai:mode
  ```

## 學習與實作路徑

1. 詳閱 `[docs/spec.md](docs/spec.md)` 了解產品功能要求、驗收邊界與欄位定義。
2. 詳閱 `[docs/mvp-concepts.md](docs/mvp-concepts.md)` 理解本系統的課程定位。
3. 依序執行 User Stories (US-01 至 US-N) 來逐步實現功能、提交 commit，並在每階段使用對應的 AI 開發模式及驗收 Skills。
