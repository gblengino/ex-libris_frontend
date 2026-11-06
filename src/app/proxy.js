import { NextResponse } from "next/server";

const ACCESS_COOKIE = "access";
const REFRESH_COOKIE = "refresh";

const ACCESS_MAX_AGE = 60 * 30; // 30 minutos
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7 días

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};

export async function proxy(request) {
    // Los prefetch de next/link no deben refrescar tokens (evita refrescos duplicados)
    if (request.headers.get("next-router-prefetch") || request.headers.get("purpose") === "prefetch") {
        return NextResponse.next();
    }

    const access = request.cookies.get(ACCESS_COOKIE)?.value;
    const refresh = request.cookies.get(REFRESH_COOKIE)?.value;

    // Access vigente o sin sesión: no hay nada que renovar
    if (access || !refresh) {
        return NextResponse.next();
    }

    // El access venció (la cookie desapareció por su maxAge) pero hay refresh
    let res;
    try {
        res = await fetch(`${process.env.API_URL}/api/auth/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
            cache: "no-store",
        });
    } catch {
        // Error de red: no borrar la sesión, reintentará en la próxima request
        return NextResponse.next();
    }

    if (!res.ok) {
        // Solo se borra la sesión si el refresh token es realmente inválido
        if (res.status === 400 || res.status === 401) {
            request.cookies.delete(ACCESS_COOKIE);
            request.cookies.delete(REFRESH_COOKIE);

            const response = NextResponse.next({ request });
            response.cookies.delete(ACCESS_COOKIE);
            response.cookies.delete(REFRESH_COOKIE);
            return response;
        }
        // 500, 503, etc.: error del backend, se conserva la sesión
        return NextResponse.next();
    }

    const tokens = await res.json();
    const newRefresh = tokens.refresh ?? refresh; // si el backend no rota, se conserva el viejo

    // Para que los Server Components de ESTA request ya vean los tokens nuevos
    request.cookies.set(ACCESS_COOKIE, tokens.access);
    request.cookies.set(REFRESH_COOKIE, newRefresh);

    const response = NextResponse.next({ request });

    // Para que el navegador guarde los tokens nuevos
    response.cookies.set(ACCESS_COOKIE, tokens.access, {
        ...cookieOptions,
        maxAge: ACCESS_MAX_AGE,
    });
    response.cookies.set(REFRESH_COOKIE, newRefresh, {
        ...cookieOptions,
        maxAge: REFRESH_MAX_AGE,
    });

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico)$).*)"],
};