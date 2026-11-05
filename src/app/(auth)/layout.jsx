import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import Link from "next/link";

export default function AuthLayout({children}) {
    return (
        <main className="relative min-h-screen w-full px-4 py-8 bg-paper flex items-center justify-center">
            <Link
                href="/"
                className="absolute left-6 top-6 flex items-center gap-2
                    text-ink/70 transition hover:text-ink"
            >
                <span aria-hidden="true">←</span>
                <span className="font-serif text-sm">Volver al inicio</span>
            </Link>
            <div className="absolute right-6 top-6">
                <ThemeToggleButton/>
            </div>
            
            {children}
        </main>
    )
}