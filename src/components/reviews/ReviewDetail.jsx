import { getDetailReview } from "@/lib/reviews";

import Image from "next/image";
import { Star, BookOpen, Heart } from "lucide-react";

import Badge from "../ui/Badge";
import Link from "next/link";
import UserBadge from "../ui/UserBadge";

export default async function ReviewDetail({ id }) {
    
    const review = await getDetailReview(id)

    const {
        user,
        book,
        title,
        content,
        rating,
        likes_count,
        is_liked,
        created_at,
    } = review

    return (
        <article className="flex flex-col gap-2">
            <div className="flex justify-between">
                <Badge>
                    Reseña
                </Badge>
                <span>
                    {created_at.slice(0,10)}
                </span>
            </div>
            <div>
                <h2 className="font-serif font-bold text-4xl">
                    {title}
                </h2>
            </div>
            <div className="inline-flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <UserBadge/>
                    {user.username}
                </div>
                <div className="flex gap-2 items-center text-amber-500">
                    <span className="text-lg">
                        {rating}/10
                    </span>
                    <Star size={20} className="fill-current"/>
                </div>
            </div>
            <hr className="bg-ink/70"/>
            <div className="flex gap-4">
                <div className="relative w-28 shrink-0 aspect-2/3">
                        {book.cover ? (
                            <Image 
                            src={book.cover}
                            alt={`Portada de ${book.title}`}
                            fill
                            sizes="112px"
                            className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center bg-surface 
                            rounded-tl-xl rounded-bl-xl">
                                <BookOpen/>
                            </div>
                        )
                        }
                </div>
                <div className="flex flex-col">
                    <h3 className="font-serif text-2xl font-bold">
                        {book.title}
                    </h3>
                    <span className="text-sm font-light text-ink">
                        {book.authors.map((author) => author.name).join(", ")}
                    </span>
                    <span className="text-xs text-muted">
                        Publicado en {book.publication_date.slice(0, 4)}
                    </span>
                    <Link href={`/books/${book.id}`} className="text-burgundy text-xs
                        hover:underline">
                        Ver libro
                    </Link>
                </div>
            </div>
            <hr className="bg-ink/20"/>
            <div>
                <h4 className="text-xl font-semibold">
                    {title}
                </h4>
                <p className="text-md">
                    {content}
                </p>
            </div>
            <div className="inline-flex items-center gap-2 text-danger">
                <Heart 
                    size={16} 
                    className={is_liked ? "fill-current" : ""}
                />
                <span className="text-lg">
                    {likes_count} Me gusta
                </span>
            </div>
        </article>
    )
}