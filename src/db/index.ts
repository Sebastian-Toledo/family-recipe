import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// En local es un archivo SQLite; en producción, una base de Turso (misma sintaxis, en la nube).
export const DATABASE_URL = process.env.DATABASE_URL ?? "file:data/recetario.db";

if (DATABASE_URL.startsWith("file:")) {
  fs.mkdirSync(path.dirname(DATABASE_URL.slice("file:".length)), { recursive: true });
}

const client = createClient({
  url: DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });
export { schema };
