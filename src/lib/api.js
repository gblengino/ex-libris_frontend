import "server-only";

import { getToken } from "./auth";

export const API_URL = process.env.API_URL;

export const ENDPOINTS = {
    books: "/api/catalog/books/",
    reviews: "/api/reviews/",
    comments: "/api/comments/",
    readingList: "/api/readinglist/",
    profile: "/api/users/profile/profile/",
    register: "/api/auth/register/",
};

export const PAGE_SIZE = 10;

/* El refresh del token lo hace middleware.js antes de renderizar,
así que acá solo se lee el access token vigente. */
export async function apiFetch(path, options = {}) {
    const token = await getToken();
    const headers = new Headers(options.headers);

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        cache: options.cache ?? "no-store",
    });
}