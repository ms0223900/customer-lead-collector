import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-md p-8 bg-card rounded-2xl border border-border shadow-sm">
        <span className="material-symbols-outlined text-primary text-5xl mb-4">
          construction
        </span>
        <h1 className="text-2xl font-bold text-on-background mb-2">
          客戶名單收集系統
        </h1>
        <p className="text-on-background-muted mb-6">
          《聊著聊著，AI 就做完了：不懂程式也能用 AI 做出可上線產品》課程 MVP 專案。
          系統目前正處於 Scaffold 初始狀態，已就緒，等待開始開發。
        </p>
        <div className="text-xs text-on-background-muted bg-secondary p-3 rounded-lg border border-border text-left font-mono">
          <div>Repository: customer-lead-collector</div>
          <div>Status: Scaffold Ready</div>
          <div>Next Step: Read docs/spec.md to start US-01</div>
        </div>
      </div>
    </div>
  );
}
