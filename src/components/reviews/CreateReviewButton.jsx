import { getCurrentUser } from "@/lib/data";
import LinkButton from "@/components/ui/LinkButton";
import { Plus } from "lucide-react";

export default async function CreateReviewButton({bookId = null}) {
    const user = await getCurrentUser();

    if (!user) return null;

    return (
        <LinkButton href={`/reviews/create${bookId ? `/${bookId}` : ""}`} className="inline-flex" size="md">
            <Plus size={20} />
            Creá tu reseña
        </LinkButton>
    );
}