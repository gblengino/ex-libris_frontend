"use client"

import {
    createContext,
    useContext,
    useState 
} from "react";

const AuthContext = createContext(null)

export function AuthProvider({children, initialUser = null}) {
    const [user, setUser] = useState(initialUser);

    const isAuthenticated = Boolean(user)

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                setUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context
}