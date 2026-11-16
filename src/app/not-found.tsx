import Link from "next/link";
import EmptyState from "@/components/EmptyState";

export default function NotFound() {
  return (
    <EmptyState emoji="🥄" title="No encontramos esta página">
      <p>Puede que la receta se haya borrado o que el link esté mal.</p>
      <Link href="/" className="btn-primary mt-4">
        Ir a las recetas
      </Link>
    </EmptyState>
  );
}
