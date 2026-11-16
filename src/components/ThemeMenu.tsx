"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Moon, Sun } from "lucide-react";
import { PALETTE_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/boot-scripts";
import { DEFAULT_PALETTE, PALETTES } from "@/lib/palettes";

type Theme = "light" | "dark";

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

/** Botón ☀️/🌙 del encabezado: abre un menú para elegir modo claro u oscuro y la paleta de colores. */
export default function ThemeMenu() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [palette, setPalette] = useState<string>(DEFAULT_PALETTE);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    setPalette(root.dataset.palette ?? DEFAULT_PALETTE);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const chooseTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    save(THEME_STORAGE_KEY, next);
  };

  const choosePalette = (id: string) => {
    setPalette(id);
    document.documentElement.dataset.palette = id;
    save(PALETTE_STORAGE_KEY, id);
  };

  const modeButton = (value: Theme, label: string, Icon: typeof Sun) => (
    <button
      type="button"
      onClick={() => chooseTheme(value)}
      aria-pressed={theme === value}
      className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
        theme === value ? "bg-surface text-accent shadow-sm" : "text-muted hover:text-ink"
      }`}
    >
      <Icon className="size-4" aria-hidden /> {label}
    </button>
  );

  // Los dos íconos se dibujan siempre y el CSS muestra el que corresponde (evita desajustes al cargar).
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="btn-ghost px-2"
        title="Apariencia: modo claro u oscuro y colores"
      >
        <Moon className="size-5 dark:hidden" aria-hidden />
        <Sun className="hidden size-5 dark:block" aria-hidden />
        <span className="sr-only">Cambiar modo y colores</span>
      </button>

      {open && (
        <div role="dialog" aria-label="Apariencia" className="card absolute right-0 z-40 mt-2 w-72 max-w-[calc(100vw-2rem)] p-3 shadow-xl">
          <p className="eyebrow mb-2">Modo</p>
          <div className="flex gap-1 rounded-lg bg-subtle p-1">
            {modeButton("light", "Claro", Sun)}
            {modeButton("dark", "Oscuro", Moon)}
          </div>

          <p className="eyebrow mt-4 mb-2">Colores</p>
          <ul className="space-y-1">
            {PALETTES.map((p) => {
              const active = palette === p.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => choosePalette(p.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                      active ? "bg-subtle ring-2 ring-brand-400" : "hover:bg-subtle"
                    }`}
                  >
                    <span className="flex -space-x-1.5">
                      {p.colors.map((c) => (
                        <span key={c} className="size-5 rounded-full border border-black/10" style={{ background: c }} />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{p.name}</span>
                      <span className="block text-xs text-muted">{p.hint}</span>
                    </span>
                    {active && <Check className="size-4 shrink-0 text-accent" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
