import { sql } from '../db/neon.js'
import { CANAL, EMPREENDIMENTO_INTERESSE } from './constants.js'

function normalizeTracking(data) {
  const email = String(data.email).toLowerCase().trim()
  const phone = String(data.phone).replace(/\D/g, '')
  const canal = String(data.canal || CANAL).trim() || CANAL
  const codigo = data.codigo ? String(data.codigo).trim() : null
  const parameter = Array.isArray(data.parameter) && data.parameter.length > 0 ? data.parameter : null
  return { email, phone, canal, codigo, parameter }
}

export async function insertPartialLead(data) {
  try {
    const { email, phone, canal, codigo, parameter } = normalizeTracking(data)

    await sql`
      INSERT INTO site_oasis_ii
        (
          name,
          email,
          phone,
          canal,
          empreendimento_interesse,
          whatsapp_clicked,
          profile_completed,
          codigo,
          parameter
        )
      VALUES
        (
          ${data.name.trim()},
          ${email},
          ${phone},
          ${canal},
          ${EMPREENDIMENTO_INTERESSE},
          ${false},
          ${false},
          ${codigo},
          ${parameter}
        )
    `

    return { success: true }
  } catch (err) {
    if (err?.code === '23505') {
      return { success: false, error: 'Este e-mail já está cadastrado.' }
    }
    console.error('[insertPartialLead] Erro:', err)
    return { success: false, error: 'Erro ao enviar. Tente novamente.' }
  }
}

export async function completeLeadProfile(data) {
  try {
    const email = String(data.email).toLowerCase().trim()
    const birthDate = data.birth_date ? data.birth_date : null

    const result = await sql`
      UPDATE site_oasis_ii
      SET
        relationship_status = ${data.relationship_status},
        monthly_investment = ${data.monthly_investment},
        current_city = ${data.current_city.trim()},
        birth_date = ${birthDate},
        profile_type = ${data.profile_type},
        profile_completed = ${true},
        updated_at = now()
      WHERE email = ${email}
      RETURNING id
    `

    if (result.length === 0) {
      return { success: false, error: 'Cadastro não encontrado. Tente novamente.' }
    }

    return { success: true }
  } catch (err) {
    if (err?.code === '23514') {
      return { success: false, error: 'Valor inválido em um dos campos.' }
    }
    console.error('[completeLeadProfile] Erro:', err)
    return { success: false, error: 'Erro ao enviar. Tente novamente.' }
  }
}
