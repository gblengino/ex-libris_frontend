import { getDetailBook } from "@/lib/books"
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { Star, BookOpen } from "lucide-react";

export default async function BookDetail({ id }) {
    
    const book = await getDetailBook(id);

    const {
        title,
        synopsis,
        authors,
        publisher,
        isbn,
        cover, 
        reviews_count,
        average_rating,
        publication_date, 
        genres,
        is_in_reading_list
    } = book

    return (
        <article className="flex gap-3 py-8">
            <div className="relative w-80 shrink-0 aspect-2/3">
                    {cover ? (
                        <Image 
                        src={cover}
                        alt={`Portada de ${title}`}
                        fill
                        sizes="320px"
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
            <div className="relative flex min-w-o flex-1 flex-col">
                <h3 className="font-serif text-4xl font-bold">
                    {title}
                </h3>
                <span className="text-xl font-light text-ink mt-1">
                    {authors.map((author) => author.name).join(", ")}
                </span>
                <hr className="bg-ink/70 my-4"/>
                <h6 className="font-serif text-xl underline">
                    Sinopsis:
                </h6>
                <p className="text-md">
                    {synopsis}
                </p>
                <hr className="bg-ink/70 my-4"/>
                <div className="flex flex-col">
                    <span>
                        {`Editorial: ${publisher.name}`}
                    </span>
                    <span className="text-md text-muted">
                        {publication_date.slice(0, 4)}
                    </span>
                    <span>
                        {`ISBN: ${isbn}`}
                    </span>
                </div>
                <div className="mt-4 flex gap-2">
                    {genres.map((genre) => (
                        <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                </div>
                <div className="mt-auto">
                    {reviews_count !== 0 ? (`Este libro tiene ${reviews_count} reseñas.`) : 
                    (`Aún no hay reseñas, sé el primero en escribir una.`) }
                </div>
                { average_rating !== null ?
                    <div className="absolute top-0 right-0 inline-flex gap-1 
                        items-center text-amber-500 text-xl">
                        {average_rating}/10
                        <Star size={24} className="fill-current"/> 
                    </div> 
                    :
                    <p></p>
                }
            </div>
        </article>
    )
}