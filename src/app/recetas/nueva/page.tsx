import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import RecipeForm from "@/components/RecipeForm";

export const metadata: Metadata = { title: "Nueva receta" };

export default async function NewRecipePage() {
  await requireUser("/recetas/nueva");
  return <RecipeForm />;
}
