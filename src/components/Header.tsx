import Link from "next/link";
import { Plus } from "lucide-react";
import { getUser } from "@/lib/session";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

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
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="" className="size-10 rounded-full object-cover" />
          <span className="font-heading text-lg font-bold whitespace-nowrap sm:text-xl">Recetario de mamá</span>
        </Link>

        <NavLinks links={links} />

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/recetas/nueva" className="btn-primary hidden sm:inline-flex">
                <Plus className="size-4" /> Nueva receta
              </Link>
              <UserMenu name={user.name} email={user.email} />
            </>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/ingresar" className="btn-ghost text-accent">
                Ingresar
              </Link>
              <Link href="/registrarse" className="btn-primary">
                Crear cuenta
              </Link>
            </div>
          )}
          <MobileMenu links={links} loggedIn={Boolean(user)} />
        </div>
      </div>
    </header>
  );
}
