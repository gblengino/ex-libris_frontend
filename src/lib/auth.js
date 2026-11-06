import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ACCESS_COOKIE = "access";
const REFRESH_COOKIE = "refresh";

const ACCESS_MAX_AGE = 60 * 30; // 30 minutos
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};

/* RECUPERAR TOKENS DESDE LAS COOKIES */
export async function getToken() {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_COOKIE)?.value;
}

/* GUARDAR TOKENS (se usa en el login, desde una Server Action o Route Handler) */
export async function setTokens({ access, refresh }) {
    const cookieStore = await cookies();

    cookieStore.set(ACCESS_COOKIE, access, {
        ...cookieOptions,
        maxAge: ACCESS_MAX_AGE,
    });

    if (refresh) {
        cookieStore.set(REFRESH_COOKIE, refresh, {
            ...cookieOptions,
            maxAge: REFRESH_MAX_AGE,
        });
    }
}

/* ELIMINAR TOKENS (logout, desde una Server Action o Route Handler) */
export async function clearTokens() {
    const cookieStore = await cookies();

    cookieStore.delete(ACCESS_COOKIE);
    cookieStore.delete(REFRESH_COOKIE);
}

/* PROTEGER PÁGINAS O FUNCIONES */
export async function requireToken() {
    const token = await getToken();

    if (!token) {
        redirect("/login");
    }

    return token;
}