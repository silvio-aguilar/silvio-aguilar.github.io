import { Copy, Shuffle } from 'lucide-react'
import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '../../components/ui/buttonStyles'
import { randomHex, stripesCss } from './color'
import { useCopy } from './useCopy'

export function PatternGenerator() {
  const { t } = useTranslation()
  const ids = { angle: useId(), width: useId() }
  const [colors, setColors] = useState(['#f5c518', '#16150f', '#ff6b6f'])
  const [angle, setAngle] = useState(45)
  const [width, setWidth] = useState(18)
  const { copied, copy } = useCopy()
  const css = stripesCss(colors, angle, width)

  return (
    <div className="space-y-4">
      <div className="h-36 rounded border border-line" style={{ backgroundImage: css }} />
      <div className="grid gap-3 sm:grid-cols-2">
        <label htmlFor={ids.angle} className="text-sm">
          {t('lab.pattern.angle')}: <span className="font-mono">{angle}°</span>
          <input
            id={ids.angle}
            type="range"
            min={0}
            max={180}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="mt-1 block w-full accent-[var(--accent)]"
          />
        </label>
        <label htmlFor={ids.width} className="text-sm">
          {t('lab.pattern.stripes')}: <span className="font-mono">{width}px</span>
          <input
            id={ids.width}
            type="range"
            min={4}
            max={60}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="mt-1 block w-full accent-[var(--accent)]"
          />
        </label>
      </div>
      <p className="break-all rounded bg-surface-2 p-2 font-mono text-[11px] text-muted">{css}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonVariants.primary}
          onClick={() => setColors([randomHex(), randomHex(), randomHex()])}
        >
          <Shuffle size={16} aria-hidden="true" /> {t('lab.pattern.generate')}
        </button>
        <button
          type="button"
          className={buttonVariants.secondary}
          onClick={() => void copy(`background-image: ${css};`)}
        >
          <Copy size={16} aria-hidden="true" />{' '}
          {copied ? t('lab.palette.copied') : t('lab.pattern.copyCss')}
        </button>
      </div>
    </div>
  )
}
