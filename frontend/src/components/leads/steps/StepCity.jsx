function StepCity({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="text-navy leading-tight"
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 800 }}
      >
        Em qual cidade você mora?
      </h3>
      <label className="mt-1 flex flex-col gap-1">
        <span className="text-sm font-semibold text-navy">Cidade de residência</span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex.: Nova Iguaçu"
          className="rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-all focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
      </label>
    </div>
  )
}

export default StepCity
