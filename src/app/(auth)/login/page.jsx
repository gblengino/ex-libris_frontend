"use client"
import { startTransition, useActionState, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link"
import React from "react"
import Input from "@/components/ui/Input"

import { login } from "@/app/actions/auth"
import { loginSchema } from "@/app/validations/auth"
import Button from "@/components/ui/Button"

export default function LoginPage() {

    const [state, formAction, isPending] = useActionState(login, null)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    const onSubmit = (data) => {
        const formData = new FormData();

        formData.set("username", data.username);
        formData.set("password", data.password);

        startTransition(() => {
            formAction(formData);
        })
    }

    return(
        <section className="w-full max-w-md rounded-2xl border border-ink/20
            bg-surface p-8 text-ink shadow-xl">

            <header className="mb-2 flex flex-col items-center text-center">
                <span className="font-serif text-sm italic tracking-widest text-ink/80">
                    Bienvenido de nuevo
                </span>

                <h1 className="font-display text-4xl uppercase tracking-wide">
                    Ex Libris
                </h1>

                <div className="h-px w-16 bg-ink/70 my-2"/>

                <h2 className="font-serif text-xl">
                    Iniciar sesión
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
                        id="password"
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Tu contraseña"
                        error={errors.password?.message}
                        {...register("password")}
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
                    {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>

                <p className="text-center text-sm text-ink/60">
                    ¿Todavía no tenés una cuenta?{" "}
                    <Link
                        href="/register"
                        className="text-ink underline decoration-ink/40
                            underline-offset-4 transition hover:decoration-ink"
                    >
                        Registrate
                    </Link>
                </p>

            </form>
        </section>
    )
}