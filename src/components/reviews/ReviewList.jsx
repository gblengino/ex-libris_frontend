import ReviewCard from "./ReviewCard"

export default function ReviewList({reviews, className = "", bookInfo = true}) {

    return (
        <section className={`flex flex-col gap-2 ${className}`}>
            {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} bookInfo={bookInfo}/>
            ))}
        </section>
    )
}