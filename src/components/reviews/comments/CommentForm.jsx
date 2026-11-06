"use client";

import { startTransition, useActionState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { commentSchema } from "@/app/validations/data";
import { createComment } from "@/app/actions/comments";

import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

export default function CommentForm({ reviewId }) {

    const router = useRouter();

    
    const [state, formAction, isPending] = useActionState(
        createComment.bind(null, reviewId),
        null
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        },
    });
    
    const onSubmit = (data) => {
        const formData = new FormData();
        
        formData.set("content", data.content);
        
        startTransition(() => {
            formAction(formData);
        });
    };
    
    useEffect(() => {
    if (state?.success) {
            reset();
            router.refresh();
        }
    }, [state, reset, router]);

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
                    {isPending ? "Publicando comentario..." : "Publicar comentario"}
                </Button>
            </div>
        </form>
    );
}