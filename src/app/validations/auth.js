import z from "zod";

export const loginSchema = z.object({
    username: z.string().min(1, "El usuario es obligatorio."),
    password: z.string().min(1, "La contraseña es obligatoria."),
})

export const registerSchema = z.object({
    username: z.string()
    .min(1, "El nombre de usuario es obligatorio.")
    .max(150, "El nombre de usuario no puede superar los 150 caracteres.")
    .regex(
        /^[\w.@+-]+$/,
        "El nombre de usuario contiene caracteres no permitidos."
    ),
    email: z.email("Ingresa un email válido."),
    password: z.string(1, "La contraseña es obligatoria."),
    password2: z.string(1, "Debes confirmar tu contraseña")
}).refine(
        (data) => data.password === data.password2,
        {
            message: "Las contraseñas no coinciden.",
            path: ["password2"],
        }
    );