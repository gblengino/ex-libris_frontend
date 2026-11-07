"use client"
import { useEffect, useState } from "react";

/**
 * Retrasa la actualización de un valor hasta que pasan `delay` ms sin cambios.
 *
 * No hace fetch: solo "estabiliza" el valor. Si un useEffect depende del valor
 * debounced, escribir "harry" dispara 1 request en lugar de 5 (uno por tecla).
 * El input se sigue actualizando al instante; solo se demora la consulta a la API.
 */

export function useDebouncedValue(value, delay = 300) {

    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);

    return debounced;
}