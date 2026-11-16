/** Paletas de colores que se pueden elegir desde el botón de tema. Los colores reales están en globals.css. */
export const PALETTES = [
  { id: "oliva", name: "Oliva y lino", hint: "Oliva, ladrillo y limón", colors: ["#637a2f", "#c2553a", "#c9a51f"] },
  { id: "terracota", name: "Terracota", hint: "Terracota, oliva y mostaza", colors: ["#c85a2c", "#5f7a3a", "#d4a017"] },
  { id: "tomate", name: "Tomate", hint: "Tomate, albahaca y ocre", colors: ["#c8372b", "#3f7d4e", "#d49520"] },
  { id: "talavera", name: "Azul talavera", hint: "Azul, ocre y verde de cerámica", colors: ["#2f6fab", "#c9901b", "#3e8a6b"] },
  { id: "ciruela", name: "Ciruela", hint: "Ciruela, salvia y damasco", colors: ["#9a4a7b", "#3c8478", "#e07a45"] },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

/** La paleta con la que arranca el sitio si nunca se eligió otra. */
export const DEFAULT_PALETTE: PaletteId = "oliva";
