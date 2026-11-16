import crypto from "node:crypto";
import { and, eq } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import type { db as Db } from "../src/db";
import { account, user } from "../src/db/schema";

/**
 * Crea (o actualiza) la cuenta de quien administra el recetario a partir de las variables
 * de entorno, así el usuario y la contraseña nunca quedan en el código ni en GitHub:
 *
 *   ADMIN_EMAIL     email de la cuenta (obligatorio para crearla)
 *   ADMIN_PASSWORD  contraseña (opcional: sin ella, se entra sólo con Google)
 *   ADMIN_NAME      nombre que se muestra (opcional)
 *
 * Se ejecuta en cada `npm run dev` y en cada deploy: si cambiás la contraseña en las
 * variables, se actualiza en el próximo deploy.
 */
export async function ensureAdmin(db: typeof Db) {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) return;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || email.split("@")[0];

  if (password !== undefined && password.length < 8) {
    throw new Error("ADMIN_PASSWORD tiene que tener al menos 8 caracteres.");
  }

  let [admin] = await db.select({ id: user.id }).from(user).where(eq(user.email, email));
  if (!admin) {
    admin = { id: crypto.randomUUID() };
    await db.insert(user).values({ id: admin.id, name, email, emailVerified: true });
    console.log(`[setup] Se creó la cuenta de ${email}.`);
  } else {
    // Email verificado: necesario para que Google se vincule a esta cuenta.
    await db.update(user).set({ name, emailVerified: true }).where(eq(user.id, admin.id));
  }

  if (!password) return;
  const hash = await hashPassword(password);
  const [credential] = await db
    .select({ id: account.id })
    .from(account)
    .where(and(eq(account.userId, admin.id), eq(account.providerId, "credential")));
  if (credential) {
    await db.update(account).set({ password: hash, updatedAt: new Date() }).where(eq(account.id, credential.id));
  } else {
    await db.insert(account).values({
      id: crypto.randomUUID(),
      accountId: admin.id,
      providerId: "credential",
      userId: admin.id,
      password: hash,
    });
  }
}
