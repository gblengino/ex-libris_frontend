export default function StepCard({ icon: Icon, number, title, description }) {
    return (
        <div className="flex flex-col items-center text-center md:p-6 transition-transform
                        duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-center justify-center">
                <Icon size={64} />
            </div>

            <h3 className="text-2xl font-serif font-bold text-ink mb-3">
                {number}. {title}
            </h3>

            <p className="text-ink/80 text-md leading-relaxed max-w-xs">
                {description}
            </p>
        </div>
    );
}