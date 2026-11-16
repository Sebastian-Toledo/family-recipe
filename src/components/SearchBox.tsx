"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2, Search } from "lucide-react";

/** Buscador que actualiza ?q= en la URL mientras escribís (así se puede compartir el link). */
export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [value, setValue] = useState(q);
  const [pending, startTransition] = useTransition();
  const lastPushed = useRef(q);

  // Si la URL cambia desde afuera (menú, botón "atrás"), el input acompaña.
  useEffect(() => {
    if (q !== lastPushed.current) {
      lastPushed.current = q;
      setValue(q);
    }
  }, [q]);

  useEffect(() => {
    const id = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed === lastPushed.current) return;
      lastPushed.current = trimmed;
      const params = new URLSearchParams(searchParams);
      if (trimmed) params.set("q", trimmed);
      else params.delete("q");
      const qs = params.toString();
      startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
    }, 350);
    return () => clearTimeout(id);
  }, [value, pathname, router, searchParams]);

  const Icon = pending ? Loader2 : Search;
  return (
    <div className="relative mx-auto mt-6 max-w-xl">
      <Icon className={`pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted ${pending ? "animate-spin" : ""}`} />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscá por nombre o ingrediente…"
        aria-label="Buscar recetas"
        className="field h-14 pl-12 text-lg shadow-sm"
      />
    </div>
  );
}
