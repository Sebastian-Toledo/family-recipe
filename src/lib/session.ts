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
