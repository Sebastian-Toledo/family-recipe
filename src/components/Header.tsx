import Link from "next/link";
import { Plus } from "lucide-react";
import { getUser } from "@/lib/session";
import { isSignUpOpen } from "@/lib/auth";
import { SITE_NAME } from "@/lib/site";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import ThemeMenu from "./ThemeMenu";

export default async function Header() {
  const user = await getUser();
  const links = [
    { href: "/", label: "Recetas" },
    ...(user
      ? [
          { href: "/favoritas", label: "Favoritas" },
          { href: "/mis-recetas", label: "Mis recetas" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-30 border-b-4 border-brand-500 bg-surface/95 backdrop-blur print:hidden dark:border-b dark:border-line">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Logo className="size-10 shrink-0" />
          <span className="truncate font-heading text-base font-bold sm:text-xl">{SITE_NAME}</span>
        </Link>

        <NavLinks links={links} />

        <div className="flex shrink-0 items-center gap-2">
          <ThemeMenu />
          {user ? (
            <>
              <Link href="/recetas/nueva" className="btn-primary hidden sm:inline-flex">
                <Plus className="size-4" /> Nueva receta
              </Link>
              <UserMenu name={user.name} email={user.email} />
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/ingresar" className={isSignUpOpen ? "btn-ghost text-accent" : "btn-primary"}>
                Ingresar
              </Link>
              {isSignUpOpen && (
                <Link href="/registrarse" className="btn-primary">
                  Crear cuenta
                </Link>
              )}
            </div>
          )}
          <MobileMenu links={links} loggedIn={Boolean(user)} signUpOpen={isSignUpOpen} />
        </div>
      </div>
    </header>
  );
}
