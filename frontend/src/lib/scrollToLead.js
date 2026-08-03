export function openLeadModal() {
  window.dispatchEvent(new CustomEvent('open-lead'))
  window.dispatchEvent(new CustomEvent('pause-scroll'))
}

/** @deprecated use openLeadModal — kept for existing imports */
export function scrollToLeadForm() {
  openLeadModal()
}
