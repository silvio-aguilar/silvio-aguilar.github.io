import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { usePrefersReducedMotion } from '../../lib/usePrefersReducedMotion'

type LenisInstance = import('lenis').default

let lenis: LenisInstance | null = null

/** Lenis smooth scrolling (skipped with reduced motion) plus hash/top restoration on navigation. */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion()
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let cancelled = false
    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return
      lenis = new Lenis({ anchors: { offset: -72 } })
      const loop = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [reduced])

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -72 })
        else el.scrollIntoView({ block: 'start' })
        return
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])
}
