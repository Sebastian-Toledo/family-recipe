import type { Metadata } from "next";
import Link from "next/link";
import { listRecipes } from "@/lib/recipes";
import { requireUser } from "@/lib/session";
import { RecipeGrid } from "@/components/RecipeCard";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Mis recetas" };

export default async function MyRecipesPage() {
  const user = await requireUser("/mis-recetas");
  const recipes = await listRecipes({ createdBy: user.id }, user.id);

  return (
    <>
      <h1 className="text-4xl font-bold">Mis recetas</h1>
      <p className="mt-2 mb-8 text-muted">Las recetas que cargaste vos. Entrá a cualquiera para editarla.</p>
      {recipes.length ? (
        <RecipeGrid recipes={recipes} />
      ) : (
        <EmptyState emoji="📝" title="Todavía no cargaste recetas">
          <p>Empezá por esa receta de mamá que siempre pedís.</p>
          <Link href="/recetas/nueva" className="btn-primary mt-4">
            Cargar una receta
          </Link>
        </EmptyState>
      )}
    </>
  );
}
