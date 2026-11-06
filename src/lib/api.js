import "server-only";

import { getToken, refresh } from "./auth";

export const API_URL = process.env.API_URL;

export const ENDPOINTS = {
    books: "/api/catalog/books/",
    reviews: "/api/reviews/",
    comments: "/api/reviews/comments/",
    readingList: "/api/readinglist/",
    profile: "/api/users/profile/profile/",
    register: "/api/auth/register/"
}

export const PAGE_SIZE = 10;

export async function apiFetch(path, options = {}) {
    const accessToken = await getToken();

    // Funcion para hacer la peticion
    async function request(token) {
        const headers = new Headers(options.headers);

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return fetch(`${API_URL}${path}`, {
            ...options,
            headers,
            cache: options.cache ?? "no-store",
        })
    }

    /* La peticion se realiza 2 veces para refrescar el token
    si la primera vez devuelve un 401 token vencido. */

    const response = await request(accessToken);
    
    /* Si no hay 401 o no hay sesion iniciada, devuelve la
    respuesta normal, no se renueva nada */
    if (response.status !== 401 || !accessToken) {
        return response;
    }

    /* Si sigue, se intenta renovar el token, la funcion refresh()
    hace la renovacion y guarda el Token nuevo en las cookies */
    const refreshed = await refresh();

    if (!refreshed) {
        return response;
    }

    /* Recupera el nuevo token de acceso que refresh() guardo
    en las cookies */
    const newAccessToken = await getToken();
    
    if (!newAccessToken) {
        return response;
    }
    
    // Se reintenta hacer la peticion con el nuevo token
    return request(newAccessToken)

}
