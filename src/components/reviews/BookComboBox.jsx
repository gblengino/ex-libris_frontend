// components/books/BookCombobox.jsx
"use client";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { searchBooks } from "@/lib/clientApi";

import Input from "@/components/ui/Input";

/**
 * Selector de libro con autocomplete. Componente cliente.
 *
 * Es un componente "controlado por callback": no decide qué pasa al elegir un libro,
 * solo avisa con onSelect(book). Así se reutiliza en:
 *  - /reviews/create: onSelect guarda el libro en el form.
 *  - /reviews (filtro): onSelect actualiza ?book=ID con useUpdateQuery.
 *
 * Detalles:
 *  - Debounce + mínimo de 2 caracteres para no saturar la API.
 *  - AbortController: cancela el request anterior para que una respuesta lenta y vieja
 *    no pise a una más reciente.
 *  - Consulta a /api/books (proxy), nunca directo a la API externa.
 */

export default function BookCombobox({ onSelect }) {
    const [text, setText] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const debounced = useDebouncedValue(text);

    useEffect(() => {
        if (debounced.trim().length < 2) {
        setResults([]);
        setLoading(false);
        return;
        }
        const controller = new AbortController();
        setLoading(true);
        searchBooks(debounced, controller.signal)
        .then(setResults)
        .catch((e) => {
            if (e.name !== "AbortError") setResults([]);
        })
        .finally(() => {
            if (!controller.signal.aborted) setLoading(false);
        });
        return () => controller.abort();
    }, [debounced]);

    function handleSelect(book) {
        onSelect(book);
        setText(book.title);
        setOpen(false);
    }

    const showList = open && text.trim().length >= 2;

    return (
        <div className="relative">
            <Input 
                id="book-search"
                label="Selecciona un libro"
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                    setOpen(true)
                }}
                placeholder="Buscá por título..."
                autoComplete="off"
                role="combobox"
                aria-expanded={showList}
                aria-controls="book-results"
                aria-autocomplete="list"
                />

            {showList && (
                <ul
                    id="book-results"
                    role="listbox"
                    className="absolute z-10 mt-1 w-full rounded-lg border border-ink/50
                    bg-paper shadow-lg"
                >
                    {loading && <li className="px-4 py-2 text-sm">Buscando...</li>}
                    {!loading && results.length === 0 && (
                        <li className="px-4 py-2 text-sm">Sin resultados</li>
                    )}
                    {results.map((book) => (
                        <li key={book.id} role="option">
                            <button
                                type="button"
                                onClick={() => handleSelect(book)}
                                className="w-full px-4 py-2 text-left hover:bg-ink/10"
                            >
                                {book.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

  // render: input + lista; al clickear un resultado -> onSelect(book)
}