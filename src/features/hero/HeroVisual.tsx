import { lazy, Suspense, useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'
import { useProfile } from '../profiles/store'
import { useTheme } from '../theme/store'
import { PosterFallback } from './PosterFallback'

const Scene = lazy(() => import('./Scene'))

const DESKTOP = '(pointer: fine) and (min-width: 768px)'

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/** Defers three.js until the browser is idle; static artwork otherwise. */
export function HeroVisual() {
  const profile = useProfile((s) => s.profile)
  const dark = useTheme((s) => s.resolved) === 'dark'
  const reduced = usePrefersReducedMotion()
  const [ready, setReady] = useState(false)

  const canRender = () => !reduced && webglAvailable()

  // Desktop: load when idle. Touch/small screens: only on demand (saves CPU and battery).
  useEffect(() => {
    if (!canRender() || !window.matchMedia(DESKTOP).matches) return
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200))
    const cancel = window.cancelIdleCallback ?? window.clearTimeout
    const id = idle(() => setReady(true))
    return () => cancel(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  const fallback = <PosterFallback profile={profile} />
  return (
    <div className="absolute inset-0">
      {ready ? (
        <Suspense fallback={fallback}>
          <Scene profile={profile} dark={dark} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}
