"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

export default function BookFilters({ genres }) {
    const searchParams = useSearchParams();
    const updateQuery = useUpdateQuery();

    const selectedGenre = searchParams.get("genre") || "";
    const selectedAuthor = searchParams.get("author") || "";

    const [author, setAuthor] = useState(selectedAuthor);
    const debouncedAuthor = useDebouncedValue(author, 400);

    // Sincronizar con la URL (atrás/adelante).
    useEffect(() => {
        setAuthor(selectedAuthor);
    }, [selectedAuthor]);

    // Actualizar URL después del debounce.
    useEffect(() => {
        if (debouncedAuthor === selectedAuthor) return;

        updateQuery("author", debouncedAuthor.trim());
    }, [debouncedAuthor]);

    return (
        <div className="space-y-6">
            <div>
                <label
                    htmlFor="genre"
                    className="block font-semibold mb-2"
                >
                    Género
                </label>

                <Select
                    id="genre"
                    value={selectedGenre}
                    onChange={(e) =>
                        updateQuery("genre", e.target.value)
                    }
                >
                    <option value="">Todos los géneros</option>

                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </Select>
            </div>

            <div>
                <label
                    htmlFor="author"
                    className="block font-semibold mb-2"
                >
                    Autor
                </label>

                <Input
                    id="author"
                    type="text"
                    placeholder="Buscar por autor..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
        </div>
    );
}
