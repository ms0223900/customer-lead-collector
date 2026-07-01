-- PROTOTYPE: 對照 docs/spec.md §7。請在 Supabase SQL Editor 手動執行。
-- Service role 寫入／讀取；正式上線前應補 RLS 與 migration 流程。

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  role text,
  product_idea text,
  pain_point text,
  interview_intent boolean not null default false,
  status text not null default '新名單',
  note text,
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);
