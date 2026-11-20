"use client";

import { useSearchParams } from "next/navigation";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import Select from "@/components/ui/Select";

export default function BookToolbar() {
    const searchParams = useSearchParams();
    const updateQuery = useUpdateQuery();

    const ordering = searchParams.get("ordering") || "";

    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor="ordering"
                className="text-sm whitespace-nowrap"
            >
                Ordenar por:
            </label>

            <Select
                id="ordering"
                name="ordering"
                value={ordering}
                onChange={(e) =>
                    updateQuery("ordering", e.target.value)
                }
                className="w-auto text-sm"
            >
                <option value="">Orden predeterminado</option>
                <option value="title">Título (A-Z)</option>
                <option value="-title">Título (Z-A)</option>
                <option value="-publication_date">
                    Más recientes
                </option>
                <option value="publication_date">
                    Más antiguos
                </option>
            </Select>
        </div>
    );
}
