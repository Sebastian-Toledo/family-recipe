import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/recipes";
import { requireUser } from "@/lib/session";
import RecipeForm from "@/components/RecipeForm";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = { title: "Editar receta" };

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser(`/recetas/${id}/editar`);
  const recipe = await getRecipe(Number(id), user);
  if (!recipe) notFound();

  if (!recipe.canEdit) {
    return (
      <EmptyState emoji="🔒" title="No podés editar esta receta">
        <p>Sólo quien la cargó ({recipe.createdByName}) o el admin pueden editarla.</p>
        <Link href={`/recetas/${recipe.id}`} className="btn-primary mt-4">
          Volver a la receta
        </Link>
      </EmptyState>
    );
  }

  return (
    <RecipeForm
      initial={{
        id: recipe.id,
        title: recipe.title,
        category: recipe.category,
        author: recipe.author,
        servings: recipe.servings,
        prepTime: recipe.prepTime,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        tips: recipe.tips,
        imageUrl: recipe.imageUrl,
      }}
    />
  );
}
