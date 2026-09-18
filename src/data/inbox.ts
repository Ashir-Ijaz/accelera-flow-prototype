export function inboxEmail() {
  return (import.meta.env.VITE_INBOX_EMAIL ?? '').trim()
}

export function web3formsKey() {
  return (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim()
}
