"use server";

import { redirect } from "next/navigation";
import { apiFetch, ENDPOINTS } from "@/lib/api";
import { reviewSchema } from "../validations/data";
import { revalidatePath } from "next/cache";

export async function createReview(_prevState, formData) {
    const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    let review;
    try {
        const res = await apiFetch(ENDPOINTS.reviews, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
        });

        if (res.status === 400) {
            // DRF devuelve { campo: [msgs], non_field_errors: [msgs] }
            const { non_field_errors, ...fieldErrors } = await res.json();
            return {
                success: false,
                errors: {
                    ...fieldErrors,
                    general: non_field_errors ?? ["Revisá los datos ingresados"],
                },
            };
        }

        if (res.status === 401 || res.status === 403) {
            return { success: false, errors: { general: ["Tenés que iniciar sesión para publicar una reseña"] } };
        }

        if (!res.ok) {
            return { success: false, errors: { general: ["No se pudo publicar la reseña"] } };
        }

        review = await res.json();
    } catch {
        return { success: false, errors: { general: ["Error de conexión"] } };
    }

  redirect(`/reviews/${review.id}`);
}

export async function updateReview(reviewId, prevState, formData) {
    const parsed = reviewSchema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
        return { success: false, errors: parsed.error.flatten().fieldErrors };
    }

    // El libro de una review no se cambia al editar
    const { book, ...data } = parsed.data;

    try {
        const res = await apiFetch(`${ENDPOINTS.reviews}${reviewId}/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.status === 400) {
            const { non_field_errors, ...fieldErrors } = await res.json();
            return {
                success: false,
                errors: {
                    ...fieldErrors,
                    general: non_field_errors ?? ["Revisá los datos ingresados"],
                },
            };
        }

        if (res.status === 401 || res.status === 403) {
            return { success: false, errors: { general: ["No tenés permiso para editar esta reseña"] } };
        }

        if (res.status === 404) {
            return { success: false, errors: { general: ["La reseña ya no existe"] } };
        }

        if (!res.ok) {
            return { success: false, errors: { general: ["No se pudo actualizar la reseña"] } };
        }
    } catch {
        return { success: false, errors: { general: ["Error de conexión"] } };
    }

    redirect(`/reviews/${reviewId}`);
}

export async function deleteReview(reviewId) {
    try {
        const res = await apiFetch(`${ENDPOINTS.reviews}${reviewId}/`, {
            method: "DELETE",
        });

        if (res.status === 401 || res.status === 403) {
            return { success: false, error: "No tenés permiso para borrar esta reseña" };
        }

        if (res.status === 404) {
            return { success: false, error: "La reseña ya no existe" };
        }

        if (!res.ok) {
            return { success: false, error: "No se pudo borrar la reseña" };
        }
    } catch {
        return { success: false, error: "Error de conexión" };
    }

    revalidatePath("/reviews");
    revalidatePath("/profile");
    redirect("/profile");
}