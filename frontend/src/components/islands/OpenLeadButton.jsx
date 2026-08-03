import { openLeadModal } from '../../lib/scrollToLead.js'
import { PillButton } from '../../lib/ui.jsx'

function OpenLeadButton({ children = 'Quero receber informações', size = 'lg', className = '' }) {
  return (
    <PillButton onClick={openLeadModal} size={size} className={className}>
      {children}
    </PillButton>
  )
}

export default OpenLeadButton
