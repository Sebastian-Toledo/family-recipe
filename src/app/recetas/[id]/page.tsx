import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, User, Users } from "lucide-react";
import { getRecipe, listRecipes } from "@/lib/recipes";
import { getUser } from "@/lib/session";
import RecipeImage from "@/components/RecipeImage";
import RecipeActions from "@/components/RecipeActions";
import IngredientChecklist from "@/components/IngredientChecklist";
import { RecipeGrid } from "@/components/RecipeCard";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ guardada?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = await getRecipe(Number((await params).id));
  return recipe ? { title: recipe.title, description: recipe.description || undefined } : {};
}

const dateFormat = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric" });

export default async function RecipePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { guardada } = await searchParams;
  const user = await getUser();
  const recipe = await getRecipe(Number(id), user?.id);
  if (!recipe) notFound();

  const related = (await listRecipes({ category: recipe.category }, user?.id))
    .filter((r) => r.id !== recipe.id)
    .slice(0, 4);
  const categoryHref = `/?categoria=${encodeURIComponent(recipe.category)}`;

  return (
    <article>
      {guardada && (
        <p role="status" className="mb-6 rounded-lg bg-green-50 px-4 py-3 font-semibold text-green-800 print:hidden dark:bg-green-950 dark:text-green-200">
          ✓ Receta guardada
        </p>
      )}

      <nav aria-label="Ruta" className="mb-4 flex items-center gap-1 text-sm text-muted print:hidden">
        <Link href="/" className="hover:text-accent hover:underline">
          Recetas
        </Link>
        <ChevronRight className="size-4" />
        <Link href={categoryHref} className="hover:text-accent hover:underline">
          {recipe.category}
        </Link>
        <ChevronRight className="size-4" />
        <span className="truncate">{recipe.title}</span>
      </nav>

      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div>
          <p className="eyebrow text-sm">{recipe.category}</p>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">{recipe.title}</h1>
          {recipe.description && <p className="mt-4 text-lg whitespace-pre-line text-muted">{recipe.description}</p>}

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-muted">
            {recipe.author && (
              <span className="flex items-center gap-2">
                <User className="size-4" /> Receta de {recipe.author}
              </span>
            )}
            {recipe.prepTime && (
              <span className="flex items-center gap-2">
                <Clock className="size-4" /> {recipe.prepTime}
              </span>
            )}
            {recipe.servings && (
              <span className="flex items-center gap-2">
                <Users className="size-4" /> {recipe.servings}
              </span>
            )}
          </div>

          <RecipeActions
            recipeId={recipe.id}
            title={recipe.title}
            isFavorite={recipe.isFavorite}
            canEdit={recipe.canEdit}
            loggedIn={Boolean(user)}
          />
        </div>

        <RecipeImage
          src={recipe.imageUrl}
          alt={recipe.title}
          category={recipe.category}
          className="h-64 rounded-2xl shadow-md md:h-96"
          emojiClassName="text-8xl"
        />
      </div>

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(260px,1fr)_2fr] md:gap-12">
        <section className="card self-start p-6 md:sticky md:top-24">
          <h2 className="text-2xl font-bold">Ingredientes</h2>
          <p className="mt-1 mb-4 text-sm text-muted print:hidden">Tocá cada uno para ir tachando lo que ya tenés.</p>
          <IngredientChecklist ingredients={recipe.ingredients} />
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold">Preparación</h2>
          <ol className="space-y-6">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-500 font-heading font-bold text-white">
                  {i + 1}
                </span>
                <p className="pt-1 text-lg whitespace-pre-line">{step}</p>
              </li>
            ))}
          </ol>

          {recipe.tips && (
            <aside className="mt-10 flex gap-3 rounded-lg border-l-4 border-brand-400 bg-brand-50 p-4 dark:bg-subtle">
              <span className="text-2xl" aria-hidden>
                💡
              </span>
              <div>
                <p className="font-bold">El secreto</p>
                <p className="whitespace-pre-line">{recipe.tips}</p>
              </div>
            </aside>
          )}

          <p className="mt-10 text-sm text-muted">
            Cargada por {recipe.createdByName} el {dateFormat.format(recipe.createdAt)}
          </p>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-16 print:hidden">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-2xl font-bold">Más recetas de {recipe.category.toLowerCase()}</h2>
            <Link href={categoryHref} className="font-semibold text-accent hover:underline">
              Ver todas
            </Link>
          </div>
          <RecipeGrid recipes={related} />
        </section>
      )}
    </article>
  );
}
