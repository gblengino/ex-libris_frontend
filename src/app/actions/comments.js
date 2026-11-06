"use server";

import { apiFetch, ENDPOINTS } from "@/lib/api";
import { success } from "zod";

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
        return {
            success: false,
            errors: {
                form: ["Ocurrió un error al intentar publicar el comentario."],
            },
        };
    }
}

export async function updateComment(commentId, _prevState, formData) {

    const payload = {
        content: formData.get("content"),
    }

    try {
        const res = await apiFetch(`${ENDPOINTS.comments}${commentId}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            return {
                success: false,
                errors: {
                    form: ["No se pudo editar el comentario."]
                },
            };
        }

        // Si la API devuelve el comentario actualizado, se usa tal cual;
        // si responde sin body (204), se arma con lo que ya se conoce
        let comment = { id: commentId, content: payload.content };
        try {
            const data = await res.json();
            if (data && typeof data === "object") comment = data;
        } catch {
            // respuesta sin JSON: se mantiene el comentario armado arriba
        }

        return {
            success: true,
            errors: {},
            comment,
        }
    } catch (error) {
        return {
            success: false,
            errors: {
                form: ["Ocurrió un error al intentar editar el comentario"]
            }
        }
    }

}

export async function deleteComent(commentId) {
    try {
        const res = await apiFetch(`${ENDPOINTS.comments}${commentId}/`, {
            method: "DELETE",
        })
        if (!res.ok) {
            return {
                success: false,
                errors: {
                    form: ["No se pudo eliminar tu comentario."]
                },
            };
        }

        return {
            success: true,
            errors: ""
        }
    } catch (error) {
        return {
            success: false,
            errors: {
                form: ["Ocurrió un error al intentar borrar tu comentario"]
            }
        }
    }
}