import { useEffect } from 'react'
import { useProfile } from '../features/profiles/store'
import { useTheme, watchSystemTheme } from '../features/theme/store'

export function useHydrateStores() {
  useEffect(() => {
    void useProfile.persist.rehydrate()
    useTheme.getState().sync()
    return watchSystemTheme()
  }, [])
}
