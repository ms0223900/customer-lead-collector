import type { ReactNode } from "react";

type AdminShellProps = {
  children: ReactNode;
};

const NAV_ITEMS: Array<{
  id: string;
  label: string;
  active: boolean;
  placeholder?: boolean;
}> = [
  { id: "leads", label: "名單管理", active: true },
  { id: "dashboard", label: "Dashboard", active: false, placeholder: true },
  { id: "ai", label: "AI 文案", active: false, placeholder: true },
];

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-14 items-center justify-between bg-[#1E293B] px-4 sm:px-6">
        <span className="text-sm font-semibold text-white">
          Lead Collector · 管理後台
        </span>
        <span className="text-xs text-[#94A3B8]">/admin</span>
      </header>

      <nav className="flex gap-1 border-b border-border bg-card px-4 sm:px-6">
        {NAV_ITEMS.map((item) => (
          <span
            key={item.id}
            className={[
              "px-4 py-3 text-sm",
              item.active
                ? "font-semibold text-secondary"
                : item.placeholder
                  ? "text-on-background-subtle"
                  : "text-on-background-muted",
            ].join(" ")}
            aria-current={item.active ? "page" : undefined}
          >
            {item.label}
            {item.placeholder ? "（即將推出）" : ""}
          </span>
        ))}
      </nav>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
