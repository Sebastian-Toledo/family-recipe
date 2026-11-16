/**
 * Corre antes de `npm run dev` y de `npm run build`:
 *  1. En local, crea .env.local con un secreto aleatorio si no existe.
 *  2. Aplica las migraciones pendientes de la base de datos.
 *  3. En local y con la base vacía, carga un usuario demo y recetas de ejemplo.
 *  4. Con EXAMPLE_RECIPES=true agrega las recetas de ejemplo (también en Vercel); con =remove las borra.
 */
import fs from "node:fs";
import crypto from "node:crypto";

const isCI = Boolean(process.env.VERCEL || process.env.CI);

if (!isCI && !fs.existsSync(".env.local")) {
  fs.writeFileSync(
    ".env.local",
    [
      "# Generado automáticamente por scripts/setup.ts para desarrollo local.",
      `BETTER_AUTH_SECRET=${crypto.randomBytes(32).toString("base64url")}`,
      "BETTER_AUTH_URL=http://localhost:3000",
      "DATABASE_URL=file:data/recetario.db",
      "# Tu cuenta (el registro está cerrado). Ver .env.example.",
      "# ADMIN_EMAIL=",
      "# ADMIN_PASSWORD=",
      "",
    ].join("\n")
  );
  console.log("[setup] Se creó .env.local con la configuración local.");
}
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {}
}

async function main() {
  // Imports después de cargar el .env, porque leen DATABASE_URL al importarse.
  const { db, DATABASE_URL } = await import("../src/db");
  const { migrate } = await import("drizzle-orm/libsql/migrator");

  if (DATABASE_URL.startsWith("file:")) {
    if (process.env.VERCEL) {
      throw new Error(
        "En Vercel falta la base de Turso (DATABASE_URL o TURSO_DATABASE_URL); la base local no se guarda entre deploys. Ver README."
      );
    }
  }

  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("[setup] Base de datos al día.");

  if (!isCI && process.env.SEED !== "false") {
    const { seedIfEmpty } = await import("./seed");
    await seedIfEmpty(db);
  }

  // Recetas de ejemplo a pedido, por ejemplo en producción para probar el sitio.
  const examples = process.env.EXAMPLE_RECIPES?.trim().toLowerCase();
  if (examples === "true" || examples === "remove") {
    const { addSampleRecipes, DEMO_EMAIL } = await import("./seed");
    if (examples === "remove") {
      const { eq } = await import("drizzle-orm");
      const { user } = await import("../src/db/schema");
      await db.delete(user).where(eq(user.email, DEMO_EMAIL));
      console.log("[setup] Se borraron las recetas de ejemplo.");
    } else {
      const added = await addSampleRecipes(db, { withPassword: DATABASE_URL.startsWith("file:") });
      console.log(`[setup] Recetas de ejemplo: se agregaron ${added}.`);
    }
  }

  // La cuenta de quien administra (ADMIN_EMAIL / ADMIN_PASSWORD), también en Vercel.
  const { ensureAdmin } = await import("./admin");
  await ensureAdmin(db);
}

main().catch((err) => {
  console.error("[setup] Error:", err);
  process.exit(1);
});
