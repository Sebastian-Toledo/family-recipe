import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** Sesión del usuario actual (o null). Se cachea por request. */
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export async function getUser() {
  return (await getSession())?.user ?? null;
}

/** La cuenta de ADMIN_EMAIL puede editar y borrar cualquier receta (también las de ejemplo). */
export function isAdmin(user: { email?: string | null } | null | undefined) {
  const admin = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(admin && user?.email?.toLowerCase() === admin);
}

/** Puede editar quien cargó la receta, o el admin. */
export function canEditRecipe(user: { id: string; email?: string | null } | null | undefined, createdById: string) {
  return Boolean(user && (user.id === createdById || isAdmin(user)));
}

/** Para páginas que exigen sesión: si no hay, manda a /ingresar y después vuelve a `returnTo`. */
export async function requireUser(returnTo: string) {
  const user = await getUser();
  if (!user) redirect(`/ingresar?next=${encodeURIComponent(returnTo)}`);
  return user;
}

/** Sólo aceptamos rutas internas en ?next= para no redirigir a sitios externos. */
export function safeNext(next: string | string[] | undefined): string {
  const value = Array.isArray(next) ? next[0] : next;
  return value && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/";
}
