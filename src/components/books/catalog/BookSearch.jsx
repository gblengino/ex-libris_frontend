"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import Input from "@/components/ui/Input";

export default function BookSearch() {
    const searchParams = useSearchParams();
    const updateQuery = useUpdateQuery();

    const initialSearch = searchParams.get("search") || "";

    const [search, setSearch] = useState(initialSearch);
    const debouncedSearch = useDebouncedValue(search, 400);

    // Sincronizar cuando cambia la URL (atrás/adelante).
    useEffect(() => {
        setSearch(searchParams.get("search") || "");
    }, [searchParams]);

    // Actualizar la URL después del debounce.
    useEffect(() => {
        if (debouncedSearch === initialSearch) return;

        updateQuery("search", debouncedSearch.trim());
    }, [debouncedSearch]);

    return (
        <Input
            type="text"
            placeholder="Buscar libro..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-auto py-2 text-sm"
        />
    );
}
