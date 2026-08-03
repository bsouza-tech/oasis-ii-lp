function OptionCard({ label, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all ${
        selected
          ? 'border-orange bg-orange/10 text-navy'
          : 'border-navy/10 bg-white text-ink/80 hover:border-orange/40'
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
          selected ? 'border-orange bg-orange text-white' : 'border-navy/25 bg-white'
        }`}
        aria-hidden="true"
      >
        {selected ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span className="text-sm font-semibold leading-snug">{label}</span>
    </button>
  )
}

export default OptionCard
