export interface ContactValues {
  name: string
  email: string
  message: string
}

export type ContactErrors = Partial<
  Record<keyof ContactValues, 'required' | 'invalidEmail' | 'short'>
>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!v.name.trim()) errors.name = 'required'
  if (!v.email.trim()) errors.email = 'required'
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'invalidEmail'
  if (!v.message.trim()) errors.message = 'required'
  else if (v.message.trim().length < 10) errors.message = 'short'
  return errors
}
