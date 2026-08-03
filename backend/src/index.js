import './env.js'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import leads from './routes/leads.js'

const app = new Hono()

const origins = String(process.env.CORS_ORIGINS || 'http://localhost:8443')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean)

app.use(
  '*',
  cors({
    origin: origins,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }),
)

app.get('/health', (c) => c.json({ ok: true }))
app.route('/leads', leads)

const port = Number(process.env.PORT || 8787)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API Oasis II em http://localhost:${info.port}`)
})
