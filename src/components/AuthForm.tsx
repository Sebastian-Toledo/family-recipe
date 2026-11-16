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
}

export default function AuthForm({ mode, next, inviteCodeRequired = false }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const isLogin = mode === "login";

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

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
            {error}
          </div>
        )}
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

      <p className="mt-6 text-center text-sm">
        {isLogin ? "¿No tenés cuenta? " : "¿Ya tenés cuenta? "}
        <Link href={otherHref} className="font-bold text-accent hover:underline">
          {isLogin ? "Creá una" : "Ingresá"}
        </Link>
      </p>
    </div>
  );
}
