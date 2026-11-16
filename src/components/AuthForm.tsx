"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient, authErrorMessage } from "@/lib/auth-client";

interface Props {
  mode: "login" | "register";
  next: string;
  inviteCodeRequired?: boolean;
  /** Si se pueden crear cuentas nuevas (si no, se oculta el link a "Crear cuenta"). */
  signUpOpen?: boolean;
  /** Muestra el botón "Continuar con Google". */
  googleEnabled?: boolean;
  initialError?: string | null;
}

export default function AuthForm({
  mode,
  next,
  inviteCodeRequired = false,
  signUpOpen = true,
  googleEnabled = false,
  initialError = null,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(initialError);
  const [pending, setPending] = useState(false);
  const isLogin = mode === "login";

  const signInWithGoogle = async () => {
    setError(null);
    setPending(true);
    // Redirige a Google; al volver, Better Auth manda a `next` (o a /ingresar con ?error=…).
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: next,
      errorCallbackURL: `/ingresar?next=${encodeURIComponent(next)}`,
    });
    if (error) {
      setError(authErrorMessage(error));
      setPending(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    setError(null);
    setPending(true);

    const { error } = isLogin
      ? await authClient.signIn.email({ email, password })
      : await authClient.signUp.email(
          { name: String(form.get("name")).trim(), email, password },
          { headers: { "x-invite-code": String(form.get("inviteCode") ?? "") } }
        );

    if (error) {
      setError(authErrorMessage(error));
      setPending(false);
      return;
    }
    router.replace(next);
    router.refresh();
  };

  const otherHref = `${isLogin ? "/registrarse" : "/ingresar"}?next=${encodeURIComponent(next)}`;

  return (
    <div className="card mx-auto max-w-md p-6 shadow-sm md:p-10">
      <h1 className="text-center text-3xl font-bold">{isLogin ? "Ingresar" : "Crear cuenta"}</h1>
      <p className="mt-2 mb-8 text-center text-muted">
        {isLogin
          ? "Para cargar recetas y guardar tus favoritas."
          : "Cualquiera puede ver las recetas; para cargar nuevas necesitás una cuenta."}
      </p>

      {error && (
        <div role="alert" className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          {error}
        </div>
      )}

      {googleEnabled && (
        <>
          <button type="button" onClick={signInWithGoogle} disabled={pending} className="btn-outline w-full py-3 text-base">
            <GoogleIcon className="size-5" /> Continuar con Google
          </button>
          <div className="my-6 flex items-center gap-3 text-sm text-muted">
            <span className="h-px flex-1 bg-line" /> o con tu email <span className="h-px flex-1 bg-line" />
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="label">
              Nombre
            </label>
            <input id="name" name="name" required minLength={2} autoComplete="name" className="field" />
          </div>
        )}
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={isLogin ? undefined : 6}
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="field"
          />
          {!isLogin && <p className="mt-1.5 text-sm text-muted">Mínimo 6 caracteres.</p>}
        </div>
        {!isLogin && inviteCodeRequired && (
          <div>
            <label htmlFor="inviteCode" className="label">
              Código de invitación
            </label>
            <input id="inviteCode" name="inviteCode" required className="field" />
            <p className="mt-1.5 text-sm text-muted">Pedíselo a quien administra el recetario.</p>
          </div>
        )}
        <button type="submit" className="btn-primary w-full py-3 text-base" disabled={pending}>
          {pending && <Loader2 className="size-4 animate-spin" />}
          {isLogin ? "Ingresar" : "Crear cuenta"}
        </button>
      </form>

      {signUpOpen && (
        <p className="mt-6 text-center text-sm">
          {isLogin ? "¿No tenés cuenta? " : "¿Ya tenés cuenta? "}
          <Link href={otherHref} className="font-bold text-accent hover:underline">
            {isLogin ? "Creá una" : "Ingresá"}
          </Link>
        </p>
      )}
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.5z" />
    </svg>
  );
}
