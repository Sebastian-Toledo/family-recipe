/**
 * Logo: una olla de mamá con el vapor que sube en forma de corazón ("Con amor, mamá").
 * Usa los colores de la paleta (variables CSS), así acompaña cualquier tema.
 */
export default function Logo({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="var(--color-brand-500)" />
      <circle cx="20" cy="20" r="16.5" fill="none" stroke="var(--color-brand-300)" strokeWidth="0.75" strokeDasharray="1.5 2" />
      {/* vapor */}
      <path d="M14.6 16 q-1.2 -1.6 0 -3.2 q1.2 -1.6 0 -3.2 M25.4 16 q1.2 -1.6 0 -3.2 q-1.2 -1.6 0 -3.2" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      {/* corazón */}
      <path d="M20 15.6 L16.4 12 A2.45 2.45 0 0 1 20 8.9 A2.45 2.45 0 0 1 23.6 12 Z" fill="var(--color-pop-300)" />
      {/* olla */}
      <rect x="18.4" y="17.3" width="3.2" height="2" rx="1" fill="#fff" />
      <rect x="10" y="18.8" width="20" height="2.4" rx="1.2" fill="#fff" />
      <path d="M11.2 22 H28.8 V26.4 A4 4 0 0 1 24.8 30.4 H15.2 A4 4 0 0 1 11.2 26.4 Z" fill="#fff" />
      <rect x="7.8" y="22.6" width="4" height="2.2" rx="1.1" fill="#fff" />
      <rect x="28.2" y="22.6" width="4" height="2.2" rx="1.1" fill="#fff" />
    </svg>
  );
}
