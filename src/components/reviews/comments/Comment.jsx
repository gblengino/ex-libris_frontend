"use client"

import { useActionState, useState, useEffect } from "react"
import { useAuth } from "@/components/providers/AuthProvider"

import { Heart, Edit, X } from "lucide-react"
import UserBadge from "@/components/ui/UserBadge"
import CommentForm from "./CommentForm"
import { deleteComent } from "@/app/actions/comments"
import Button from "@/components/ui/Button"

export default function Comment({comment, onDelete, onUpdate}){
    
    const {
        id,
        user: commentUser,
        content,
        likes_count,
        is_liked,
        created_at,
    } = comment

    const [isEditing, setIsEditing] = useState(false)

    const initialState = {
        success: false,
        errors: {},
    };

    const [state, formAction, isPending] = useActionState(
        deleteComent.bind(null, id),
        initialState
    )

    useEffect(() => {
        if (state.success) {
            onDelete?.(comment.id);
        }
    }, [state.success, onDelete, comment.id]);

    const { user: authUser } = useAuth();
    const isAuthor = authUser?.id === commentUser.id

    return (
        <div className="w-full flex flex-col gap-2 my-6">
            { isEditing ? (
                <CommentForm
                    initialData={comment}
                    onSuccess={(updated) => {
                        if (updated) onUpdate?.({ ...comment, ...updated, id: id });
                        setIsEditing(false)
                    }}
                />
            ) : (
            <>
                <div className="flex justify-between">
                    <div className="inline-flex gap-1 items-center">
                        <UserBadge/>
                        {commentUser.username}
                    </div>
                    { isAuthor && 
                    <div className="inline-flex gap-1 items-center text-sm text-burgundy">
                        <Button onClick={()=> setIsEditing(true)} variant="outline" size="xs">
                            <Edit size={16}/>
                            Editar
                        </Button>
                        <form action={formAction}>
                            <Button type="submit" variant="danger" loading={isPending}
                            size="xs">
                                <X size={16}/>
                                Eliminar
                            </Button>
                        </form>
                    </div>
                    }
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
            </>)
            }
        </div>
    )
}