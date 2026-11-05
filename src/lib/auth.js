import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* variables con los nombres de los tokens y su duracion */
const ACCESS_COOKIE = "access";
const REFRESH_COOKIE = "refresh";

const ACCESS_MAX_AGE = 60 * 30; // 30 minutos
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

/* Defino una variable con las opciones de seguridad
para el guardado de los tokens de acess y referesh */
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};

/* FUNCIONES PARA RECUPERAR TOKENS DESDE LAS COOKIES */
export async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_COOKIE)?.value;
}

/* GUARDA LOS TOKENS CON SUS DURACIONES */
export async function setTokens({ access, refresh }) {
    const cookieStore = await cookies();

    cookieStore.set(ACCESS_COOKIE, access, {
        ...cookieOptions,
        maxAge: ACCESS_MAX_AGE,
    });

    cookieStore.set(REFRESH_COOKIE, refresh, {
        ...cookieOptions,
        maxAge: REFRESH_MAX_AGE,
    });
}

/* REFRESCAR TOKENS */
export async function refresh() {
    const refresh = await getRefreshToken()

    let res;

    try {
        if (refresh) {
            res = await fetch(`${API_URL}/api/auth/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({refresh}),
                cache: "no-store",
            });
        }
    } catch {
        return false;
    }

    if (!res.ok) {
        await clearTokens();
        return false;
    }

    const tokens = await res.json();

    await setTokens(tokens)

    return true;
}

/* ELIMINA LOS TOKENS DE LAS COOKIES (logout) */
export async function clearTokens() {
    const cookieStore = await cookies();

    cookieStore.delete(ACCESS_COOKIE);
    cookieStore.delete(REFRESH_COOKIE);
}

/* REQUIRE TOKEN COMO MEDIDA DE PROTECCION PARA PAGINAS O FUNCIONES */
export async function requireToken() {
    const token = await getToken();

    if (!token) {
        redirect("/login");
    }

    return token;
}