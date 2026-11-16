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
  { name: "Salsas y aderezos", emoji: "🫙" },
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
