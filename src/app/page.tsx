import Link from "next/link";
import { Suspense } from "react";
import { categoryCounts, listRecipes } from "@/lib/recipes";
import { categoryEmoji } from "@/lib/categories";
import { getUser } from "@/lib/session";
import { RecipeGrid, RecipeGridSkeleton } from "@/components/RecipeCard";
import SearchBox from "@/components/SearchBox";
import EmptyState from "@/components/EmptyState";
import Logo from "@/components/Logo";
import Namaste from "@/components/Namaste";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

type SearchParams = Promise<{ q?: string; categoria?: string }>;

function chipHref(category: string | null, q: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("categoria", category);
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { q = "", categoria = "" } = await searchParams;
  const categories = await categoryCounts();
  const total = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <>
      <section className="mb-8 rounded-2xl bg-gradient-to-br from-brand-200 to-alt-300/70 px-6 py-10 text-center md:py-14 dark:from-brand-500/25 dark:to-alt-500/20">
        <Logo className="mx-auto mb-4 size-16" />
        <h1 className="text-4xl font-bold md:text-5xl">{SITE_NAME}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">{SITE_TAGLINE}</p>
        <Suspense>
          <SearchBox />
        </Suspense>
      </section>

      {categories.length > 0 && (
        <nav aria-label="Categorías" className="mb-8 flex flex-wrap gap-2">
          {[{ category: "", count: total }, ...categories].map((c) => {
            const active = c.category === categoria;
            return (
              <Link
                key={c.category || "todas"}
                href={chipHref(c.category || null, q)}
                aria-current={active ? "page" : undefined}
                scroll={false}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-brand-500/60 text-accent hover:bg-brand-50 dark:hover:bg-subtle"
                }`}
              >
                {c.category ? `${categoryEmoji(c.category)} ${c.category}` : "Todas"} ({c.count})
              </Link>
            );
          })}
        </nav>
      )}

      {/* La key hace que el esqueleto de carga aparezca en cada búsqueda nueva. */}
      <Suspense key={`${q}|${categoria}`} fallback={<RecipeGridSkeleton />}>
        <Results q={q} category={categoria} />
      </Suspense>

      <Namaste />
    </>
  );
}

async function Results({ q, category }: { q: string; category: string }) {
  const user = await getUser();
  const recipes = await listRecipes({ q, category }, user?.id);

  if (recipes.length > 0) return <RecipeGrid recipes={recipes} />;

  if (q || category) {
    return (
      <EmptyState emoji="🔍" title="No encontramos recetas">
        Probá con otra palabra o elegí otra categoría.
      </EmptyState>
    );
  }
  return (
    <EmptyState emoji="📖" title="Todavía no hay recetas">
      {user ? (
        <Link href="/recetas/nueva" className="btn-primary mt-2">
          Cargar la primera receta
        </Link>
      ) : (
        "Muy pronto vas a encontrar acá las recetas de mamá."
      )}
    </EmptyState>
  );
}
