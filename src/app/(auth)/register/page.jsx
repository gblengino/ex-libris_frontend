"use client"
import { startTransition, useActionState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link"
import React from "react"
import Input from "@/components/ui/Input"

import { register as registerAction } from "@/app/actions/auth"
import { registerSchema } from "@/app/validations/auth"
import Button from "@/components/ui/Button"

export default function RegisterPage() {

    const [state, formAction, isPending] = useActionState(registerAction, null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    })

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.set("username", data.username);
        formData.set("email", data.email);
        formData.set("password", data.password);
        formData.set("password2", data.password2);

        startTransition(() => {
            formAction(formData);
        })
    }

    return(
        <section className="w-full max-w-md rounded-2xl border border-paper/10
            bg-surface-contrast p-8 text-on-surface-contrast">

            <header className="mb-2 flex flex-col items-center text-center">
                <h1 className="font-display text-4xl uppercase tracking-wide">
                    Ex Libris
                </h1>

                <div className="h-px w-16 bg-on-surface-contrast/30 my-2"/>

                <h2 className="font-serif text-xl">
                    Crear cuenta
                </h2>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

                <div className="flex flex-col gap-2">
                    <Input
                        id="username"
                        label="Usuario"
                        type="text"
                        autoComplete="username"
                        placeholder="Tu nombre de usuario"
                        error={errors.username?.message}
                        {...register("username")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Input
                        id="email"
                        label="Email"
                        type="text"
                        autoComplete="email"
                        placeholder="Tu correo electrónico"
                        error={errors.email?.message}
                        {...register("email")}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Input
                        id="password"
                        label="Contraseña"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Crea tu contraseña"
                        error={errors.password?.message}
                        {...register("password")}
                    />
                    <div className="space-y-1 px-1">
                        <p className="text-sm font-medium text-on-surface-contrast">
                        Tu contraseña debe:
                        </p>

                        <ul className="space-y-1 text-sm text-muted">
                        <li>• Tener al menos 8 caracteres.</li>
                        <li>• No ser demasiado similar a tu información personal.</li>
                        <li>• No ser una contraseña de uso común.</li>
                        <li>• No estar compuesta únicamente por números.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Input
                        id="password2"
                        label="Confirmar ontraseña"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirma tu contraseña"
                        error={errors.password2?.message}
                        {...register("password2")}
                    />
                </div>

                {state?.error && (
                    <p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                        {state.error}
                    </p>
                )}

                <Button 
                    type="submit"
                    loading={isPending}
                    className="w-full"
                    size="lg"
                >
                    {isPending ? "Creando tu cuenta..." : "Creá tu cuenta"}
                </Button>

                <p className="text-center text-sm text-on-surface-contrast/60">
                    ¿Ya tenés una cuenta?{" "}
                    <Link
                        href="/login"
                        className="text-on-surface-contrast underline decoration-on-surface-contrast/40
                            underline-offset-4 transition hover:decoration-ink "
                    >
                        Iniciá sesión
                    </Link>
                </p>

            </form>
        </section>
    )
}