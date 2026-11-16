"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "@/lib/boot-scripts";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  // Los dos íconos se dibujan siempre y el CSS muestra el que corresponde (evita desajustes al cargar).
  return (
    <button type="button" onClick={toggle} className={`btn-ghost px-2 ${className}`} title="Cambiar entre modo claro y oscuro">
      <Moon className="size-5 dark:hidden" aria-hidden />
      <Sun className="hidden size-5 dark:block" aria-hidden />
      <span className="sr-only">Cambiar entre modo claro y oscuro</span>
    </button>
  );
}
