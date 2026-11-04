"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { ThemeToggleButton } from "../ui/ThemeToggleButton"
import { Menu, X, BookOpen } from "lucide-react"

export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full h-18 relative flex justify-between py-4 px-8">
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
            <div className="hidden md:flex gap-4 items-center">
                <Link href="/login" className="px-4 py-2 border-ink border rounded-xl 
                transition-colors hover:text-burgundy hover:border-burgundy
                hover:bg-burgundy/5 focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-gold">
                    Iniciar Sesión
                </Link>
                <Link href="/register" className="px-4 py-2 bg-burgundy rounded-xl text-white shadow-sm
                transition-all duration-200 hover:bg-[#552330] hover:shadow-md active:scale-[0.98]
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                    Crear Cuenta
                </Link>
            </div>
            
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

                <Link href="/login" onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 text-center">
                    Iniciar Sesión
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl bg-burgundy px-4 py-2 text-center text-white">
                    Crear Cuenta
                </Link>
            </nav>
        </header>
    )
}