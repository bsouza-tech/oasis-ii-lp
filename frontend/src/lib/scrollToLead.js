export function openLeadModal(detail) {
  window.dispatchEvent(new CustomEvent('open-lead', { detail }))
  window.dispatchEvent(new CustomEvent('pause-scroll'))
}

/** @deprecated use openLeadModal — kept for existing imports */
export function scrollToLeadForm() {
  openLeadModal()
}
