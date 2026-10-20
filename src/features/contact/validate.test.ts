import { describe, expect, it } from 'vitest'
import { validateContact } from './validate'

describe('validateContact', () => {
  it('requires every field', () => {
    expect(validateContact({ name: ' ', email: '', message: '' })).toEqual({
      name: 'required',
      email: 'required',
      message: 'required',
    })
  })

  it('checks email format and message length', () => {
    expect(validateContact({ name: 'Ana', email: 'nope', message: 'corto' })).toEqual({
      email: 'invalidEmail',
      message: 'short',
    })
  })

  it('accepts a valid message', () => {
    expect(
      validateContact({ name: 'Ana', email: 'ana@ejemplo.es', message: 'Hola, ¿hablamos?' }),
    ).toEqual({})
  })
})
