const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

export function getLeadTracking() {
  if (typeof window === 'undefined') {
    return { codigo: null, parameter: null, canal: 'Site' }
  }

  const params = new URLSearchParams(window.location.search)
  const codigo = params.get('codigo') || params.get('code') || null
  const canal = params.get('canal') || params.get('utm_source') || 'Site'

  const parameter = []
  for (const key of UTM_KEYS) {
    const value = params.get(key)
    if (value) parameter.push(`${key}=${value}`)
  }

  const extra = params.get('parameter') || params.get('param')
  if (extra) parameter.push(extra)

  return {
    codigo,
    parameter: parameter.length > 0 ? parameter : null,
    canal: String(canal).trim() || 'Site',
  }
}
