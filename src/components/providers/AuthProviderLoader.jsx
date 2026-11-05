import { getCurrentUser } from "@/lib/data";
import { AuthProvider } from "@/components/providers/AuthProvider";

export default async function AuthProviderLoader({ children }) {
    const user = await getCurrentUser();

    return (
        <AuthProvider initialUser={user}>
            {children}
        </AuthProvider>
    );
}