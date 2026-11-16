"use client";

import { useEffect, useState } from "react";
import { Palette, X } from "lucide-react";
import { PALETTE_STORAGE_KEY as STORAGE_KEY } from "@/lib/boot-scripts";

// Herramienta temporal para elegir colores: sólo aparece con `npm run dev`.
// Cuando elijas, se fijan como los de siempre y este archivo se borra.

const PALETTES = [
  { id: "terracota", name: "Terracota", hint: "Terracota, oliva y mostaza", colors: ["#c85a2c", "#5f7a3a", "#d4a017"] },
  { id: "oliva", name: "Oliva y lino", hint: "Oliva, ladrillo y limón", colors: ["#637a2f", "#c2553a", "#c9a51f"] },
  { id: "tomate", name: "Tomate", hint: "Tomate, albahaca y ocre", colors: ["#c8372b", "#3f7d4e", "#d49520"] },
  { id: "talavera", name: "Azul talavera", hint: "Azul, ocre y verde de cerámica", colors: ["#2f6fab", "#c9901b", "#3e8a6b"] },
  { id: "ciruela", name: "Ciruela", hint: "Ciruela, salvia y damasco", colors: ["#9a4a7b", "#3c8478", "#e07a45"] },
];

export default function PaletteSwitcher() {
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState("terracota");

  useEffect(() => {
    setCurrent(document.documentElement.dataset.palette ?? "terracota");
  }, []);

  const choosePalette = (id: string) => {
    setCurrent(id);
    if (id === "terracota") delete document.documentElement.dataset.palette;
    else document.documentElement.dataset.palette = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-primary fixed right-4 bottom-4 z-40 rounded-full p-3 shadow-lg print:hidden"
        aria-label="Probar colores"
      >
        <Palette className="size-5" />
      </button>
    );
  }

  const option = (active: boolean) =>
    `flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
      active ? "bg-subtle ring-2 ring-brand-400" : "hover:bg-subtle"
    }`;

  return (
    <div className="card fixed right-4 bottom-4 z-40 w-76 p-4 shadow-xl print:hidden">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="font-bold">Probá los colores</p>
          <p className="text-xs text-muted">Sólo se ve en desarrollo.</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost p-1" aria-label="Minimizar">
          <X className="size-4" />
        </button>
      </div>

      <ul className="space-y-1">
          {PALETTES.map((p) => (
            <li key={p.id}>
              <button type="button" onClick={() => choosePalette(p.id)} aria-pressed={current === p.id} className={option(current === p.id)}>
                <span className="flex -space-x-1.5">
                  {p.colors.map((c) => (
                    <span key={c} className="size-5 rounded-full border border-black/10" style={{ background: c }} />
                  ))}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{p.name}</span>
                  <span className="block text-xs text-muted">{p.hint}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}
