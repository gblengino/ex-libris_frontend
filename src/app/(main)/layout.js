import NavBar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function MainLayout({children}) {
    return (
        <div className="min-h-screen flex flex-col bg-paper dark:">
            <NavBar/>
            <main className="flex-1 min-h-screen">
                {children}
            </main>
            <Footer/>
        </div>
    )
}