export function inboxEmail() {
  return (import.meta.env.VITE_INBOX_EMAIL ?? '').trim()
}

export function web3formsKey() {
  return (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim()
}

export function inboxReady() {
  return Boolean(inboxEmail() || web3formsKey())
}

export function inboxConfirm(mailed: boolean, sent: string) {
  return mailed
    ? sent
    : 'This note is saved on this device. A studio inbox email still needs to be added before it can be sent.'
}
