import crypto from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import type { db as Db } from "../src/db";
import { account, recipes, user } from "../src/db/schema";
import { SAMPLE_RECIPES } from "./sample-recipes";

export const DEMO_EMAIL = "demo@recetario.local";
export const DEMO_PASSWORD = "demo1234";

/**
 * `withPassword`: en local el demo entra con DEMO_PASSWORD; en producción se crea sin contraseña
 * (nadie puede entrar con esa cuenta, sólo es la dueña de las recetas de ejemplo).
 */
async function ensureDemoUser(db: typeof Db, withPassword: boolean): Promise<string> {
  const [existing] = await db.select({ id: user.id }).from(user).where(eq(user.email, DEMO_EMAIL));
  if (existing) return existing.id;

  const userId = crypto.randomUUID();
  await db.insert(user).values({ id: userId, name: "Usuario demo", email: DEMO_EMAIL, emailVerified: true });
  if (!withPassword) return userId;
  // Así guarda Better Auth las cuentas con email y contraseña.
  await db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: await hashPassword(DEMO_PASSWORD),
  });
  return userId;
}

/** Agrega las recetas de ejemplo que todavía no estén (por título), a nombre del usuario demo. */
export async function addSampleRecipes(db: typeof Db, { withPassword = true } = {}) {
  const userId = await ensureDemoUser(db, withPassword);
  const existing = new Set((await db.select({ title: recipes.title }).from(recipes)).map((r) => r.title));
  const missing = SAMPLE_RECIPES.filter((r) => !existing.has(r.title));
  if (missing.length) await db.insert(recipes).values(missing.map((r) => ({ ...r, createdById: userId })));
  return missing.length;
}

/** Primera vez: usuario demo + recetas de ejemplo. */
export async function seedIfEmpty(db: typeof Db) {
  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(user);
  if (count > 0) return;
  const added = await addSampleRecipes(db);
  console.log(`[setup] Base nueva: usuario demo (${DEMO_EMAIL} / ${DEMO_PASSWORD}) y ${added} recetas de ejemplo.`);
}
