// Scripts chiquitos que corren en el <head> antes de pintar la página, para que no haya "parpadeo".
// Viven en un archivo común (no "use client") para que el layout del servidor reciba el texto tal cual.

export const THEME_STORAGE_KEY = "recetario.theme";
export const PALETTE_STORAGE_KEY = "recetario.palette";

/** Usa el tema elegido con el botón ☀️/🌙 o, si nunca se eligió, el del sistema. */
export const themeBootScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){}`;

/** Sólo en desarrollo: aplica la paleta elegida en el selector de colores. */
export const paletteBootScript = `try{var p=localStorage.getItem("${PALETTE_STORAGE_KEY}");if(p&&p!=="terracota")document.documentElement.dataset.palette=p}catch(e){}`;
