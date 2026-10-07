// Migration one-shot : copie les tables de contenu depuis l'API Supabase
// (NEXT_PUBLIC_SUPABASE_URL) vers la base Postgres (DATABASE_URL).
// Usage : node --env-file=.env scripts/migrate-supabase-to-postgres.mjs
import { readFile } from "node:fs/promises";
import postgres from "postgres";

const TABLES = ["articles", "customer_cases", "n8n_workflows"];
const JSON_COLUMNS = ["keywords", "tags", "workflow_json", "nodes"];
const PAGE_SIZE = 1000;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || !process.env.DATABASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY et DATABASE_URL sont requis",
  );
}

const sql = postgres(process.env.DATABASE_URL, {
  max: 1,
  onnotice: () => {},
  connection: { TimeZone: "UTC" },
  // Copie les timestamps tels quels (sans passer par Date, qui appliquerait le fuseau local)
  types: {
    timestamp: { to: 1114, from: [1114], serialize: (x) => x, parse: (x) => x },
  },
});

async function fetchAllRows(table) {
  const rows = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/${table}?select=*&order=id&offset=${offset}&limit=${PAGE_SIZE}`,
      { headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` } },
    );
    if (!res.ok) {
      throw new Error(`${table}: ${res.status} ${await res.text()}`);
    }
    const page = await res.json();
    rows.push(...page);
    if (page.length < PAGE_SIZE) return rows;
  }
}

try {
  const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
  await sql.unsafe(schema);

  for (const table of TABLES) {
    const rows = await fetchAllRows(table);

    for (const row of rows) {
      for (const column of JSON_COLUMNS) {
        if (column in row && row[column] !== null) {
          // workflow_json est parfois stocké comme chaîne JSON : on garde la valeur telle quelle
          row[column] = sql.json(row[column]);
        }
      }
    }

    const columns = Object.keys(rows[0] ?? {}).filter((column) => column !== "id");
    // Upsert : le script peut être relancé sans dupliquer les lignes
    const upserted = rows.length
      ? await sql`
          insert into ${sql(table)} ${sql(rows)}
          on conflict (id) do update set ${sql.unsafe(
            columns.map((column) => `"${column}" = excluded."${column}"`).join(", "),
          )}
          returning id`
      : [];
    const [{ count }] = await sql`select count(*)::int as count from ${sql(table)}`;

    console.log(
      `${table}: ${rows.length} lignes source, ${upserted.length} upsertées, ${count} en base`,
    );
  }
} finally {
  await sql.end();
}
