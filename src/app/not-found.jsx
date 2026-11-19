import NotFoundContent from "@/components/layout/NotFoundContent";

export const metadata = { title: "Página no encontrada" };

export default function RootNotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-paper">
            <NotFoundContent />
        </main>
    );
}