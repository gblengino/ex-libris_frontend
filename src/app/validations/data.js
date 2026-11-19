import { z } from "zod";

export const commentSchema = z.object({
    content: z
        .string()
        .trim()
        .min(1, "El comentario no puede estar vacío.")
        .max(2000, "El comentario no puede superar los 2000 caracteres."),
});

export const reviewSchema = z.object({
    book: z.coerce.number({ message: "Elegí un libro"}).int().positive("Elegí un libro"),
    title: z.string()
        .trim()
        .min(1, "Tu reseña debe tener un título.")
        .max(150, "El título no puede superar los 150 caracteres."),
    content: z.string()
        .trim()
        .min(1, "El comentario no puede estar vacío.")
        .max(2000, "El comentario no puede superar los 2000 caracteres."),
    rating: z.coerce.number({ message: "Elige un puntaje" })
        .int()
        .positive()
        .min(1, "Tu nota debe estar entre el 1 y el 10")
        .max(10,"Tu nota debe estar entre el 1 y el 10")
})