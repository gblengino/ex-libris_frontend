"use server";

import { redirect } from "next/navigation";
import { setTokens, getRefreshToken, clearTokens } from "@/lib/auth";
import { refresh } from "next/cache";
import { API_URL, ENDPOINTS } from "@/lib/api";

export async function login(_prevState, formData) {
    const credentials = {
        username: formData.get("username"),
        password: formData.get("password"),
    };

    let res;

    try {
        res = await fetch(`${API_URL}/api/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            cache: "no-store",
        });
    } catch {
        return { error: "No se pudo conectar con el servidor." };
    }

    if (res.status === 401) {
        return { error: "Usuario o contraseña incorrectos." };
    }

    if (!res.ok) {
        return { error: "No se pudo iniciar sesión." };
    }

    const tokens = await res.json();

    await setTokens(tokens);

    refresh();
    redirect("/");

}

export async function logout() {
    const refresh = await getRefreshToken();

    try {
        if (refresh) {
            await fetch(`${API_URL}/api/auth/logout/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({refresh}),
                cache: "no-store",
            });
        }
    } finally {
        /* Finally para eliminar las cookies locales incluso
        si la peticion falla, haciendo efectivo el logout. */
        await clearTokens();
    }

    redirect("/login");
}

export async function register(_prevState, formData) {

    const newUser = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        password2: formData.get("password2"),
    }

    let res;

    try {
        res = await fetch(`${API_URL}${ENDPOINTS.register}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
            cache: "no-store",
        });
    } catch {
        return { error: "No se pudo conectar al servidor."}
    }

    const data = await res.json();

    if (!res.ok) {
        return {
            errors: data,
            error: "No se pudo crear la cuenta. Revisa los datos ingresados."
        }
    }

    redirect("login");
}
