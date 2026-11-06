import { LibraryBig, BookOpen, MessagesSquare } from "lucide-react"
import StepCard from "./StepCard"

export default function HowItWorks() {
    return (
        <section className="w-full flex flex-col gap-2">
            <article className="w-full text-center">
                <h4 className="text-xl">Cómo funciona</h4>
                <h3 className="text-3xl font-serif">Del registro a la crítica en tres pasos</h3>
            </article>
            <article className="w-full grid md:grid-cols-3 gap-8 md:gap-12">
                <StepCard 
                    icon={LibraryBig}
                    number={1}
                    title="Catalogá tu Biblioteca"
                    description="Creá tu catálogo personal y hacé un seguimiento de tus lecturas."
                />
                <StepCard 
                    icon={BookOpen}
                    number={2}
                    title="Descubrí nuevos libros"
                    description="Explorá obras y autores para encontrar tu próxima lectura"
                />
                <StepCard 
                    icon={MessagesSquare}
                    number={3}
                    title="Compartí tus opiniones"
                    description="Escribí reseñas y compartí tus experiencias literarias."
                />
            </article>
        </section>
    )
}