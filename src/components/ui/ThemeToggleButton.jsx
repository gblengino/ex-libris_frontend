"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../providers/ThemeProvider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Cambiar tema"
                disabled
                className="rounded-lg p-2 text-ink"
            />
        )
    }

    return (
        <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
            className="rounded-lg p-2 text-ink transition-colors duration-200 hover:cursor-pointer
            hover:bg-burgundy/10 hover:text-burgundy focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    )
}
