import UserBadge from "@/components/ui/UserBadge"
import { Heart } from "lucide-react"

export default function Comment({comment}){
    const {
        user,
        content,
        likes_count,
        is_liked,
        created_at,
    } = comment

    return (
        <div className="w-full flex flex-col gap-2 my-6">
            <div className="inline-flex gap-1 items-center">
                <UserBadge/>
                {user.username}
            </div>
            <div>
                <p>{content}</p>
            </div>
            <div className="inline-flex gap-1 items-center justify-between">
                <div className="inline-flex items-center gap-1 text-danger">
                    <Heart size={16} className={`${is_liked ? 'fill-current' : ''}`}/>
                    {likes_count}
                </div>
                {created_at.slice(0,10)}
            </div>
        </div>
    )
}