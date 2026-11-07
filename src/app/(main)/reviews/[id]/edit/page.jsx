import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import Container from "@/components/layout/Container";
import ReviewForm from "@/components/reviews/ReviewForm";
import { requireToken } from "@/lib/auth";
import { getCurrentUser } from "@/lib/data";
import { getDetailReview } from "@/lib/reviews";

async function EditReviewContent({ params }) {
    await requireToken();

    const { id } = await params;

    const [user, review] = await Promise.all([
        getCurrentUser(),
        getDetailReview(id),
    ]);

    if (!review) notFound();
    if (!user || review.user.id !== user.id) redirect(`/reviews/${id}`);

    return <ReviewForm initialBook={review.book} initialData={review} />;
}

export default function EditReviewPage({ params }) {
    return (
        <Container>
            <h1 className="mb-6 text-3xl font-bold">Editar reseña</h1>
            <Suspense fallback={<p>Cargando...</p>}>
                <EditReviewContent params={params} />
            </Suspense>
        </Container>
    );
}