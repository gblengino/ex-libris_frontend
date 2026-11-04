export default function AuthLayout({children}) {
    return (
        <main className="min-h-screen w-full px-4 py-8 bg-paper flex items-center justify-center">
            {children}
        </main>
    )
}