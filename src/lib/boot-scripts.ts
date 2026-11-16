// Scripts chiquitos que corren en el <head> antes de pintar la página, para que no haya "parpadeo".
// Viven en un archivo común (no "use client") para que el layout del servidor reciba el texto tal cual.
import { DEFAULT_PALETTE, PALETTES } from "./palettes";

export const THEME_STORAGE_KEY = "recetario.theme";
export const PALETTE_STORAGE_KEY = "recetario.palette";

/** Usa el tema elegido en el menú de apariencia o, si nunca se eligió, el del sistema. */
export const themeBootScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

/** Aplica la paleta elegida en el menú de apariencia (o la de por defecto). */
export const paletteBootScript = `try{var p=localStorage.getItem("${PALETTE_STORAGE_KEY}");if(${JSON.stringify(PALETTES.map((x) => x.id))}.indexOf(p)<0)p="${DEFAULT_PALETTE}";document.documentElement.dataset.palette=p}catch(e){}`;
