import "server-only";
import { and, desc, eq, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { favorites, recipes, user } from "@/db/schema";

export interface RecipeFilters {
  q?: string;
  category?: string;
  favoritesOf?: string;
  createdBy?: string;
}

function isFavoriteFor(viewerId: string | undefined) {
  return viewerId
    ? sql<number>`exists(select 1 from ${favorites} where ${favorites.recipeId} = ${recipes.id} and ${favorites.userId} = ${viewerId})`
    : sql<number>`0`;
}

const summaryColumns = (viewerId?: string) => ({
  id: recipes.id,
  title: recipes.title,
  category: recipes.category,
  author: recipes.author,
  prepTime: recipes.prepTime,
  imageUrl: recipes.imageUrl,
  isFavorite: isFavoriteFor(viewerId),
});

export type RecipeSummary = Awaited<ReturnType<typeof listRecipes>>[number];

export async function listRecipes(filters: RecipeFilters, viewerId?: string) {
  const where: SQL[] = [];

  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    where.push(
      or(
        like(recipes.title, pattern),
        like(recipes.description, pattern),
        like(recipes.ingredients, pattern),
        like(recipes.author, pattern)
      )!
    );
  }
  if (filters.category) where.push(eq(recipes.category, filters.category));
  if (filters.createdBy) where.push(eq(recipes.createdById, filters.createdBy));
  if (filters.favoritesOf) {
    where.push(
      sql`exists(select 1 from ${favorites} where ${favorites.recipeId} = ${recipes.id} and ${favorites.userId} = ${filters.favoritesOf})`
    );
  }

  const rows = await db
    .select(summaryColumns(viewerId))
    .from(recipes)
    .where(where.length ? and(...where) : undefined)
    .orderBy(desc(recipes.createdAt), desc(recipes.id));

  return rows.map((r) => ({ ...r, isFavorite: Boolean(r.isFavorite) }));
}

export async function getRecipe(id: number, viewerId?: string) {
  if (!Number.isInteger(id)) return null;
  const [row] = await db
    .select({
      recipe: recipes,
      createdByName: user.name,
      isFavorite: isFavoriteFor(viewerId),
    })
    .from(recipes)
    .innerJoin(user, eq(user.id, recipes.createdById))
    .where(eq(recipes.id, id));

  if (!row) return null;
  return {
    ...row.recipe,
    createdByName: row.createdByName,
    isFavorite: Boolean(row.isFavorite),
    canEdit: viewerId === row.recipe.createdById,
  };
}

export type RecipeDetail = NonNullable<Awaited<ReturnType<typeof getRecipe>>>;

/** Categorías con al menos una receta, y cuántas tiene cada una. */
export async function categoryCounts() {
  return db
    .select({ category: recipes.category, count: sql<number>`count(*)` })
    .from(recipes)
    .groupBy(recipes.category)
    .orderBy(recipes.category);
}
