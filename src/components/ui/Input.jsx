export default function Input({
    label,
    error,
    id,
    className = "",
    ...props
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="font-sans text-sm">
                {label}
            </label>

            <input
                id={id}
                {...props}
                className={`
                    w-full rounded-lg border border-ink/50
                    bg-surface/5 px-4 py-2 text-ink
                    placeholder:text-ink/50 outline-none
                    transition focus:border-ink
                    focus:bg-paper/10 ${className}`}
            />

            {error && (
                <p className="text-sm text-red-400" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}