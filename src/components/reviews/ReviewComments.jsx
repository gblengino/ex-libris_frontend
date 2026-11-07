import { getCurrentUser } from "@/lib/data"
import { getReviewComments } from "@/lib/reviews"
import CommentForm from "./comments/CommentForm"
import CommentsList from "./comments/CommentsList";

export default async function ReviewComments({reviewId}) {
    
    const user = await getCurrentUser();
    const comments = await getReviewComments(reviewId);
    
    return (
        <section className="mt-12 border-t border-ink">
            <h2 className="text-xl font-semibold my-4">Comentarios</h2>
            <div className="max-w-6xl mx-auto">
                { user && 
                <CommentForm reviewId={reviewId}/>
                }
                <hr className="bg-ink my-4" />
                <CommentsList initialComments={comments.results}/>
            </div>
        </section>
    )
}