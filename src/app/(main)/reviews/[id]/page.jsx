import Container from "@/components/layout/Container";
import ReviewComments from "@/components/reviews/ReviewComments";
import ReviewDetail from "@/components/reviews/ReviewDetail";
import { Suspense } from "react";

async function ReviewPageContent({params}) {

    const id = await params

    return (
        <Container>
            <Suspense fallback={<p>Cargando reseña...</p>}>
                <ReviewDetail id={id.id} />
            </Suspense>
            <Suspense fallback={<p>Cargando comentarios...</p>}>
                <ReviewComments reviewId={id.id}/>
            </Suspense>
        </Container>
    )
}

export default function ReviewPage({params}) {
    return (
        <Suspense fallback={<p>Cargando página de reseña...</p>}>
            <ReviewPageContent params={params}/>
        </Suspense>
    )
}