import { apiUrl } from '../api.js'

export async function checkEmailExists(email) {
  try {
    const res = await fetch(`${apiUrl('/leads/check-email')}?email=${encodeURIComponent(email)}`)
    if (!res.ok) return { error: 'Erro ao verificar e-mail.' }
    return await res.json()
  } catch {
    return { error: 'Erro ao verificar e-mail.' }
  }
}
