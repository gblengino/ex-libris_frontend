import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full self-end bg-footer-background text-[#f5f2eb]">
            <div className="mx-auto max-w-7xl px-6 py-4">
                {/* Marca */}
                <div className="mb-4">
                    <Link href="/" className="flex items-center gap-2">
                        <BookOpen size={28} className="text-burgundy"/>
                        <span className="font-display text-2xl font-bold uppercase">
                            Ex Libris
                        </span>
                    </Link>
                    <p className="mt-3 max-w-md text-sm text-muted">
                        Un espacio para descubrir libros,
                        compartir opiniones y encontrar nuevas historias.
                    </p>
                </div>
                {/* Enlaces */}
                <div className="grid grid-cols-2 gap-8 border-t border-muted py-4">
                    <div>
                        <h3 className="mb-4 font-semibold">Explorar</h3>
                        <ul className="space-y-2 text-sm text-muted">
                            <li>
                                <Link href="/books" className="hover:text-muted hover:underline">
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link href="/reviews" className="hover:text-muted hover:underline">
                                    Reseñas
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 font-semibold">Tu cuenta</h3>
                        <ul className="space-y-2 text-sm text-muted">
                            <li>
                                <Link href="/login" className="hover:text-muted hover:underline">
                                    Iniciar Sesión
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-muted hover:underline">
                                    Crear cuenta
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Copyright */}
                <div className="border-t border-muted pt-6 text-sm text-muted">
                    © 2026 Ex-Libris. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    )
}