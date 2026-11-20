"use client";

import BookCombobox from "@/components/books/BookCombobox";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";

export default function ReviewBookFilter() {
    const updateQuery = useUpdateQuery();

    function handleSelect(book) {
        updateQuery("book", book.id);
    }

    return <BookCombobox onSelect={handleSelect} />;
}
