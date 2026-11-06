import "server-only"
import { apiFetch, ENDPOINTS } from "./api"

export async function getLatestReviews() {
    const res = await apiFetch(ENDPOINTS.reviews)
    
    if (!res.ok) {
        throw new Error("Failed to fetch latest reviews");
    }

    const data = await res.json()

    return data.results.slice(0, 3)
}

export async function getBookReviews(bookId, page = 1) {

    const params = new URLSearchParams({
        book: String(bookId),
        page: String(page)
    })

    const res = await apiFetch(`${ENDPOINTS.reviews}?${params}`)
    
    if (!res.ok) {
        throw new Error("Failed to fetch latest reviews");
    }

    const data = await res.json()

    return {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results,
    }
}