import type { Metadata } from "next";
import Link from "next/link";
import { listRecipes } from "@/lib/recipes";
import { requireUser } from "@/lib/session";
import { RecipeGrid } from "@/components/RecipeCard";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Mis favoritas" };

export default async function FavoritesPage() {
  const user = await requireUser("/favoritas");
  const recipes = await listRecipes({ favoritesOf: user.id }, user.id);

  return (
    <>
      <h1 className="text-4xl font-bold">Mis favoritas</h1>
      <p className="mt-2 mb-8 text-muted">Las recetas que marcaste con el corazón.</p>
      {recipes.length ? (
        <RecipeGrid recipes={recipes} loggedIn />
      ) : (
        <EmptyState emoji="🧡" title="Todavía no tenés favoritas">
          <p>Abrí una receta y tocá “Guardar en favoritas”.</p>
          <Link href="/" className="btn-primary mt-4">
            Ver recetas
          </Link>
        </EmptyState>
      )}
    </>
  );
}
