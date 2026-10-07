-- Schéma des tables de contenu (reprend la structure de l'ancienne base Supabase)

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text not null,
  image text,
  keywords jsonb,
  tags jsonb,
  status text default 'draft',
  published_at timestamp,
  author text,
  author_image text,
  author_username text,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  slug text
);

create table if not exists customer_cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text not null,
  image text,
  keywords jsonb,
  tags jsonb,
  status text default 'draft',
  published_at timestamp,
  author text,
  author_image text,
  author_username text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists n8n_workflows (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  content text not null,
  image text,
  keywords jsonb,
  tags jsonb,
  status text default 'draft',
  published_at timestamp,
  author text default 'Camille Roy',
  author_image text default '/images/camilleroy.png',
  author_username text default 'camilleroy.dev',
  created_at timestamp default now(),
  updated_at timestamp default now(),
  workflow_json jsonb,
  slug text,
  nodes jsonb
);

comment on column n8n_workflows.workflow_json is 'The json workflow the user wants to download';

create index if not exists articles_status_published_at_idx on articles (status, published_at);
create index if not exists articles_slug_idx on articles (slug);
create index if not exists customer_cases_status_published_at_idx on customer_cases (status, published_at);
create index if not exists n8n_workflows_status_published_at_idx on n8n_workflows (status, published_at);
create index if not exists n8n_workflows_slug_idx on n8n_workflows (slug);
