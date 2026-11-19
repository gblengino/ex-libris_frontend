"use client"

import { User } from "lucide-react";
import { useAuth } from "../providers/AuthProvider"

export default function MyProfileCard() {
    
    const { user } = useAuth();
    
    return (
        <div className="py-8 flex flex-col">
                <h1 className="text-center text-3xl font-bold">
                    Hola {user.username}
                </h1>
                <div className="my-2 bg-ink/70 w-[10%] self-center h-px"/>
                <p className="text-xl text-center mb-4">Información de tu perfil</p>
            <article className="p-8 rounded-xl border border-ink/70 bg-surface">
                <div className="flex mt-4">
                    <div className="shrink-0">
                        <div className="rounded-full w-64 h-64 bg-paper flex items-center justify-center">
                            <User size={72}/>
                        </div>
                    </div>
                    <div className="flex-1 px-8 py-4">
                        <dl className="flex flex-col gap-2 text-lg">
                            <div className="flex gap-2">
                                <dt className="font-bold">Nombre de usuario:</dt>
                                <dd>{user.username}</dd>
                            </div>
                            <div className="flex flex-col gap-1">
                                <dt className="font-bold">Biografía:</dt>
                                <dd className="min-h-[4lh] indent-8 whitespace-pre-line wrap-break-word">
                                    {user.bio || "Cuéntanos un poco sobre ti"}
                                </dd>
                            </div>
                            <div className="flex gap-2">
                                <dt className="font-bold">País:</dt>
                                <dd>{user.country || "Selecciona tu país de origen"}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </article>
        </div>
    )
}