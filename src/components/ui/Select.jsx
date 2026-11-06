export default function Select({
    id,
    className = "",
    children,
    ...props
}){
    return(
        <select
            id={id}
            {...props}
            className={`
                w-full rounded-lg border border-ink/50
                bg-surface/5 px-4 py-2 text-ink/50
                placeholder:text-ink/50 outline-none
                transition focus:border-ink
                focus:bg-paper/10 disabled:cursor-not-allowed
                [&>option]:bg-paper [&>option]:text-ink/80
                ${className}`
            }
        >
            {children}
        </select>
    )
}