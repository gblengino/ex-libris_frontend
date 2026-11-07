import Link from "next/link";

const variants = {
    primary:
        "bg-burgundy text-on-burgundy hover:brightness-110",

    secondary:
        "bg-surface text-on-surface hover:brightness-95",

    outline:
        "border border-ink text-ink hover:bg-burgundy/5 hover:text-burgundy hover:border-burgundy",

    ghost:
        "text-ink hover:bg-surface",
    danger:
        "bg-danger text-on-danger hover:brightness-110",
};

const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

export default function LinkButton({
    href,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            href={href}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-xl font-medium
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
            {children}
        </Link>
    );
}
