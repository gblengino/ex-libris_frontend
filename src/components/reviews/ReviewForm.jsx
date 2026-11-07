"use client";
import { startTransition, useActionState, useState, } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import BookCombobox from "@/components/reviews/BookComboBox";
import { createReview, updateReview } from "@/app/actions/reviews";
import { reviewSchema } from "@/app/validations/data";
import { BookOpen } from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";
import Input from "../ui/Input";
import RatingInput from "../ui/RatingInput";
import TextArea from "../ui/TextArea";

export default function ReviewForm({ initialBook = null, initialData = null}) {
    const [book, setBook] = useState(initialBook);

    const isEditing = Boolean(initialData);

    const action = isEditing
    ? updateReview.bind(null, initialData.id)
    : createReview

    const initialState = {
        success: false,
        errors: {}
    };

    const [state, formAction, isPending] = useActionState(
        action,
        initialState
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            book: initialBook?.id ?? initialData?.book ?? null,
            title: initialData?.title ?? "",
            content: initialData?.content ?? "",
            rating: initialData ? String(initialData.rating) : "",
        }
    })

    function selectBook(b) {
        setBook(b);
        setValue("book", b?.id ?? null, { shouldValidate: true });
    }

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.set("book", data.book)
        formData.set("title", data.title);
        formData.set("content", data.content);
        formData.set("rating", data.rating);

        startTransition(() => {
            formAction(formData);
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {book ? (
                <div className="relative flex-1 flex w-full gap-2 bg-surface rounded-xl">
                    <div className="relative w-28 shrink-0 aspect-2/3">
                        {book.cover ? (
                            <Image 
                            src={book.cover}
                            alt={`Portada de ${book.title}`}
                            fill
                            sizes="112px"
                            className="object-cover rounded-tl-xl rounded-bl-xl"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center bg-surface 
                            rounded-tl-xl rounded-bl-xl">
                                <BookOpen/>
                            </div>
                        )
                        }
                    </div>
                    <div className="flex flex-col justify-start py-2">
                        <p className="text-2xl">Reseña de <span className="font-bold">{book.title}</span></p>
                        <p className="text-sm text-muted">{`(${book.publication_date.slice(0,4)})`}</p>
                        <p className="text-sm mt-auto">
                            Autor/es: <span className="font-semibold">{book.authors.map((author) => author.name).join(", ")}</span>
                        </p>
                    </div>
                    {!isEditing && (
                        <Button 
                            onClick={() => selectBook(null)}
                            className="absolute bottom-0 right-0"
                            type="button"
                        >
                            Cambiar libro
                        </Button>
                    )}
                </div>
            ) : (
                <BookCombobox onSelect={selectBook}/>
            )}
            {errors.book && <p className="text-sm text-red-400" role="alert">{errors.book.message}</p>}
            <Input
                id="title"
                label="Título (max. 150 caracteres)"
                placeholder="Ponle título a tu reseña"
                error={errors.title?.message || state?.errors?.title?.[0]}
                {...register("title")}
            />
            <RatingInput register={register} error={errors.rating?.message} className="self-center"/>
            <TextArea
                id="content"
                label="Contenido"
                placeholder="Redacta tu reseña aquí"
                rows={8}
                maxLength={2000}
                error={errors.content?.message || state?.errors?.content?.[0]}
                disabled={isPending}
                {...register("content")}
            />
            {state?.errors?.general && (
                <p className="text-sm text-red-400" role="alert">
                    {state.errors.general[0]}
                </p>
            )}
            <Button
                type="submit"
                loading={isPending}
                className="self-center"
            >
                {isPending 
                    ? (isEditing ? "Guardando cambios..." : "Publicando reseña...")
                    : (isEditing ? "Guardar cambios" : "Publicar reseña")
                }
            </Button>
        </form>
    )
}