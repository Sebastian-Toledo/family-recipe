/**
 * Temas que se pueden elegir desde el botón de tema: cada uno es un degradé de 2 colores
 * (principal → secundario). Los tonos completos están en globals.css.
 */
export const PALETTES = [
  { id: "terracota", name: "Terracota", hint: "Terracota y oliva", colors: ["#c85a2c", "#5f7a3a"] },
  { id: "oliva", name: "Oliva y lino", hint: "Oliva y ladrillo", colors: ["#637a2f", "#c2553a"] },
  { id: "tomate", name: "Tomate", hint: "Tomate y albahaca", colors: ["#c8372b", "#3f7d4e"] },
  { id: "talavera", name: "Azul talavera", hint: "Azul y ocre de cerámica", colors: ["#2f6fab", "#c9901b"] },
  { id: "ciruela", name: "Ciruela", hint: "Ciruela y salvia", colors: ["#9a4a7b", "#3c8478"] },
] as const;

export type PaletteId = (typeof PALETTES)[number]["id"];

/** La paleta con la que arranca el sitio si nunca se eligió otra. */
export const DEFAULT_PALETTE: PaletteId = "terracota";
