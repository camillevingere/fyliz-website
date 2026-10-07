import postgres from "postgres";
import { env } from "./env";

export const CONTENT_TABLES = [
  "articles",
  "customer_cases",
  "n8n_workflows",
] as const;

export type ContentTable = (typeof CONTENT_TABLES)[number];

export function assertContentTable(table: string): ContentTable {
  if (!CONTENT_TABLES.includes(table as ContentTable)) {
    throw new Error(`Unknown content table: ${table}`);
  }
  return table as ContentTable;
}

const globalForDb = globalThis as unknown as { sql?: postgres.Sql };

// Réutilise la connexion entre les rechargements à chaud en dev
export const sql =
  globalForDb.sql ??
  postgres(env.DATABASE_URL, {
    max: 10,
    connection: { TimeZone: "UTC" },
    // Les timestamps restent des chaînes ISO (comme l'ancienne API Supabase)
    types: {
      timestamp: {
        to: 1114,
        from: [1114],
        serialize: (x: string | Date) =>
          x instanceof Date ? x.toISOString() : x,
        parse: (x: string) => x.replace(" ", "T"),
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.sql = sql;
}
