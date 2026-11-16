/**
 * `npm run db:examples`         → agrega las recetas de ejemplo que falten (a nombre del usuario demo).
 * `npm run db:examples -- --remove` → borra el usuario demo y todas sus recetas.
 */
import { eq } from "drizzle-orm";

for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {}
}

async function main() {
  const { db } = await import("../src/db");
  const { user } = await import("../src/db/schema");
  const { addSampleRecipes, DEMO_EMAIL } = await import("./seed");

  if (process.argv.includes("--remove")) {
    await db.delete(user).where(eq(user.email, DEMO_EMAIL));
    console.log("Se borró el usuario demo y todas sus recetas de ejemplo.");
    return;
  }
  const added = await addSampleRecipes(db);
  console.log(added ? `Se agregaron ${added} recetas de ejemplo.` : "Ya estaban todas las recetas de ejemplo.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
