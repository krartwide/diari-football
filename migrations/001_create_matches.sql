create table if not exists saved_records (
  id text primary key,
  sync_code text not null,
  record_type text not null check (record_type in ('match', 'series')),
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists saved_records_sync_idx on saved_records (sync_code, created_at desc);
