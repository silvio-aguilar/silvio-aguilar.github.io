import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { play, type Voice } from './synth'

const pads: { voice: Voice; key: string }[] = [
  { voice: 'kick', key: 'q' },
  { voice: 'snare', key: 'w' },
  { voice: 'hat', key: 'e' },
  { voice: 'clap', key: 'r' },
  { voice: 'tom', key: 'a' },
  { voice: 'rim', key: 's' },
  { voice: 'cowbell', key: 'd' },
  { voice: 'noise', key: 'f' },
]

export function DrumPad() {
  const { t } = useTranslation()
  const [active, setActive] = useState<Voice | null>(null)

  const hit = useCallback((voice: Voice) => {
    play(voice)
    setActive(voice)
    window.setTimeout(() => setActive((v) => (v === voice ? null : v)), 120)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (e.repeat || e.metaKey || e.ctrlKey || target?.closest('input, textarea, select')) return
      const pad = pads.find((p) => p.key === e.key.toLowerCase())
      if (pad) hit(pad.voice)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hit])

  return (
    <div className="grid grid-cols-4 gap-2">
      {pads.map((p) => (
        <button
          key={p.voice}
          type="button"
          onPointerDown={() => hit(p.voice)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              hit(p.voice)
            }
          }}
          aria-keyshortcuts={p.key.toUpperCase()}
          className={`flex aspect-square flex-col items-center justify-center rounded-md border text-sm font-semibold transition-all ${
            active === p.voice ? 'scale-95 border-accent bg-accent text-accent-fg' : 'border-line bg-surface-2 hover:border-accent'
          }`}
        >
          {t(`lab.drum.${p.voice}`)}
          <kbd className="mt-1 font-mono text-[11px] opacity-70">{p.key.toUpperCase()}</kbd>
        </button>
      ))}
    </div>
  )
}
