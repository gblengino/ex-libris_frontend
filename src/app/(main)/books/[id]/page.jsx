import BookDetail from "@/components/books/detail/BookDetail"
import BookReviews from "@/components/books/detail/BookReviews"
import Container from "@/components/layout/Container"
import { Suspense } from "react"

async function BookPageContent({params}) {
    
    const id = await params

    return (
        <Container>
            <Suspense fallback={<p>Cargando información del libro...</p>}>
                <BookDetail id={id.id}/>
            </Suspense>
            <Suspense fallback={<p>Cargando reseñas del libro...</p>}>
                <BookReviews id={id.id}/>
            </Suspense>
        </Container>
    )
}

export default function BookPage({params}) {
    return (
        <Suspense fallback={<p>Cargando página del libro</p>}>
            <BookPageContent params={params}/>
        </Suspense>
    )
}