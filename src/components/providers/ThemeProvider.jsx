"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light")

    useEffect(()=> {
        const savedTheme = localStorage.getItem("theme")

        const initialTheme = savedTheme || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light")

        setTheme(initialTheme)
    }, [])

    useEffect(()=> {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}