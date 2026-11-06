"use client"

import { useState } from "react"

import Link from "next/link"
import { useAuth } from "../providers/AuthProvider"

import { ThemeToggleButton } from "../ui/ThemeToggleButton"
import { Menu, X, BookOpen } from "lucide-react"
import { logout } from "@/app/actions/auth"

import Container from "./Container"
import Button from "../ui/Button"
import LinkButton from "../ui/LinkButton"

export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const handleLogout = async () => {
        await logout();
    }

    return (
        <header className="w-full h-18">
            <Container className="relative flex justify-between py-4 px-8">
                <nav className="flex flex-1 gap-5 items-center">
                    <Link href="/" className="flex gap-2 items-center">
                        <BookOpen size={30} className="text-burgundy"/>
                        <h1 className="text-3xl md:text-4xl font-bold uppercase font-display">
                            Ex Libris
                        </h1>
                    </Link>
                    <div className="hidden md:flex gap-5 px-8 items-center justify-start">
                        <Link href="/books" 
                        className="text-ink transition-colors duration-200
                        hover:text-burgundy focus-visible:outline-2 focus-visible:outline-gold">
                            Catálogo
                        </Link>
                        <Link href="/reviews"
                        className="text-ink transition-colors duration-200
                        hover:text-burgundy focus-visible:outline-2 focus-visible:outline-gold">
                            Reseñas
                        </Link>
                    </div>
                </nav>
                <div className="px-2">
                    <ThemeToggleButton/>
                </div>

                {/* Auth Desktop */}
                { isAuthenticated ? (
                    <div className="hidden md:flex items-center">
                        <Button onClick={handleLogout} variant="danger">
                            Cerrar sesión
                        </Button>
                    </div>
                ) : (
                <div className="hidden md:flex gap-4 items-center">
                    <LinkButton href="/login" variant="outline">
                        Iniciar Sesión
                    </LinkButton>
                    <LinkButton href="/register">
                        Crear Cuenta
                    </LinkButton>
                </div>
                )}
                {/* Boton hamburger para mobile */}
                <button className="md:hidden" aria-label="Abrir menú"
                onClick={()=> setIsMenuOpen(!isMenuOpen)} >
                    {isMenuOpen === true ? <X size={24}/> : <Menu size={24}/>}
                </button>

                {/* Menu mobile */}
                <nav className={`absolute left-0 top-full w-full bg-paper p-6 shadow-lg md:hidden
                    flex flex-col gap-2 transition-all duration-300 ease-in-out
                    ${isMenuOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    aria-hidden={!isMenuOpen}>
                    <Link href="/books" onClick={() => setIsMenuOpen(false)}>
                        Catálogo
                    </Link>
                    <Link href="/reviews" onClick={() => setIsMenuOpen(false)}>
                        Reseñas
                    </Link>
                    
                    <hr className="border-border mt-12"/>

                    { isAuthenticated ? (
                        <div className="flex md:hidden items-center">
                            <Button 
                                onClick={handleLogout} 
                                variant="danger" 
                                fullWidth
                            >
                                Cerrar sesión
                            </Button>
                        </div>
                    ) : (
                    <div className="flex md:hidden gap-4 items-center">
                        <LinkButton 
                            href="/login" 
                            variant="outline"
                            fullWidth
                        >
                            Iniciar Sesión
                        </LinkButton>
                        <LinkButton href="/register" fullWidth>
                            Crear Cuenta
                        </LinkButton>
                    </div>
                    )}
                </nav>
            </Container>
        </header>
    )
}