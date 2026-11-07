import { BookOpen } from "lucide-react";
import LinkButton from "../ui/LinkButton";

export default function NotFoundContent() {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
            <BookOpen className="size-10 text-muted" aria-hidden="true" />
            <p className="font-display text-7xl font-semibold text-muted" aria-hidden="true">
                404
            </p>
            <h1 className="font-display text-3xl font-semibold text-ink">
                Página no encontrada
            </h1>
            <p className="text-muted">
                Parece que esta página no figura en nuestro catálogo. Puede que el
                enlace esté roto o que el contenido haya sido eliminado.
            </p>
            <LinkButton
                href="/"
            >
                Volver al inicio
            </LinkButton>
        </div>
    )
}