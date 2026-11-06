"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { commentSchema } from "@/app/validations/data";
import { createComment, updateComment } from "@/app/actions/comments";

import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

export default function CommentForm({ reviewId = null, initialData = null, onSuccess }) {

    const router = useRouter();

    const onSuccessRef = useRef(onSuccess);
    useEffect(() => {
        onSuccessRef.current = onSuccess;
    });

    const action = initialData 
    ? updateComment.bind(null, initialData.id) 
    : createComment.bind(null, reviewId);
    
    const initialState = {
        success: false,
        errors: {},
    }

    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );
    
    /* iniciacion del useForm con commentSchema, destacar que la id de la
        review se la paso .bind() en el useActionState */
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: initialData?.content ?? "",
        },
    });

    useEffect(() => {
        if (!state?.success) return;

        if (!initialData) {
            // Comentario nuevo: limpiar y refrescar para que aparezca en la lista
            reset();
            router.refresh();
        }

        // Edición: devolver el comentario actualizado al componente padre
        onSuccessRef.current?.(state.comment);
    }, [state, initialData, reset, router]);

    
    /* Funcion onSubmit para el comentario */
    const onSubmit = (data) => {
        const formData = new FormData();
        
        formData.set("content", data.content);
        
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <TextArea
                id="content"
                label="Tu comentario"
                placeholder="¿Qué te pareció esta reseña?"
                rows={4}
                maxLength={2000}
                error={errors.content?.message || state?.errors?.content?.[0]}
                disabled={isPending}
                {...register("content")}
            />

            {state?.errors?.form && (
                <p role="alert" className="text-sm text-red-400">
                    {state.errors.form[0]}
                </p>
            )}

            <div className="flex justify-end">
                <Button
                    type="submit"
                    loading={isPending}
                >
                    {
                        initialData 
                        ? (isPending ? "Guardando comentario..." : "Guardar comentario")
                        : (isPending ? "Publicando comentario..." : "Publicar comentario")
                    }
                </Button>
            </div>
        </form>
    );
}