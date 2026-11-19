import Container from "@/components/layout/Container";
import ReviewForm from "@/components/reviews/ReviewForm";
import { getDetailBook } from "@/lib/books";
import { Suspense } from "react";
import { requireToken } from "@/lib/auth";

async function CreateReviewContent({ searchParams }) {

    const { book } = await searchParams;
    
    let initialBook = null;
    if (book) {
        try {
            initialBook = await getDetailBook(book);
        } catch {
            initialBook = null;
        }
    }

    return (
        <Container className="pt-4 py-8">
            <ReviewForm initialBook={initialBook}/>
        </Container>
    )
}

export default async function CreateReviewPage({ searchParams }) {

    await requireToken();

    return(
        <Suspense fallback={<p>Cargando...</p>}>
            <CreateReviewContent searchParams={searchParams} />
        </Suspense>
    )

}