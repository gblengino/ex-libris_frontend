import { NextResponse } from "next/server";
import { getBooks } from "@/lib/books";

/**
 * Route Handler: proxy (BFF) entre el navegador y la API de Django.
 *
 *   Navegador --> /api/books?search=x (Next, servidor) --> /books/?search=x (Django)
 *
 * Por qué existe:
 * - El token vive en una cookie httpOnly: el JavaScript del navegador no puede leerlo,
 *   solo el servidor. El handler lo agrega al llamar a la API (vía getBooks -> apiFetch).
 * - Evita CORS: el navegador solo le habla a su propio origen.
 * - Centraliza validación (whitelist de getBooks) y manejo de errores.
 *
 * Sin barra final en la ruta: Next redirige las URLs con barra final, lo que
 * agregaría un redirect innecesario en cada búsqueda.
 */

export async function GET(request) {
  const query = Object.fromEntries(request.nextUrl.searchParams);

  try {
    const books = await getBooks(query); // la whitelist de getBooks filtra los params
    return NextResponse.json(books);
  } catch {
    return NextResponse.json({ results: [] }, { status: 502 });
  }
}