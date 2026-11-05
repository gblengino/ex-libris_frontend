import { Star, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingReviewCard({ review }) {

    const { id, user, book, title, rating, likes_count, is_liked } = review;

    return (
        <article className="flex flex-col p-6 rounded-xl bg-surface border
            border-outline/20 shadow-sm transition-all duration-200 ease-out
            hover:-translate-y-1 hover:shadow-md">
            {/* Libro */}
            <div className="flex gap-4">
                <img 
                    src={book.cover} 
                    alt={`Portada de ${book.title}`} 
                    className="w-16 aspect-2/3 object-cover rounded-md"
                />
                <div className="w-full">
                    <div className="w-full flex justify-between items-center">
                        <div className="flex flex-col">
                            <h3 className="font-serif font-bold text-lg text-ink">
                                {book.title}
                            </h3>
                            <p className="text-sm text-ink/70">
                                {book.authors.map((author) => author.name).join(", ")}
                            </p>
                        </div>
                        <div className="flex gap-2 text-gold">
                            <span className="text-sm text-ink/70">
                                {rating}/10
                            </span>
                            <Star size={16} className="fill-current"/>
                        </div>
                    </div>
                    <div className="flex justify-end gap-1 items-center text-danger">
                        <Heart 
                            size={16} 
                            className={is_liked ? "fill-current" : ""}
                        />
                        <span className="text-sm">
                            {likes_count}
                        </span>
                    </div>
                </div>
            </div>
            {/* Reseña */}
            <div className="mt-5">
                <h4 className="font-semibold text-ink mb-2">
                    {title}
                </h4>
            </div>
            {/* Autor y estadisticas */}
            <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-sm text-ink/70">
                    Autor/a: {user.username}
                </span>
                <div className="transition-transform hover:translate-x-1">
                    <Link 
                        href={`/reviews/${id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold
                        text-burgundy hover:underline"
                    >
                        Leer reseña
                        <ArrowRight size={16}/>
                    </Link>
                </div>
            </div>
        </article>
    )
}