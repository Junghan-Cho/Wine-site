import { NextResponse } from 'next/server'

type Payload = {
  kind: string
  name: string
  email?: string
  website?: string
  message: string
  company?: string // honeypot
}

function isValidUrl(v: string): boolean {
  try {
    new URL(v)
    return true
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Payload | null
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })

  // honeypot hit => pretend success
  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const kind = (body.kind ?? '').trim()
  const name = (body.name ?? '').trim()
  const message = (body.message ?? '').trim()
  const email = (body.email ?? '').trim()
  const website = (body.website ?? '').trim()

  if (!['winery', 'wine', 'varietal', 'other'].includes(kind)) {
    return NextResponse.json({ error: 'Invalid kind' }, { status: 400 })
  }
  if (name.length < 2 || name.length > 200) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  if (website && !isValidUrl(website)) {
    return NextResponse.json({ error: 'Invalid website URL' }, { status: 400 })
  }

  const webhook = process.env.UGC_WEBHOOK_URL
  if (webhook) {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        kind,
        name,
        message,
        email: email || undefined,
        website: website || undefined,
        createdAt: new Date().toISOString(),
        source: 'vinhub',
      }),
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'Webhook failed' }, { status: 502 })
    }
  }

  // If no webhook configured, accept but do nothing (safe for serverless).
  return NextResponse.json({ ok: true })
}

