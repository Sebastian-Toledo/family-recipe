/** Texto de mamá que acompaña el recetario, al pie de la portada (a lo ancho). */
const VERSOS = [
  "Supera el enojo con tranquilidad;",
  "supera la maldad con bondad;",
  "supera la mentira con verdad;",
  "el ruido con el silencio y el odio con amor.",
];

export default function Namaste() {
  return (
    <figure className="mt-14 rounded-2xl border border-line bg-gradient-to-br from-brand-50 via-pop-100/60 to-alt-300/30 px-6 py-10 text-center print:hidden md:px-12 dark:from-brand-500/15 dark:via-surface dark:to-alt-500/15">
      <span aria-hidden className="text-2xl">🙏</span>
      <blockquote className="mx-auto mt-3 max-w-4xl font-heading text-xl leading-relaxed md:text-2xl">
        {VERSOS.map((verso) => (
          <span key={verso} className="block">
            {verso}
          </span>
        ))}
      </blockquote>
      <figcaption className="mt-5 text-sm text-muted">
        <span className="font-semibold text-accent">Namasté</span> · saludo hindú
      </figcaption>
    </figure>
  );
}
