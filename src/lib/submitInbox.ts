import { inboxEmail, web3formsKey } from '../data/inbox'

export type InboxKind = 'project' | 'youtube-promotion' | 'instagram-promotion' | 'job'

export type InboxPayload = {
  subject: string
  kind: InboxKind
  fields: Record<string, string>
}

export type InboxResult = {
  mailed: boolean
}

function storeLocal(payload: InboxPayload) {
  window.localStorage.setItem(
    `accelera-flow-${payload.kind}`,
    JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
  )
}

function asMailto(email: string, payload: InboxPayload) {
  const body = Object.entries(payload.fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`
}

export async function submitInbox(payload: InboxPayload): Promise<InboxResult> {
  storeLocal(payload)

  const key = web3formsKey()
  const email = inboxEmail()
  const fields = {
    ...payload.fields,
    kind: payload.kind,
    source: 'Accelera Flow website',
  }

  if (key) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: payload.subject,
        from_name: payload.fields.name || 'Accelera Flow site',
        ...fields,
      }),
    })
    const data = (await response.json()) as { success?: boolean }
    if (!response.ok || data.success === false) {
      throw new Error('The request could not be emailed just now.')
    }
    return { mailed: true }
  }

  if (email) {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: payload.subject,
          _template: 'table',
          _captcha: 'false',
          ...fields,
        }),
      })
      if (response.ok) return { mailed: true }
    } catch {
      /* fall through to the mail client */
    }
    asMailto(email, payload)
    return { mailed: true }
  }

  return { mailed: false }
}
