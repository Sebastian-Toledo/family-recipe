"use client";

import { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";
import { setFavorite } from "@/lib/actions";

/** Corazón de la tarjeta: marca o saca la favorita sin entrar a la receta. */
export default function CardFavoriteButton({ recipeId, title, isFavorite }: { recipeId: number; title: string; isFavorite: boolean }) {
  const [favorite, setOptimisticFavorite] = useOptimistic(isFavorite);
  const [, startTransition] = useTransition();

  const toggle = () =>
    startTransition(async () => {
      setOptimisticFavorite(!favorite);
      await setFavorite(recipeId, !favorite);
    });

  const label = favorite ? `Sacar “${title}” de favoritas` : `Guardar “${title}” en favoritas`;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={favorite}
      aria-label={label}
      title={favorite ? "Sacar de favoritas" : "Guardar en favoritas"}
      className={`absolute top-3 right-3 z-10 rounded-full bg-white p-1.5 shadow transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand-500 print:hidden ${
        favorite ? "" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100 max-md:opacity-90"
      }`}
    >
      <Heart className={`size-4 text-brand-500 ${favorite ? "fill-brand-500" : ""}`} />
    </button>
  );
}
