"use client";

import { useState } from "react";

/** Lista de ingredientes que se pueden ir tachando. Las líneas que terminan en ":" son subtítulos. */
export default function IngredientChecklist({ ingredients }: { ingredients: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className="space-y-2">
      {ingredients.map((line, i) =>
        line.endsWith(":") ? (
          <li key={i} className={`font-bold ${i > 0 ? "pt-3" : ""}`}>
            {line.slice(0, -1)}
          </li>
        ) : (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={checked.has(i)}
                onChange={() => toggle(i)}
                className="mt-1 size-4 shrink-0 accent-brand-500"
              />
              <span className={checked.has(i) ? "text-muted line-through" : ""}>{line}</span>
            </label>
          </li>
        )
      )}
    </ul>
  );
}
