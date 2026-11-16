import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// En local es un archivo SQLite; en producción, una base de Turso (misma sintaxis, en la nube).
// Acepta también los nombres que carga la integración de Turso en Vercel
// (con el prefijo "DATABASE": DATABASE_TURSO_DATABASE_URL y DATABASE_TURSO_AUTH_TOKEN).
const env = process.env;
export const DATABASE_URL =
  env.DATABASE_URL ?? env.DATABASE_TURSO_DATABASE_URL ?? env.TURSO_DATABASE_URL ?? "file:data/recetario.db";
const DATABASE_AUTH_TOKEN = env.DATABASE_AUTH_TOKEN ?? env.DATABASE_TURSO_AUTH_TOKEN ?? env.TURSO_AUTH_TOKEN;

if (DATABASE_URL.startsWith("file:")) {
  fs.mkdirSync(path.dirname(DATABASE_URL.slice("file:".length)), { recursive: true });
}

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export { schema };
