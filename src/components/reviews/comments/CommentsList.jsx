"use client";

import { useCallback, useEffect, useState } from "react";
import Comment from "./Comment";

export default function CommentsList({ initialComments }) {
    const [comments, setComments] = useState(initialComments);

    // Cuando router.refresh() trae comentarios nuevos (por ejemplo, al crear uno),
    // se sincroniza el estado con lo que llega del servidor
    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    const handleDelete = useCallback((commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
    }, []);

    const handleUpdate = useCallback((updated) => {
        setComments((prev) =>
            prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
        );
    }, []);

    return (
        <>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            ))}
        </>
    );
}