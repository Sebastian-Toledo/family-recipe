export interface Category {
  name: string;
  emoji: string;
}

// Inspiradas en cocinerosargentinos.com, adaptadas a un recetario familiar.
export const CATEGORIES: Category[] = [
  { name: "Desayunos y meriendas", emoji: "☕" },
  { name: "Entradas y picadas", emoji: "🧀" },
  { name: "Sopas y guisos", emoji: "🍲" },
  { name: "Carnes", emoji: "🥩" },
  { name: "Pollo", emoji: "🍗" },
  { name: "Pescados y mariscos", emoji: "🐟" },
  { name: "Pastas y arroces", emoji: "🍝" },
  { name: "Masas saladas", emoji: "🥟" },
  { name: "Verduras y ensaladas", emoji: "🥗" },
  { name: "Salsas y aderezos", emoji: "🥫" },
  { name: "Panes", emoji: "🍞" },
  { name: "Tortas y pastelería", emoji: "🎂" },
  { name: "Postres", emoji: "🍮" },
  { name: "Bebidas", emoji: "🍹" },
  { name: "Conservas y mermeladas", emoji: "🍓" },
  { name: "Fiestas", emoji: "🎄" },
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

export function categoryEmoji(name: string): string {
  return CATEGORIES.find((c) => c.name === name)?.emoji ?? "🍽️";
}

// ---------- Tonos: cada categoría usa uno de los 3 colores de la paleta, para dar variedad ----------

export type Tone = "brand" | "alt" | "pop";
const TONES: Tone[] = ["brand", "alt", "pop"];

export function categoryTone(name: string): Tone {
  const index = CATEGORIES.findIndex((c) => c.name === name);
  return index === -1 ? "brand" : TONES[index % TONES.length]!;
}

// Clases completas (Tailwind sólo genera las clases que encuentra escritas tal cual en el código).
export const TONE_CLASSES: Record<Tone, { placeholder: string; label: string }> = {
  brand: {
    placeholder: "from-brand-300/70 to-brand-100 dark:from-brand-500/30 dark:to-brand-500/5",
    label: "text-brand-600 dark:text-brand-300",
  },
  alt: {
    placeholder: "from-alt-300/70 to-alt-100 dark:from-alt-500/30 dark:to-alt-500/5",
    label: "text-alt-700 dark:text-alt-300",
  },
  pop: {
    placeholder: "from-pop-300/70 to-pop-100 dark:from-pop-500/30 dark:to-pop-500/5",
    label: "text-pop-700 dark:text-pop-300",
  },
};
