import Container from "@/components/layout/Container"
import UserProfileCard from "@/components/profile/UserProfileCard"
import ReviewList from "@/components/reviews/ReviewList"

import { getUserReviews } from "@/lib/reviews"
import { getUser } from "@/lib/users"
import { Suspense } from "react"

async function ProfilePageContent({ params }) {
    
    const id = await params
    const user = await getUser(id.id)
    const reviews = await getUserReviews(id.id)

    return (
        <Container>
            <Suspense fallback={<p>Cargando perfil de usuario...</p>}>
                <UserProfileCard user={user}/>
            </Suspense>
            <section className="flex flex-col">
                <div className=" bg-ink/70 w-[10%] self-center h-px"/>
                <div className="my-4">
                    <h3 className="text-2xl font-bold text-center">Reseñas de {user.username}</h3>
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

export default function ProfilePage({ params }) {
    return (
        <Suspense fallback={<p>Cargando página de usuario...</p>}>
            <ProfilePageContent params={params}/>
        </Suspense>
    )
}