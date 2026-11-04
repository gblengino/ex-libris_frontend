"use client"

import { useTheme } from "../providers/ThemeProvider"

export function ThemeToggleButton() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            { theme === "light" ? "Modo oscuro" : "Modo claro"}
        </button>
    )
}