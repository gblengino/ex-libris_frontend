import { getReviewComments } from "@/lib/reviews"
import Comment from "./comments/Comment"
import CommentForm from "./comments/CommentForm"
import { getCurrentUser } from "@/lib/data"

export default async function ReviewComments({reviewId}) {
    
    const user = await getCurrentUser();
    const comments = await getReviewComments(reviewId);
    
    console.log("User", user)

    return (
        <section className="mt-12 border-t border-ink">
            <h2 className="text-xl font-semibold my-4">Comentarios</h2>
            <div className="max-w-6xl mx-auto">
                { user && 
                <CommentForm reviewId={reviewId}/>
                }
                <hr className="bg-ink my-4" />
                {comments.results.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
            </div>
        </section>
    )
}