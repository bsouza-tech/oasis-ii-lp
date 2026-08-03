import { INVESTMENT_OPTIONS } from '../../../lib/leads/constants.js'
import OptionCard from '../OptionCard.jsx'

function StepInvestment({ value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <h3
        className="text-navy leading-tight"
        style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 800 }}
      >
        Qual o seu investimento mensal?
      </h3>
      <div className="mt-1 flex flex-col gap-2.5">
        {INVESTMENT_OPTIONS.map((option) => (
          <OptionCard
            key={option}
            label={option}
            selected={value === option}
            onSelect={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  )
}

export default StepInvestment
