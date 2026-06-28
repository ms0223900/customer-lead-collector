### US-D01：設計元件與 Design Tokens

**作為** 負責 MVP 圖面設計的設計師（或開發者）  
**我想要** 先定義共用的色彩、字級與 UI 元件樣式  
**以便** 後續 Landing Page 與後台畫面風格一致，實作 Sprint 1 時可直接對照

**輸入格式**：
- [`docs/spec.md`](../../spec.md) §6.1–§6.3、§8（前台／後台 UI 範圍）
- 課程主題：《聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品》
- 技術棧參考：Tailwind CSS 4（色票與 spacing 宜可映射至 Tailwind）

**輸出格式**：
- 設計稿中的 **Foundation / Components** 頁（Figma 或等效工具）
- 至少包含：
  - 色彩：主色（CTA）、中性背景、成功／錯誤／警告（Mock 警語用）
  - 字級層級：標題、正文、表單 label、錯誤提示
  - Primary Button（「加入等候名單」）
  - 表單元件：文字、Email、下拉、Checkbox + 欄位下方錯誤樣式
  - Status Badge：新名單、高意願、已聯絡、已訪談、不適合
  - 簡易表格列樣式（供後台名單列表使用）
  - Breakpoint 註記：`≥1024px` 桌機、`375–767px` 手機

**驗收條件**：
- [ ] 有明確主色與 CTA 按鈕樣式（含 hover／disabled）
- [ ] 表單欄位與錯誤提示樣式已定義，錯誤文案區塊可容納繁中
- [ ] 五種名單狀態 Badge 樣式可區分
- [ ] 表格列樣式可供後台列表複用
- [ ] 元件頁可供 US-D02～US-D06 引用，無需每張稿重畫按鈕

**依賴關係**：
- [`docs/spec.md`](../../spec.md) 已撰寫完成

**優先級**：P0  
**相關功能**：spec §8 UI 範圍；Sprint 1 US-01、US-04；Sprint 2 US-07 前置

**備註**：
- 本 US 產出為**圖面設計稿**，非程式碼。
- 若僅實作 Sprint 1 + Sprint 2，本 US 為**最少必做**設計前置之一。
