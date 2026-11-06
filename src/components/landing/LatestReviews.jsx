import { getLatestReviews } from "@/lib/reviews";
import LandingReviewCard from "./LandingReviewCard";
import Link from "next/link";

export default async function LatestReviews() {
    const reviews = await getLatestReviews()
    
    if (!reviews.length) {
        return null;
    }

    return (
        <section className="py-16">
            <div className="text-center">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-ink">
                    Últimas reseñas
                </h2>
                <p className="text-ink/70 mt-3">
                    Descubrí qué está leyendo y recomendando nuestra comunidad.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                {reviews.map((review) => (
                    <LandingReviewCard
                        key={review.id}
                        review={review}
                    />
                ))}
            </div>
            <div className="flex justify-end mt-8">
                <Link href="/reviews" className="transition-transform hover:translate-x-1">
                    Ver todas las reseñas →
                </Link>
            </div>
        </section>
    )
}