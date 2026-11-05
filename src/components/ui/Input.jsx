export default function Input({
    label,
    error,
    id,
    ...props
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="font-serif text-sm">
                {label}
            </label>

            <input
                id={id}
                {...props}
                className="
                    w-full rounded-lg border border-on-surface-contrast/20
                    bg-on-surface-contrast/5 px-4 py-3 text-paper
                    placeholder:text-on-surface-contrast/30 outline-none
                    transition focus:border-on-surface-contrast/60
                    focus:bg-paper/10
                "
            />

            {error && (
                <p className="text-sm text-red-400" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}