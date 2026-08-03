import { Hono } from 'hono'
import { sql } from '../db/neon.js'
import { completeLeadProfile, insertPartialLead } from '../leads/insert.js'
import { initialSchema, modalSchema } from '../leads/schema.js'

const leads = new Hono()

leads.get('/check-email', async (c) => {
  const email = c.req.query('email')

  if (!email || !email.includes('@')) {
    return c.json({ error: 'E-mail inválido.' }, 400)
  }

  try {
    const result = await sql`
      SELECT 1
      FROM site_oasis_ii
      WHERE email = ${email.toLowerCase().trim()}
      LIMIT 1
    `
    return c.json({ exists: result.length > 0 })
  } catch (err) {
    console.error('[check-email] Erro:', err)
    return c.json({ error: 'Erro ao verificar e-mail.' }, 500)
  }
})

leads.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const initialParsed = initialSchema.safeParse(body)

    if (!initialParsed.success) {
      return c.json({ success: false, error: 'Dados inválidos. Verifique os campos.' }, 400)
    }

    const codigo = body?.codigo ? String(body.codigo).trim() : null
    const canal = body?.canal ? String(body.canal).trim() : null
    const parameter = Array.isArray(body?.parameter)
      ? body.parameter.map(String).filter(Boolean)
      : null

    const result = await insertPartialLead({
      ...initialParsed.data,
      codigo,
      canal,
      parameter,
    })

    return c.json(result, result.success ? 200 : 400)
  } catch (err) {
    console.error('[register] Erro:', err)
    return c.json({ success: false, error: 'Erro ao enviar. Tente novamente.' }, 500)
  }
})

leads.post('/complete', async (c) => {
  try {
    const body = await c.req.json()
    const email = String(body?.email || '')
      .toLowerCase()
      .trim()
    const modalParsed = modalSchema.safeParse(body)

    if (!email || !email.includes('@') || !modalParsed.success) {
      return c.json({ success: false, error: 'Dados inválidos. Verifique os campos.' }, 400)
    }

    const result = await completeLeadProfile({
      email,
      ...modalParsed.data,
    })

    return c.json(result, result.success ? 200 : 400)
  } catch (err) {
    console.error('[complete] Erro:', err)
    return c.json({ success: false, error: 'Erro ao enviar. Tente novamente.' }, 500)
  }
})

leads.post('/whatsapp-clicked', async (c) => {
  try {
    const body = await c.req.json()
    const email = String(body?.email || '')
      .toLowerCase()
      .trim()

    if (!email || !email.includes('@')) {
      return c.json({ success: false, error: 'E-mail inválido.' }, 400)
    }

    await sql`
      UPDATE site_oasis_ii
      SET whatsapp_clicked = ${true}, updated_at = now()
      WHERE email = ${email}
    `

    return c.json({ success: true })
  } catch (err) {
    console.error('[whatsapp-clicked] Erro:', err)
    return c.json({ success: false, error: 'Erro ao registrar clique.' }, 500)
  }
})

export default leads
