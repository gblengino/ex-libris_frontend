import { getReviews } from "@/lib/reviews";
import { PAGE_SIZE } from "@/lib/api";
import Paginator from "../ui/Paginator";
import ReviewList from "./ReviewList";

export default async function ReviewCatalog({ searchParams }) {
    const query = await searchParams;
    const page = Math.max(1, Number(query.page) || 1);

    const reviews = await getReviews(page)

    const totalPages = Math.ceil(reviews.count / PAGE_SIZE)

    return (
        <div>
            <ReviewList reviews={reviews.results}/>
            <Paginator 
                currentPage={page}
                totalPages={totalPages}
                basePath="/reviews"
                queryParams={query}
            />
        </div>
    )
}