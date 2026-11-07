export default function Loading() {
    return (
        <div
            role="status"
            aria-live="polite"
            className="mx-auto w-full max-w-5xl px-4 py-10 flex flex-col gap-6"
        >
            <span className="sr-only">Cargando…</span>

            <div className="h-10 w-2/3 rounded-lg bg-surface motion-safe:animate-pulse" />
            <div className="h-4 w-1/3 rounded bg-surface motion-safe:animate-pulse" />

            <div className="flex gap-4 rounded-xl bg-surface/60 p-4">
                <div className="aspect-2/3 w-28 shrink-0 rounded-lg bg-surface motion-safe:animate-pulse" />
                <div className="flex flex-1 flex-col gap-3">
                    <div className="h-6 w-1/2 rounded bg-surface motion-safe:animate-pulse" />
                    <div className="h-4 w-1/4 rounded bg-surface motion-safe:animate-pulse" />
                    <div className="mt-auto h-4 w-1/3 rounded bg-surface motion-safe:animate-pulse" />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="h-4 w-full rounded bg-surface motion-safe:animate-pulse" />
                <div className="h-4 w-full rounded bg-surface motion-safe:animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-surface motion-safe:animate-pulse" />
            </div>
        </div>
    )
}