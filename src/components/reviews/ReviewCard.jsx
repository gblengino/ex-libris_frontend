import { Star, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ReviewCard({review}) {
    const {
        id,
        user,
        title,
        rating,
        comments_count,
        likes_count,
        is_liked,
        created_at,
    } = review

    return (
        <article className="relative flex flex-col px-12 py-4 rounded-xl bg-surface border
            border-outline/20 shadow-sm transition-all duration-200 ease-out
            hover:-translate-y-1 hover:shadow-md">
            <div className="">
                <h4 className="font-semibold text-2xl text-ink">
                    {title}
                </h4>
            </div>
            <div className="mt-auto flex items-center justify-between">
                <span className="text-sm text-ink/70">
                    Por: {user.username} · {created_at.slice(0,10)}
                </span>
                
            </div>
            <div className="flex gap-2 mt-2 items-center text-amber-500">
                <Star size={24} className="fill-current"/>
                <span className="text-lg text-ink">
                    {rating}/10
                </span>
            </div>
            <div className="transition-transform hover:translate-x-1 self-end">
                <Link 
                    href={`/reviews/${id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold
                    text-burgundy hover:underline"
                >
                    Leer reseña
                    <ArrowRight size={16}/>
                </Link>
            </div>
            <div className="absolute top-4 right-4 inline-flex justify-end gap-1 items-center text-danger">
                <Heart 
                    size={16} 
                    className={is_liked ? "fill-current" : ""}
                />
                <span className="text-lg">
                    {likes_count}
                </span>
            </div>
        </article>
    )
}