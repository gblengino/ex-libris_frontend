"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div
            role="alert"
            className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center"
        >
            <TriangleAlert className="size-10 text-danger" aria-hidden="true" />
            <h1 className="font-display text-3xl font-semibold text-ink">
                Algo salió mal
            </h1>
            <p className="text-muted">
                No pudimos cargar esta página. Probá de nuevo en unos instantes.
            </p>
            <div className="mt-2 flex items-center gap-3">
                <Button type="button" onClick={() => reset()}>
                    Reintentar
                </Button>
                <LinkButton href="/" variant="secondary">
                    Ir al inicio
                </LinkButton>
            </div>
        </div>
    )
}