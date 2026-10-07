"use server";

import type postgres from "postgres";
import { assertContentTable, sql } from "./db";

const EDITABLE_COLUMNS = [
  "title",
  "description",
  "content",
  "image",
  "keywords",
  "tags",
  "status",
  "published_at",
  "author",
  "workflow_json",
] as const;

const JSON_COLUMNS = ["keywords", "tags", "workflow_json"];

export type ArticleUpdates = Partial<
  Record<(typeof EDITABLE_COLUMNS)[number], unknown>
>;

export async function updateArticleAction({
  type,
  articleId,
  updates,
}: {
  type: string;
  articleId: string;
  updates: ArticleUpdates;
}) {
  // L'éditeur n'est accessible que lorsque ENABLE_MDX_EDITOR est activé
  if (process.env.ENABLE_MDX_EDITOR !== "1") {
    throw new Error("Editor is disabled");
  }

  const table = assertContentTable(type);
  const values: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  for (const [column, value] of Object.entries(updates)) {
    if (!EDITABLE_COLUMNS.includes(column as (typeof EDITABLE_COLUMNS)[number])) {
      throw new Error(`Column not editable: ${column}`);
    }
    values[column] =
      JSON_COLUMNS.includes(column) && value !== null
        ? sql.json(value as postgres.JSONValue)
        : value;
  }

  await sql`
    update ${sql(table)} set ${sql(values)}
    where id = ${articleId}
  `;
}
