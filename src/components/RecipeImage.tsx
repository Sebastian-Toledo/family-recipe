import { categoryEmoji } from "@/lib/categories";

interface Props {
  src: string | null;
  alt: string;
  category: string;
  className?: string;
  emojiClassName?: string;
}

/** Foto de la receta, o un fondo cálido con el emoji de la categoría si no tiene foto. */
export default function RecipeImage({ src, alt, category, className = "", emojiClassName = "text-5xl" }: Props) {
  return (
    <div className={`overflow-hidden bg-subtle ${className}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
      ) : (
        <div className="grid size-full place-items-center bg-gradient-to-br from-brand-100 to-subtle dark:from-subtle dark:to-surface">
          <span className={emojiClassName} aria-hidden>
            {categoryEmoji(category)}
          </span>
        </div>
      )}
    </div>
  );
}
