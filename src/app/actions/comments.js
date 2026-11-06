"use server";

import { apiFetch, ENDPOINTS } from "@/lib/api";

export async function createComment(reviewId, prevState, formData) {


    const payload = {
        review: Number(reviewId),
        content: formData.get("content"),
    };

    try {
        const response = await apiFetch(ENDPOINTS.comments, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            return {
                success: false,
                errors: {
                    form: ["No se pudo publicar el comentario."],
                },
            };
        }

        return {
            success: true,
            errors: {},
        };

    } catch (error) {
        console.error("Error creating comment:", error);

        return {
            success: false,
            errors: {
                form: ["Ocurrió un error al intentar publicar el comentario."],
            },
        };
    }
}
