import Container from "@/components/layout/Container";
import MyProfileCard from "@/components/profile/MyProfileCard";
import ReviewList from "@/components/reviews/ReviewList";
import { requireToken } from "@/lib/auth";
import { getCurrentUser } from "@/lib/data";
import { getUserReviews } from "@/lib/reviews";

export default async function MyProfile() {

    await requireToken();

    const user = await getCurrentUser();
    const reviews = await getUserReviews(user.id);

    return (
        <Container>
            <MyProfileCard/>
            <section className="flex flex-col">
                <div className=" bg-ink/70 w-[10%] self-center h-px"/>
                <div className="my-4">
                    <h3 className="text-2xl font-bold text-center">Tus reseñas</h3>
                    <ReviewList 
                        reviews={reviews.results}
                        bookInfo={true}
                        className="mt-4 mb-18"
                    />
                </div>
            </section>
        </Container>
    )
}