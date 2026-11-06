import Link from "next/link";

function getPageItems(currentPage, totalPages) {
    const pages = new Set([
        1,
        totalPages,
        currentPage - 1,
        currentPage,
        currentPage + 1,
    ]);

    const sortedPages = [...pages]
    .filter(page => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

    const items = []
    let previousPage = 0;

    for (const page of sortedPages) {
        const difference = page - previousPage;

        if (difference === 2) {
            items.push(previousPage + 1);
        } else if (difference > 2) {
            items.push(`ellipsis-${page}`);
        }

        items.push(page);
        previousPage = page;
    }

    return items
}

function buildHref(basePath, queryParams, page) {
    const params = new URLSearchParams();

    Object.entries(queryParams ?? {}).forEach(([key, value]) => {
        if (key === "page" || value == null) return;

        if (Array.isArray(value)) {
            value.forEach(item => params.append(key, item));
        } else {
            params.set(key, value);
        }
    });

    params.set("page", String(page));

    return `${basePath}?${params.toString()}`;
}

export default function Paginator({
    currentPage,
    totalPages,
    basePath,
    queryParams = {},
}) {
    const current = Math.max(1, Number(currentPage) || 1);

    if (totalPages <= 1) return null;

    const pageItems = getPageItems(current, totalPages);

    const linkStyles = 
    "inline-flex min-w-9 h-9 items-center justify-center rounded-md border border-outline/30 px-3 text-sm transition-colors hover:bg-surface";
    const activeStyles =
        "bg-surface font-semibold";
    const disabledStyles =
        "pointer-events-none opacity-40";

        return (
            <nav
            aria-label="Paginación"
            className="flex flex-wrap items-center justify-center gap-2"
        >
            {current > 1 ? (
                <Link
                    href={buildHref(basePath, queryParams, current - 1)}
                    className={linkStyles}
                    aria-label="Página anterior"
                >
                    Anterior
                </Link>
            ) : (
                <span className={`${linkStyles} ${disabledStyles}`}>
                    Anterior
                </span>
            )}

            {pageItems.map((item) => {
                if (typeof item === "string") {
                    return (
                        <span
                            key={item}
                            className="px-1 text-on-surface/60"
                            aria-hidden="true"
                        >
                            …
                        </span>
                    );
                }

                const isCurrent = item === current;

                return (
                    <Link
                        key={item}
                        href={buildHref(basePath, queryParams, item)}
                        className={`${linkStyles} ${isCurrent ? activeStyles : ""}`}
                        aria-current={isCurrent ? "page" : undefined}
                        aria-label={`Página ${item}`}
                    >
                        {item}
                    </Link>
                );
            })}

            {current < totalPages ? (
                <Link
                    href={buildHref(basePath, queryParams, current + 1)}
                    className={linkStyles}
                    aria-label="Página siguiente"
                >
                    Siguiente
                </Link>
            ) : (
                <span className={`${linkStyles} ${disabledStyles}`}>
                    Siguiente
                </span>
            )}
        </nav>
        )
}