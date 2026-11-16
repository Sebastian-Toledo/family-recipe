import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isGoogleEnabled, isSignUpOpen } from "@/lib/auth";
import { getUser, safeNext } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "Ingresar" };

// Errores con los que vuelve el ingreso con Google.
const OAUTH_ERRORS: Record<string, string> = {
  signup_disabled: "Esa cuenta de Google no tiene acceso al recetario.",
  access_denied: "Cancelaste el ingreso con Google.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next);
  if (await getUser()) redirect(next);
  const oauthError = params.error
    ? (OAUTH_ERRORS[params.error] ?? "No pudimos ingresar con Google. Probá de nuevo.")
    : null;
  return (
    <AuthForm mode="login" next={next} signUpOpen={isSignUpOpen} googleEnabled={isGoogleEnabled} initialError={oauthError} />
  );
}
