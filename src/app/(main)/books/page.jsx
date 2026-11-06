import BookCatalog from "@/components/books/catalog/BookCatalog";
import { Suspense } from "react";

export default function BooksPage({ searchParams }) {

    return (
        <div className="mx-auto max-w-screen-2xl px-6">
            <div className="py-4">
                <h1 className="text-3xl font-bold">
                    Catálogo de Libros
                </h1>
                <p className="mt-2 text-ink/70">
                    Explorá nuestro catálogo y descubrí tu próxima lectura.
                </p>
            </div>
            <Suspense fallback={<p>Cargando libros...</p>}>
                <BookCatalog searchParams={searchParams}/>
            </Suspense>
        </div>
    )
}