"use client";

import { useActionState, useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ImageIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { saveRecipe, type RecipeFormState } from "@/lib/actions";
import { CATEGORIES } from "@/lib/categories";
import { resizeImage } from "@/lib/resize-image";

export interface RecipeFormValues {
  id?: number;
  title: string;
  category: string;
  author: string;
  servings: string;
  prepTime: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tips: string;
  imageUrl: string | null;
}

const EMPTY: RecipeFormValues = {
  title: "",
  category: "",
  author: "",
  servings: "",
  prepTime: "",
  description: "",
  ingredients: [],
  steps: [""],
  tips: "",
  imageUrl: null,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card space-y-5 p-5 md:p-8">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-red-600">
      {message}
    </p>
  );
}

export default function RecipeForm({ initial = EMPTY }: { initial?: RecipeFormValues }) {
  const isEdit = initial.id !== undefined;
  const [state, formAction] = useActionState<RecipeFormState, FormData>(saveRecipe, {});
  const [pending, startTransition] = useTransition();
  const [steps, setSteps] = useState(initial.steps.length ? initial.steps : [""]);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState(initial.imageUrl);
  const fileInput = useRef<HTMLInputElement>(null);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (!image) return setPreview(null);
    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  // Si el servidor devolvió errores, llevamos la vista al mensaje.
  useEffect(() => {
    if (state.error) document.getElementById("form-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [state]);

  const moveStep = (i: number, delta: number) =>
    setSteps((prev) => {
      const next = [...prev];
      [next[i], next[i + delta]] = [next[i + delta]!, next[i]!];
      return next;
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("image");
    if (image) formData.set("image", await resizeImage(image));
    if (isEdit && !existingImage && !image) formData.set("removeImage", "true");
    startTransition(() => formAction(formData));
  };

  const shownImage = preview ?? existingImage;

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold md:text-4xl">{isEdit ? "Editar receta" : "Nueva receta"}</h1>
      <p className="mt-2 mb-8 text-muted">Los campos con * son obligatorios. El resto lo podés completar después.</p>

      {isEdit && <input type="hidden" name="id" value={initial.id} />}

      {state.error && (
        <div id="form-error" role="alert" className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {state.error}
        </div>
      )}

      <div className="space-y-6">
        <Section title="Lo básico">
          <div>
            <label htmlFor="title" className="label">
              Nombre de la receta *
            </label>
            <input id="title" name="title" defaultValue={initial.title} placeholder="Ej: Pastel de papas" className="field" aria-invalid={!!errors.title} aria-describedby="title-error" />
            <FieldError id="title-error" message={errors.title} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="category" className="label">
                Categoría *
              </label>
              <select id="category" name="category" defaultValue={initial.category} className="field" aria-invalid={!!errors.category} aria-describedby="category-error">
                <option value="">Elegí una…</option>
                {CATEGORIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.emoji} {c.name}
                  </option>
                ))}
              </select>
              <FieldError id="category-error" message={errors.category} />
            </div>
            <div>
              <label htmlFor="author" className="label">
                ¿De quién es la receta?
              </label>
              <input id="author" name="author" defaultValue={initial.author} placeholder="Ej: Mamá, Abuela Rosa" className="field" />
            </div>
            <div>
              <label htmlFor="prepTime" className="label">
                Tiempo
              </label>
              <input id="prepTime" name="prepTime" defaultValue={initial.prepTime} placeholder="Ej: 45 min" className="field" />
            </div>
            <div>
              <label htmlFor="servings" className="label">
                Rinde
              </label>
              <input id="servings" name="servings" defaultValue={initial.servings} placeholder="Ej: 4 porciones" className="field" />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="label">
              Descripción o historia
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              defaultValue={initial.description}
              placeholder="¿Cuándo la hacía? ¿Para qué ocasión? Cualquier recuerdo vale."
              className="field"
            />
          </div>

          <div>
            <span className="label">Foto</span>
            <div className="flex flex-wrap items-center gap-4">
              {shownImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shownImage} alt="Vista previa" className="size-28 rounded-lg object-cover" />
              ) : (
                <div className="grid size-28 place-items-center rounded-lg bg-subtle text-muted">
                  <ImageIcon className="size-8" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <button type="button" className="btn-outline" onClick={() => fileInput.current?.click()}>
                  <ImageIcon className="size-4" /> {shownImage ? "Cambiar foto" : "Elegir foto"}
                </button>
                {shownImage && (
                  <button
                    type="button"
                    className="btn-ghost text-sm"
                    onClick={() => {
                      setImage(null);
                      setExistingImage(null);
                      if (fileInput.current) fileInput.current.value = "";
                    }}
                  >
                    Quitar foto
                  </button>
                )}
              </div>
              <input
                ref={fileInput}
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />
            </div>
            <p className="mt-1.5 text-sm text-muted">Una foto del plato o del papelito original. Se achica sola antes de subirse.</p>
            <FieldError id="image-error" message={errors.image} />
          </div>
        </Section>

        <Section title="Ingredientes *">
          <div>
            <textarea
              name="ingredients"
              rows={10}
              defaultValue={initial.ingredients.join("\n")}
              aria-label="Ingredientes"
              aria-invalid={!!errors.ingredients}
              aria-describedby="ingredients-help ingredients-error"
              placeholder={"Para la masa:\n500 g de harina\n2 huevos\n\nPara el relleno:\n1 kg de carne picada"}
              className="field"
            />
            <p id="ingredients-help" className="mt-1.5 text-sm text-muted">
              Un ingrediente por línea. Si una línea termina con “:” se muestra como subtítulo (ej: “Para la masa:”).
            </p>
            <FieldError id="ingredients-error" message={errors.ingredients} />
          </div>
        </Section>

        <Section title="Preparación *">
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-brand-500 font-bold text-white">{i + 1}</span>
                <textarea
                  name="steps"
                  rows={2}
                  value={step}
                  onChange={(e) => setSteps((prev) => prev.map((s, j) => (j === i ? e.target.value : s)))}
                  placeholder={i === 0 ? "Ej: Precalentar el horno a 180 °C." : "Siguiente paso…"}
                  aria-label={`Paso ${i + 1}`}
                  className="field"
                />
                <div className="flex flex-col">
                  <button type="button" className="btn-ghost p-1.5" aria-label="Subir paso" disabled={i === 0} onClick={() => moveStep(i, -1)}>
                    <ArrowUp className="size-4" />
                  </button>
                  <button type="button" className="btn-ghost p-1.5" aria-label="Bajar paso" disabled={i === steps.length - 1} onClick={() => moveStep(i, 1)}>
                    <ArrowDown className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="btn-ghost p-1.5 text-red-600"
                    aria-label="Borrar paso"
                    disabled={steps.length === 1}
                    onClick={() => setSteps((prev) => prev.filter((_, j) => j !== i))}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <FieldError id="steps-error" message={errors.steps} />
          <button type="button" className="btn-outline" onClick={() => setSteps((prev) => [...prev, ""])}>
            <Plus className="size-4" /> Agregar paso
          </button>
        </Section>

        <Section title="El secreto (opcional)">
          <textarea
            name="tips"
            rows={3}
            defaultValue={initial.tips}
            aria-label="El secreto"
            placeholder="Ese truquito que hace que salga como la de mamá."
            className="field"
          />
        </Section>

        <div className="flex items-center justify-end gap-3 pb-4">
          <Link href={isEdit ? `/recetas/${initial.id}` : "/"} className="btn-ghost">
            Cancelar
          </Link>
          <button type="submit" className="btn-primary px-6 py-3 text-base" disabled={pending}>
            {pending && <Loader2 className="size-4 animate-spin" />}
            {pending ? "Guardando…" : isEdit ? "Guardar cambios" : "Guardar receta"}
          </button>
        </div>
      </div>
    </form>
  );
}
