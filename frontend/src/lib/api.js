const DEFAULT_API_URL = 'http://localhost:8787'

export function getApiUrl() {
  const base = import.meta.env.PUBLIC_API_URL || DEFAULT_API_URL
  return String(base).replace(/\/$/, '')
}

export function apiUrl(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getApiUrl()}${normalized}`
}
