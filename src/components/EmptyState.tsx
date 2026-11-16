export default function EmptyState({
  emoji = "🍽️",
  title,
  children,
}: {
  emoji?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center">
      <span className="text-5xl" aria-hidden>
        {emoji}
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
      {children && <div className="max-w-md text-muted">{children}</div>}
    </div>
  );
}
