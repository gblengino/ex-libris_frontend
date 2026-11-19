"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, X, AlertTriangle } from "lucide-react"

import Button from "@/components/ui/Button"
import { deleteReview } from "@/app/actions/reviews"

export default function DeleteReviewButton({ reviewId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    async function handleDelete() {
        try {
            setIsDeleting(true);
            setError("");

            const result = await deleteReview(reviewId);

            if (!result.success) {
                setError(result.error);
                return;
            }

            router.push("/profile/me");
            router.refresh();

        } catch {
            setError("Ocurrió un error inesperado.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <Button
                variant="danger"
                size="sm"
                onClick={() => setIsOpen(true)}
            >
                <Trash2 size={16} />
                Eliminar
            </Button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center
                    justify-center bg-black/60 p-4"
                    onClick={() => !isDeleting && setIsOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="relative w-full max-w-md rounded-xl
                        bg-paper text-ink p-6 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isDeleting}
                            aria-label="Cerrar modal"
                            className="absolute right-4 top-4 text-muted
                            hover:text-ink transition-colors
                            disabled:opacity-50"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center
                        text-center gap-4">

                            <div className="flex items-center justify-center
                            size-14 rounded-full bg-danger/10 text-danger">
                                <AlertTriangle size={28} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2
                                    id="delete-title"
                                    className="font-serif text-2xl font-bold"
                                >
                                    ¿Eliminar reseña?
                                </h2>

                                <p className="text-sm text-muted">
                                    Esta acción eliminará tu reseña
                                    permanentemente. No podrás recuperarla.
                                </p>
                            </div>

                            {error && (
                                <p className="text-sm text-danger">
                                    {error}
                                </p>
                            )}

                            <div className="flex w-full gap-3 mt-2">
                                <Button
                                    variant="outline"
                                    size="md"
                                    fullWidth
                                    disabled={isDeleting}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant="danger"
                                    size="md"
                                    fullWidth
                                    loading={isDeleting}
                                    onClick={handleDelete}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
