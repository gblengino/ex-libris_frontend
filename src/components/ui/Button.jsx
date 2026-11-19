const variants = {
    primary:
        "bg-burgundy text-on-burgundy hover:brightness-110",

    secondary:
        "bg-surface text-on-surface hover:brightness-95",

    outline:
        "border border-border text-ink hover:bg-surface",

    ghost:
        "text-ink hover:bg-surface",
    danger:
        "bg-danger text-on-danger hover:brightness-110",
};

const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

export default function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    type = "button",
    disabled = false,
    loading = false,
    className = "",
    ...props
}) {
    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            disabled={isDisabled}
            aria-busy={loading}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-lg font-medium
                transition-colors duration-200
                hover:cursor-pointer
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-gold
                focus-visible:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
                ${variants[variant] ?? variants.primary}
                ${sizes[size] ?? sizes.md}
                ${fullWidth ? "w-full" : "w-fit"}
                ${className}
            `}
            {...props}
        >
            {loading && (
                <span
                    aria-hidden="true"
                    className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
                />
            )}

            {children}
        </button>
    );
}
