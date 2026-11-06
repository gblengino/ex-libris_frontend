import "server-only";

import { apiFetch, ENDPOINTS } from "./api";

export async function getCurrentUser() {
    const response = await apiFetch(ENDPOINTS.profile)

    if (!response.ok) {
        if (response.status === 401) return null;

        throw new Error("Failed to fetch current user");
    }

    return response.json();
}

async function list(path) {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    let page = 1;
    let all = [];
    while (true) {
        const res = await fetch(`${API_URL}${path}?page=${page}`, { headers, cache: "no-store" });
        if (!res.ok) throw new Error(`La API respondió ${res.status} en ${path}`)
        const data = await res.json()
        if (Array.isArray(data)) return data;
        all = all.concat(data.results ?? []);
        if (!data.next) return all;
        page += 1;
    }
}