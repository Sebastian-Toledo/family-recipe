"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { favorites, recipes } from "@/db/schema";
import { CATEGORY_NAMES } from "./categories";
import { getUser } from "./session";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, deleteImage, saveImage } from "./storage";

export type FieldErrors = Partial<Record<"title" | "category" | "ingredients" | "steps" | "image", string>>;
export interface RecipeFormState {
  error?: string;
  fieldErrors?: FieldErrors;
}

const lines = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const recipeSchema = z.object({
  title: z.string().trim().min(2, "Poné un nombre para la receta.").max(150),
  category: z.enum(CATEGORY_NAMES as [string, ...string[]], { error: "Elegí una categoría." }),
  author: z.string().trim().max(100),
  servings: z.string().trim().max(60),
  prepTime: z.string().trim().max(60),
  description: z.string().trim().max(2000),
  tips: z.string().trim().max(2000),
  ingredients: z.array(z.string().max(300)).min(1, "Agregá al menos un ingrediente.").max(100),
  steps: z.array(z.string().max(3000)).min(1, "Agregá al menos un paso.").max(60),
});

/** Crea o edita una receta (si el form trae `id`). */
export async function saveRecipe(_prev: RecipeFormState, formData: FormData): Promise<RecipeFormState> {
  const currentUser = await getUser();
  if (!currentUser) return { error: "Tu sesión expiró. Volvé a ingresar." };

  const parsed = recipeSchema.safeParse({
    title: formData.get("title") ?? "",
    category: formData.get("category") ?? "",
    author: formData.get("author") ?? "",
    servings: formData.get("servings") ?? "",
    prepTime: formData.get("prepTime") ?? "",
    description: formData.get("description") ?? "",
    tips: formData.get("tips") ?? "",
    ingredients: lines(formData.get("ingredients")),
    steps: formData.getAll("steps").map((s) => String(s).trim()).filter(Boolean),
  });

  const image = formData.get("image");
  const hasNewImage = image instanceof File && image.size > 0;
  const fieldErrors: FieldErrors = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof FieldErrors;
      fieldErrors[key] ??= issue.message;
    }
  }
  if (hasNewImage && !(image.type in ALLOWED_IMAGE_TYPES)) fieldErrors.image = "La foto tiene que ser JPG, PNG o WebP.";
  if (hasNewImage && image.size > MAX_IMAGE_BYTES) fieldErrors.image = "La foto es demasiado pesada.";
  if (!parsed.success || Object.keys(fieldErrors).length) {
    return { error: "Revisá los campos marcados.", fieldErrors };
  }
  const data = parsed.data;

  const idValue = formData.get("id");
  const id = idValue ? Number(idValue) : null;
  let recipeId: number;

  if (id) {
    const [existing] = await db.select().from(recipes).where(eq(recipes.id, id));
    if (!existing) return { error: "Esa receta ya no existe." };
    if (existing.createdById !== currentUser.id) return { error: "Sólo quien cargó la receta puede editarla." };

    let imageUrl = existing.imageUrl;
    if (hasNewImage || formData.get("removeImage") === "true") {
      imageUrl = hasNewImage ? await saveImage(image) : null;
      await deleteImage(existing.imageUrl);
    }
    await db.update(recipes).set({ ...data, imageUrl }).where(eq(recipes.id, id));
    recipeId = id;
  } else {
    const imageUrl = hasNewImage ? await saveImage(image) : null;
    const [created] = await db
      .insert(recipes)
      .values({ ...data, imageUrl, createdById: currentUser.id })
      .returning({ id: recipes.id });
    recipeId = created.id;
  }

  revalidatePath("/", "layout");
  redirect(`/recetas/${recipeId}?guardada=1`);
}

export async function deleteRecipe(id: number): Promise<{ error?: string }> {
  const currentUser = await getUser();
  if (!currentUser) return { error: "Tu sesión expiró. Volvé a ingresar." };

  const [existing] = await db.select().from(recipes).where(eq(recipes.id, id));
  if (!existing) return { error: "Esa receta ya no existe." };
  if (existing.createdById !== currentUser.id) return { error: "Sólo quien cargó la receta puede borrarla." };

  await db.delete(recipes).where(eq(recipes.id, id));
  await deleteImage(existing.imageUrl);
  revalidatePath("/", "layout");
  redirect("/");
}

export async function setFavorite(recipeId: number, favorite: boolean): Promise<{ error?: string }> {
  const currentUser = await getUser();
  if (!currentUser) return { error: "Ingresá para guardar favoritas." };

  if (favorite) {
    await db.insert(favorites).values({ userId: currentUser.id, recipeId }).onConflictDoNothing();
  } else {
    await db.delete(favorites).where(and(eq(favorites.userId, currentUser.id), eq(favorites.recipeId, recipeId)));
  }
  revalidatePath("/", "layout");
  return {};
}
