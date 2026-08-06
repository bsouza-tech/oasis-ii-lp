import React from 'react'

function PillButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) {
  const base = 'rounded-full font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
  const sizes = { md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
  const variants = {
    primary: 'bg-orange text-white hover:brightness-110',
    'outline-navy': 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-navy',
  }
  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {loading ? <span className="spinner" /> : children}
    </button>
  )
}

function CircleBadge({ icon, delay = 0, visible = true }) {
  return (
    <div
      className="w-12 h-12 rounded-full bg-orange flex items-center justify-center flex-shrink-0"
      style={visible ? { animation: `badge-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both` } : { opacity: 0 }}
    >
      {icon}
    </div>
  )
}

function PhotoTag({ label }) {
  return (
    <span className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full leading-none">
      {label}
    </span>
  )
}

function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-navy">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          rounded-xl px-4 py-3 text-sm bg-white outline-none border transition-all duration-150
          ${error ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-transparent focus:border-orange focus:ring-2 focus:ring-orange/20'}
          text-ink placeholder-ink/40
        `}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}


export { PillButton, CircleBadge, PhotoTag, FormField }
