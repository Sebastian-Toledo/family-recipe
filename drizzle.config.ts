import { defineConfig } from "drizzle-kit";

try {
  process.loadEnvFile(".env.local");
} catch {}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      process.env.DATABASE_TURSO_DATABASE_URL ??
      process.env.TURSO_DATABASE_URL ??
      "file:data/recetario.db",
    authToken:
      process.env.DATABASE_AUTH_TOKEN ?? process.env.DATABASE_TURSO_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN,
  },
});
