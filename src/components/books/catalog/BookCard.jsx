import { ArrowRight, BookOpen } from "lucide-react"
import Badge from "../../ui/Badge"
import Link from "next/link"
import Image from "next/image"

export default function BookCard({book}){
    const { id, 
        title, 
        authors,
        genres, 
        reviews_count, 
        publication_date, 
        cover, 
        is_in_reading_list
    } = book

    return (
        <article className="flex gap-3 rounded-xl border-ink/30 shadow-md border
            transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="relative w-28 shrink-0 aspect-2/3">
                    {cover ? (
                        <Image 
                        src={cover}
                        alt={`Portada de ${title}`}
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
            <div className="flex min-w-o flex-1 flex-col py-2 pr-4">
                <h6 className="font-serif text-xl font-semibold line-clamp-2">
                    {title}
                </h6>
                <span className="text-sm font-light text-ink">
                    {authors.map((author) => author.name).join(", ")}
                </span>
                <span className="text-xs text-muted">
                    {publication_date.slice(0, 4)}
                </span>
                <div className="mt-1">
                    {genres.map((genre) => (
                        <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                </div>
                <div className="mt-auto ml-auto">
                    <Link href={`/books/${id}`} className="inline-flex items-center gap-2
                    text-xs font-semibold text-burgundy hover:underline transition-transform
                    hover:translate-x-1">
                        Ver libro
                        <ArrowRight size={16}/>
                    </Link>
                </div>
            </div>
        </article>
    )
}