import crypto from "node:crypto";
import { sql } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";
import type { db as Db } from "../src/db";
import { account, recipes, user } from "../src/db/schema";

export const DEMO_EMAIL = "demo@recetario.local";
export const DEMO_PASSWORD = "demo1234";

// Recetas genéricas para que la app no arranque vacía. Editalas o borralas cuando cargues las de mamá.
const SAMPLE_RECIPES = [
  {
    title: "Flan casero",
    description: "El postre de los domingos. Receta de ejemplo: reemplazala por la versión de mamá.",
    category: "Postres",
    author: "Mamá (ejemplo)",
    servings: "6 porciones",
    prepTime: "1 h 15 min",
    ingredients: [
      "Para el caramelo:",
      "150 g de azúcar",
      "Para el flan:",
      "1 litro de leche",
      "6 huevos",
      "200 g de azúcar",
      "1 cucharadita de esencia de vainilla",
    ],
    steps: [
      "Derretir el azúcar en la flanera a fuego medio hasta lograr un caramelo dorado y cubrir las paredes.",
      "Calentar la leche con la vainilla sin que llegue a hervir.",
      "Batir apenas los huevos con el azúcar, sin hacer espuma, y sumar la leche tibia de a poco.",
      "Colar la mezcla dentro de la flanera.",
      "Cocinar a baño María en horno moderado (170 °C) unos 50 minutos, hasta que al pinchar salga limpio.",
      "Enfriar y llevar a la heladera al menos 4 horas antes de desmoldar.",
    ],
    tips: "Para que no queden agujeritos, el agua del baño María no tiene que hervir.",
  },
  {
    title: "Milanesas de carne",
    description: "Un clásico que nunca falla. Receta de ejemplo.",
    category: "Carnes",
    author: "Mamá (ejemplo)",
    servings: "4 porciones",
    prepTime: "40 min",
    ingredients: [
      "800 g de nalga cortada fina",
      "3 huevos",
      "2 dientes de ajo picados",
      "Perejil picado a gusto",
      "Sal y pimienta",
      "Pan rallado, cantidad necesaria",
      "Aceite para freír",
    ],
    steps: [
      "Batir los huevos con el ajo, el perejil, sal y pimienta.",
      "Pasar cada bife por el huevo y luego por pan rallado, presionando bien.",
      "Repetir el paso anterior si se quieren más crocantes.",
      "Freír en aceite caliente hasta dorar de ambos lados y escurrir en papel.",
    ],
    tips: "Se pueden hacer al horno: rociar con un poco de aceite y cocinar a 200 °C dando vuelta a mitad de cocción.",
  },
  {
    title: "Empanadas de carne cortada a cuchillo",
    description: "Para las reuniones familiares. Receta de ejemplo.",
    category: "Masas saladas",
    author: "Mamá (ejemplo)",
    servings: "24 empanadas",
    prepTime: "2 h",
    ingredients: [
      "Para el relleno:",
      "1 kg de carne (matambre o roast beef) cortada a cuchillo",
      "3 cebollas",
      "1 morrón rojo",
      "4 cebollas de verdeo",
      "2 huevos duros",
      "Aceitunas verdes",
      "Comino, pimentón, ají molido, sal",
      "Para armar:",
      "24 tapas de empanadas",
    ],
    steps: [
      "Rehogar la cebolla y el morrón picados hasta que estén transparentes.",
      "Agregar la carne y cocinar hasta que cambie de color. Condimentar.",
      "Sumar el verdeo picado, apagar el fuego y dejar enfriar el relleno por completo.",
      "Rellenar las tapas, agregar huevo duro y aceituna, y hacer el repulgue.",
      "Cocinar en horno fuerte (220 °C) unos 15 minutos.",
    ],
    tips: "El relleno frío (incluso de un día para el otro) hace que las empanadas queden más jugosas.",
  },
];

export async function seedIfEmpty(db: typeof Db) {
  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(user);
  if (count > 0) return;

  const userId = crypto.randomUUID();
  await db.insert(user).values({ id: userId, name: "Usuario demo", email: DEMO_EMAIL, emailVerified: true });
  // Así guarda Better Auth las cuentas con email y contraseña.
  await db.insert(account).values({
    id: crypto.randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId,
    password: await hashPassword(DEMO_PASSWORD),
  });
  await db.insert(recipes).values(SAMPLE_RECIPES.map((r) => ({ ...r, createdById: userId })));

  console.log(
    `[setup] Base nueva: usuario demo (${DEMO_EMAIL} / ${DEMO_PASSWORD}) y ${SAMPLE_RECIPES.length} recetas de ejemplo.`
  );
}
