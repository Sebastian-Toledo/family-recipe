"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Plus, X } from "lucide-react";
import { useSignOut } from "./UserMenu";

interface Props {
  links: { href: string; label: string }[];
  loggedIn: boolean;
}

export default function MobileMenu({ links, loggedIn }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const signOut = useSignOut();

  // Al navegar, se cierra.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <button type="button" className="btn-ghost px-2" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(true)}>
        <Menu className="size-6" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col gap-2 bg-surface p-4 shadow-xl">
            <button type="button" className="btn-ghost self-end px-2" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
              <X className="size-6" />
            </button>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="btn-ghost justify-start text-base">
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-line" />
            {loggedIn ? (
              <>
                <Link href="/recetas/nueva" className="btn-primary">
                  <Plus className="size-4" /> Nueva receta
                </Link>
                <button type="button" onClick={signOut} className="btn-outline">
                  <LogOut className="size-4" /> Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/ingresar" className="btn-outline">
                  Ingresar
                </Link>
                <Link href="/registrarse" className="btn-primary">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
