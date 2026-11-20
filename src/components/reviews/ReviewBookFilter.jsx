"use client";


import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import BookCombobox from "./BookComboBox";

export default function ReviewBookFilter() {
    const updateQuery = useUpdateQuery();

    function handleSelect(book) {
        updateQuery("book", book.id);
    }

    return <BookCombobox onSelect={handleSelect} />;
}
