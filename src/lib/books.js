
import "server-only";
import { apiFetch, ENDPOINTS } from "./api";

const ALLOWED_PARAMS = [
    "search",
    "genre",
    "author",
    "publisher",
    "ordering",
    "page",
];

export async function getBooks(query = {}) {
    const params = new URLSearchParams();

    for (const key of ALLOWED_PARAMS) {
        const value = query[key];

        if (value !== undefined && value !== null && value !== "") {
            params.set(key, String(value));
        }
    }

    const res = await apiFetch(
        `${ENDPOINTS.books}?${params.toString()}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch books");
    }

    const data = await res.json();

    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results,
    };
}


export async function getDetailBook(id) {
    const res = await apiFetch(`${ENDPOINTS.books}${id}/`)
    
    if (!res.ok) {
        throw new Error("Failed to fetch book");
    }

    const data = await res.json()

    return data
}

export async function getGenres() {
    const params = new URLSearchParams({ page: "1" });

    const res = await apiFetch(
        `${ENDPOINTS.genres}?${params}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch genres");
    }

    const data = await res.json();

    return data.results;
}