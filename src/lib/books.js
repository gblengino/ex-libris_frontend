import "server-only"
import { apiFetch, ENDPOINTS } from "./api"

export async function getBooks(page = 1) {

    const params = new URLSearchParams({
        page: String(page),
    })

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