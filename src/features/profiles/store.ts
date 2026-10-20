import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProfileId } from '../../content/types'

interface ProfileState {
  profile: ProfileId
  setProfile: (p: ProfileId) => void
}

/** Hydrated manually (see useHydrateStores) so prerendered HTML matches the first client render. */
export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      profile: 'dev',
      setProfile: (profile) => set({ profile }),
    }),
    { name: 'profile', skipHydration: true },
  ),
)
