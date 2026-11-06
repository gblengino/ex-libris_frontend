
import ReviewList from "@/components/reviews/ReviewList";
import { getBookReviews } from "@/lib/reviews";

export default async function BookReviews({ id }) {
    
    const reviews = await getBookReviews(id)
    
    return (
        <article>
            <h2 className="text-center text-2xl">Reseñas</h2>
            <ReviewList reviews={reviews.results} bookInfo={false} className="mt-4 mb-8"/>
        </article>
    )
}