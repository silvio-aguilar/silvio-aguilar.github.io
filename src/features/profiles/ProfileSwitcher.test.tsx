import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import '../../i18n'
import { ProfileSwitcher } from './ProfileSwitcher'
import { useProfile } from './store'

describe('ProfileSwitcher', () => {
  it('switches the active profile without navigation', async () => {
    render(
      <MemoryRouter initialEntries={['/es/']}>
        <Routes>
          <Route path=":lang" element={<ProfileSwitcher />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByRole('radio', { name: /Desarrollo móvil/ })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    await userEvent.click(screen.getByRole('radio', { name: /Ciberseguridad/ }))
    expect(useProfile.getState().profile).toBe('security')
    expect(screen.getByRole('radio', { name: /Ciberseguridad/ })).toHaveAttribute(
      'aria-checked',
      'true',
    )
  })
})
