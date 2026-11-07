import { Suspense } from "react";
import Container from "@/components/layout/Container";
import ReviewComments from "@/components/reviews/ReviewComments";
import ReviewDetail from "@/components/reviews/ReviewDetail";

async function ReviewPageContent({ params }) {
    const { id } = await params;

    return (
        <>
            <Suspense fallback={<p>Cargando reseña...</p>}>
                <ReviewDetail id={id} />
            </Suspense>
            <Suspense fallback={<p>Cargando comentarios...</p>}>
                <ReviewComments reviewId={id} />
            </Suspense>
        </>
    );
}

export default function ReviewPage({ params }) {
    return (
        <Container>
            <Suspense fallback={<p>Cargando reseña...</p>}>
                <ReviewPageContent params={params} />
            </Suspense>
        </Container>
    );
}