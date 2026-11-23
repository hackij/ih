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

## Nachtrag: Senden sperren und freigeben

```sql
create table public.sitzungen (
  app text not null,
  sitzung text not null,
  token text not null,
  offen boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (app, sitzung)
);
alter table public.sitzungen enable row level security;
grant select (app, sitzung, offen) on public.sitzungen to anon;
create policy "Status lesen" on public.sitzungen for select to anon using (true);

create or replace function public.pinnwand_setzen(p_app text, p_sitzung text, p_token text, p_offen boolean)
returns boolean language plpgsql security definer set search_path = public as $$
declare t text;
begin
  select token into t from public.sitzungen where app = p_app and sitzung = p_sitzung;
  if t is null then
    insert into public.sitzungen (app, sitzung, token, offen) values (p_app, p_sitzung, p_token, p_offen);
    return true;
  end if;
  if t <> p_token then return false; end if;
  update public.sitzungen set offen = p_offen where app = p_app and sitzung = p_sitzung;
  return true;
end $$;
revoke all on function public.pinnwand_setzen(text, text, text, boolean) from public;
grant execute on function public.pinnwand_setzen(text, text, text, boolean) to anon;

drop policy "Begriffe senden" on public.begriffe;
create policy "Begriffe senden" on public.begriffe for insert to anon
  with check (exists (select 1 from public.sitzungen s
                      where s.app = begriffe.app and s.sitzung = begriffe.sitzung and s.offen));
```
