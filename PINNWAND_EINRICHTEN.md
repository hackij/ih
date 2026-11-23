# Digitale Pinnwand einrichten

Supabase-Projekt „Unterricht-Pinnwand“ (Frankfurt), gemeinsame Tabelle `begriffe`
für alle Lernlandkarten. Jede Lernlandkarte hat eine eigene Kennung (`app`, hier „ih“).

## 1. Tabelle anlegen (SQL Editor > New query > Run)

```sql
create table public.begriffe (
  id bigint generated always as identity primary key,
  app text not null check (char_length(app) between 1 and 20),
  sitzung text not null check (char_length(sitzung) between 3 and 12),
  begriff text not null check (char_length(begriff) between 1 and 40),
  created_at timestamptz not null default now()
);
create index begriffe_app_sitzung_idx on public.begriffe (app, sitzung, id);

alter table public.begriffe enable row level security;

grant usage on schema public to anon;
grant select, insert on table public.begriffe to anon;

create policy "Begriffe senden" on public.begriffe
  for insert to anon with check (true);
create policy "Begriffe lesen" on public.begriffe
  for select to anon using (true);
```

Schüler können damit nur senden und lesen, nicht ändern oder löschen.

## 2. Key eintragen
Project Settings > API Keys > „Publishable key“ (beginnt mit `sb_publishable_`) kopieren
und in `config.js` bei `LF_PINNWAND.supabaseKey` eintragen. Niemals den Secret key!

## 3. Weitere Lernlandkarten
Gleiche URL und gleichen Key verwenden, nur `app` ändern (z. B. "uk").

## Aufräumen (optional)
```sql
delete from public.begriffe where created_at < now() - interval '30 days';
```
