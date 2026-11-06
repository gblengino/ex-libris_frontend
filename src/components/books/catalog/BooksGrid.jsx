import BookCard from "./BookCard";

export default function BooksGrid({books}){

    return(
    <section className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {books.map((book) => (
            <BookCard key={book.id} book={book} />
        ))}
    </section>
    )
}