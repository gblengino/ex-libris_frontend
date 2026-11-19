import "server-only"
import { apiFetch, ENDPOINTS } from "./api"

const ALLOWED_PARAMS = ["search", "genre", "author", "publisher", "orgering", "page"];

export async function getBooks(query = {}) {

    const params = new URLSearchParams();
    for (const key of ALLOWED_PARAMS) {
        if (query[key]) params.set(key, query[key]);
    }

    const res = await apiFetch(`${ENDPOINTS.books}?${params}`)
    
    if (!res.ok) {
        throw new Error("Failed to fetch bookss");
    }

    const data = await res.json()

    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results,
    }
}

export async function getDetailBook(id) {
    const res = await apiFetch(`${ENDPOINTS.books}${id}/`)
    
    if (!res.ok) {
        throw new Error("Failed to fetch book");
    }

    const data = await res.json()

    return data
}