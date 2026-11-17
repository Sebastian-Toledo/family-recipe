"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Pencil, Printer, Share2, Trash2 } from "lucide-react";
import { deleteRecipe, setFavorite } from "@/lib/actions";

interface Props {
  recipeId: number;
  title: string;
  isFavorite: boolean;
  canEdit: boolean;
  loggedIn: boolean;
}

/** Botonera de la receta: favorita, compartir, imprimir, editar y borrar. */
export default function RecipeActions({ recipeId, title, isFavorite, canEdit, loggedIn }: Props) {
  const router = useRouter();
  const [favorite, setOptimisticFavorite] = useOptimistic(isFavorite);
  const [, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  const flash = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const toggleFavorite = () => {
    if (!loggedIn) {
      router.push(`/ingresar?next=${encodeURIComponent(`/recetas/${recipeId}`)}`);
      return;
    }
    startTransition(async () => {
      setOptimisticFavorite(!favorite);
      const res = await setFavorite(recipeId, !favorite);
      if (res.error) flash(res.error);
    });
  };

  const share = async () => {
    const url = window.location.href.split("?")[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Si cierran el diálogo de compartir, probamos copiar el link.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      flash("¡Link copiado! Ya podés pegarlo en WhatsApp.");
    } catch {
      flash("Copiá el link desde la barra del navegador.");
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    const res = await deleteRecipe(recipeId);
    // Si sale bien, la acción redirige al inicio; si no, mostramos el error.
    if (res?.error) {
      setDeleting(false);
      dialog.current?.close();
      flash(res.error);
    }
  };

  return (
    <div className="mt-6 print:hidden">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={toggleFavorite} aria-pressed={favorite} className={favorite ? "btn-primary" : "btn-outline"}>
          <Heart className={`size-4 ${favorite ? "fill-current" : ""}`} />
          {favorite ? "En favoritas" : "Guardar en favoritas"}
        </button>
        <button type="button" onClick={share} className="btn-ghost text-accent">
          <Share2 className="size-4" /> Compartir
        </button>
        <button type="button" onClick={() => window.print()} className="btn-ghost text-accent">
          <Printer className="size-4" /> Imprimir
        </button>
        {canEdit && (
          <>
            <Link href={`/recetas/${recipeId}/editar`} className="btn-ghost text-accent">
              <Pencil className="size-4" /> Editar
            </Link>
            <button type="button" onClick={() => dialog.current?.showModal()} className="btn-ghost text-accent">
              <Trash2 className="size-4" /> Borrar
            </button>
          </>
        )}
      </div>
      <p role="status" className="mt-3 h-5 text-sm font-semibold text-accent">
        {message}
      </p>

      <dialog ref={dialog} className="card m-auto w-[min(28rem,90vw)] p-6 text-ink shadow-xl backdrop:bg-black/40">
        <h2 className="text-xl font-bold">¿Borrar “{title}”?</h2>
        <p className="mt-2 text-muted">Se borra para todos y no se puede deshacer.</p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="btn-ghost" onClick={() => dialog.current?.close()} autoFocus>
            Cancelar
          </button>
          <button type="button" className="btn-danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? "Borrando…" : "Borrar"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
