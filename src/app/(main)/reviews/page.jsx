
import Container from "@/components/layout/Container";
import BookSearch from "@/components/books/catalog/BookSearch";
import BookFilters from "@/components/books/catalog/BookFilters";
import ReviewCatalog from "@/components/reviews/ReviewCatalog";
import { Suspense } from "react";


export default function ReviewsPage({ searchParams }) {
    
    return (
        <Container>
            <h2 className="text-3xl font-bold">
                Reseñas
            </h2>
            <p className="font-light">
                Aquí encontrarás todas las reseñas de Ex Libris
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 my-8">
                <aside className="lg:sticky lg:top-24 lg:self-start lg:border-r 
                lg:border-outline/20 lg:pr-6 lg:flex lg:flex-col lg:gap-8">
                    <BookSearch/>
                    <BookFilters/>
                </aside>
                <Suspense fallback={<p>Cargando todas las reseñas...</p>}>
                    <ReviewCatalog searchParams={searchParams}/>
                </Suspense>
            </div>
        </Container>
    )
}