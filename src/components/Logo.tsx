/**
 * Logo: una "C" de "Con amor" con un corazón adentro.
 * Usa los colores de la paleta (variables CSS), así acompaña cualquier tema.
 */
export default function Logo({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="var(--color-brand-500)" />
      <circle cx="20" cy="20" r="16.5" fill="none" stroke="var(--color-brand-300)" strokeWidth="0.75" strokeDasharray="1.5 2" />
      <path d="M27.07 12.93 A10 10 0 1 0 27.07 27.07" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M20 24.4 L16.5 20.9 A2.35 2.35 0 0 1 20 17.8 A2.35 2.35 0 0 1 23.5 20.9 Z" fill="var(--color-pop-300)" />
    </svg>
  );
}
