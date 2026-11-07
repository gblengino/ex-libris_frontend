export default function RatingInput({ register, error, max = 10, className = "" }) {
  return (
    <fieldset className={`flex flex-col gap-2 ${className}`}>
      <legend className="font-sans text-sm mb-2">Puntaje</legend>

      <div className="flex flex-wrap gap-1">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <label key={n}>
            <input
              type="radio"
              value={n}
              {...register("rating")}
              className="peer sr-only"
            />
            <span
              className="flex h-8 w-8 cursor-pointer items-center justify-center
                rounded-full border border-ink/50 text-ink transition
                hover:bg-ink/10
                peer-checked:bg-ink peer-checked:text-paper
                peer-focus-visible:ring-2 peer-focus-visible:ring-ink"
            >
              {n}
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}