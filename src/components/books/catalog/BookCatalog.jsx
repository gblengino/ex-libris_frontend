import { getBooks } from "@/lib/books";
import BookFilters from "./BookFilters";
import BookSearch from "./BookSearch";
import BooksGrid from "./BooksGrid";
import BookToolbar from "./BookToolbar";
import { PAGE_SIZE } from "@/lib/api";
import Paginator from "@/components/ui/Paginator";

export default async function BookCatalog({ searchParams }) {

    const query = await searchParams;
    const page = Math.max(1, Number(query.page) || 1);

    const books = await getBooks(page)

    const totalPages = Math.ceil(books.count / PAGE_SIZE)

    return(
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8">
            <aside className="lg:sticky lg:top-24 lg:self-start lg:border-r 
            lg:border-outline/20 lg:pr-6">
                <BookFilters/>
            </aside>

            <section>
                <div className="flex justify-between">
                    <h3 className="font-semibold text-xl">
                        Resultados del catálogo
                    </h3>
                    <span className="font-extralight text-sm">
                        {books.count} libros
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                        <BookSearch/>
                    </div> 
                    <div className="shrink-0">
                        <BookToolbar/>
                    </div>
                </div>
                <div className="py-8">
                    <BooksGrid books={books.results}/>
                </div>
                <div className="mb-6">
                    <Paginator 
                        currentPage={page}
                        totalPages={totalPages}
                        basePath="/books"
                        queryParams={query}
                    />
                </div>
            </section>
        </div>
    )
}