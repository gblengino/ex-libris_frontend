import Image from "next/image";
import LinkButton from "../ui/LinkButton";

export default function Hero() {
    return (
        <section className="w-full grid items-center gap-10 md:grid-cols-2 py-8">
            <article className="flex flex-col gap-2">
                <h3 className="font-serif font-bold text-4xl">
                    La plataforma para la crítica y el análisis literario de fondo.
                </h3>
                <p className="">
                    Catalogá tu biblioteca, redactá y compartí reseñas sobre tus libros
                    favoritos y conectate con una comunidad de lectura reflexiva.
                </p>
                <div className="flex gap-2 mt-4">
                    <LinkButton href="/register">
                        Registrarse Gratis
                    </LinkButton>
                    <LinkButton href="/reviews" variant="outline">
                        Explorar reseñas
                    </LinkButton>
                </div>
            </article>
            <article>
                <Image 
                src="/images/book_hero.png"
                alt="Ilustración de Ex Libris"
                width={1200}
                height={900}
                priority
                className="h-auto w-full object-contain"
                />
            </article>
        </section>
    )
}