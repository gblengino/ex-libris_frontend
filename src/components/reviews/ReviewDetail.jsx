import { getDetailReview } from "@/lib/reviews";
import { getCurrentUser } from "@/lib/data";

import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, BookOpen, Heart, Edit } from "lucide-react";

import Badge from "../ui/Badge";
import Link from "next/link";
import UserBadge from "../ui/UserBadge";
import LinkButton from "../ui/LinkButton";
import DeleteReviewButton from "./DeleteReviewButton";

export default async function ReviewDetail({ id }) {
    
    const review = await getDetailReview(id)
    
    if (!review) {
        notFound();
    }
    
    const user = await getCurrentUser();

    const {
        user: author,
        book,
        title,
        content,
        rating,
        likes_count,
        is_liked,
        created_at,
    } = review

    const isAuthor = user?.id === author.id

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
                    {author.username}
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
            <div className="flex justify-between">
                <div className="inline-flex items-center gap-2 text-danger">
                    <Heart 
                        size={16} 
                        className={is_liked ? "fill-current" : ""}
                    />
                    <span className="text-lg">
                        {likes_count} Me gusta
                    </span>
                </div>
                <div>
                    { isAuthor && (
                        <div className="flex gap-2">
                            <LinkButton size="sm" variant="outline" href={`/reviews/${id}/edit`}>
                                <Edit/>
                                Editar
                            </LinkButton>
                            <DeleteReviewButton reviewId={id}/>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}