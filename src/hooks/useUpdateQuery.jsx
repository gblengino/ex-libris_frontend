"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/**
 * Devuelve una función updateQuery(key, value) que modifica UN parámetro de la URL
 * sin tocar los demás.
 *
 * Cada control (BookSearch, BookFilters, BookToolbar) se encarga de una sola key,
 * y el estado de los filtros vive en la URL: se puede compartir el link, funciona
 * el botón "atrás" y el server component (BookCatalog) lee searchParams y hace el
 * fetch correspondiente.
 *
 * Al cambiar un filtro se elimina "page": si no, se podría quedar en una página
 * que ya no existe para el nuevo conjunto de resultados.
 */

export function useUpdateQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page"); // cambiar un filtro siempre vuelve a la página 1
    router.replace(`${pathname}?${params.toString()}`);
  };
}