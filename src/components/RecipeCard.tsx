import Link from "next/link";
import { Clock, Heart, User } from "lucide-react";
import type { RecipeSummary } from "@/lib/recipes";
import { TONE_CLASSES, categoryTone } from "@/lib/categories";
import RecipeImage from "./RecipeImage";

export function RecipeCard({ recipe }: { recipe: RecipeSummary }) {
  return (
    <article className="card group relative overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <RecipeImage src={recipe.imageUrl} alt="" category={recipe.category} className="h-48" />
        {recipe.isFavorite && (
          <span className="absolute top-3 right-3 rounded-full bg-white p-1.5 shadow" title="Favorita">
            <Heart className="size-4 fill-brand-500 text-brand-500" aria-label="Favorita" />
          </span>
        )}
      </div>
      <div className="p-4">
        <p className={`text-xs font-bold tracking-wider uppercase ${TONE_CLASSES[categoryTone(recipe.category)].label}`}>
          {recipe.category}
        </p>
        <h3 className="mt-1 line-clamp-2 text-lg font-bold">
          <Link href={`/recetas/${recipe.id}`} className="after:absolute after:inset-0">
            {recipe.title}
          </Link>
        </h3>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted">
          {recipe.author && (
            <span className="flex min-w-0 items-center gap-1">
              <User className="size-4 shrink-0" /> <span className="truncate">{recipe.author}</span>
            </span>
          )}
          {recipe.prepTime && (
            <span className="flex shrink-0 items-center gap-1">
              <Clock className="size-4" /> {recipe.prepTime}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function RecipeGrid({ recipes }: { recipes: RecipeSummary[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export function RecipeGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true" aria-label="Cargando recetas">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="card overflow-hidden">
          <div className="h-48 animate-pulse bg-subtle" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-1/3 animate-pulse rounded bg-subtle" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-subtle" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-subtle" />
          </div>
        </div>
      ))}
    </div>
  );
}
