import { apiFetch, ENDPOINTS } from "./api";

export async function getUser(userId) {
    const res = await apiFetch(`${ENDPOINTS.users}${userId}/`)

    if (!res.ok) {
        throw new Error("Failed to fetch user")
    }

    const data = await res.json()

    return data
}
