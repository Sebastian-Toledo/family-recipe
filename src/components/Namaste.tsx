/** Texto de mamá que acompaña el recetario, al pie de la portada. */
const VERSOS = [
  "Supera el enojo",
  "con tranquilidad;",
  "supera la maldad",
  "con bondad;",
  "supera la mentira",
  "con verdad;",
  "el ruido con el",
  "silencio y el odio",
  "con amor.",
];

export default function Namaste() {
  return (
    <figure className="mx-auto mt-14 max-w-md rounded-2xl border border-line bg-brand-50/60 px-6 py-8 text-center print:hidden dark:bg-subtle">
      <span aria-hidden className="text-2xl">🙏</span>
      <blockquote className="mt-3 font-heading text-xl leading-relaxed md:text-2xl">
        {VERSOS.map((verso) => (
          <span key={verso} className="block">
            {verso}
          </span>
        ))}
      </blockquote>
      <figcaption className="mt-5 text-sm text-muted">
        <span className="block font-semibold text-accent">Namasté</span>
        (saludo hindú)
      </figcaption>
    </figure>
  );
}
