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