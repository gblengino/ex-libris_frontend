/**
 * Funciones de fetch para usar desde COMPONENTES CLIENTE.
 *
 * No pueden usar apiFetch (depende de cookies() del servidor). En cambio le hablan
 * al Route Handler propio de Next (/api/...), que actúa de proxy hacia la API real.
 * Convención del proyecto: apiFetch en el servidor, fetch a /api/... en el cliente.
 *
 * Este archivo no lleva "use client" ni "server-only": no tiene lugar fijo, corre
 * donde lo importe quien lo use (acá, el navegador, vía BookCombobox).
 */

/**
 * Busca libros por título para el autocomplete.
 * param {string} query  Texto ya "debounced" que escribió el usuario.
 * param {AbortSignal} signal  Permite cancelar el request si el usuario sigue escribiendo.
 */

export async function searchBooks(query, signal) {
  const params = new URLSearchParams({ search: query });
  const res = await fetch(`/api/books?${params}`, { signal });
  if (!res.ok) throw new Error("Failed to search books");
  const data = await res.json();
  return data.results;
}