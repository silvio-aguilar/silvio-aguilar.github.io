import { ImageUp } from 'lucide-react'
import { useId, useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { buttonVariants } from '../../components/ui/buttonStyles'
import { dominantColors } from './color'
import { useCopy } from './useCopy'

const SAMPLE_SIZE = 96

export function PaletteExtractor() {
  const { t } = useTranslation()
  const inputId = useId()
  const [colors, setColors] = useState<string[]>([])
  const [preview, setPreview] = useState<string | null>(null)
  const { copied, copy } = useCopy()

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, SAMPLE_SIZE / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    setColors(dominantColors(ctx.getImageData(0, 0, canvas.width, canvas.height).data))
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(file))
    bitmap.close()
  }

  return (
    <div className="space-y-4">
      <label htmlFor={inputId} className={`${buttonVariants.secondary} cursor-pointer`}>
        <ImageUp size={16} aria-hidden="true" /> {t('lab.palette.pick')}
      </label>
      <input id={inputId} type="file" accept="image/*" className="sr-only" onChange={onFile} />
      <div className="flex gap-4">
        {preview ? (
          <img src={preview} alt="" className="h-28 w-28 shrink-0 rounded object-cover" />
        ) : (
          <p className="text-sm text-muted">{t('lab.palette.empty')}</p>
        )}
        <ul className="grid flex-1 grid-cols-4 gap-2">
          {colors.map((c) => (
            <li key={c}>
              <button
                type="button"
                onClick={() => void copy(c)}
                className="w-full overflow-hidden rounded border border-line text-left"
                title={`${t('lab.palette.copy')} ${c}`}
              >
                <span className="block h-10" style={{ backgroundColor: c }} />
                <span className="block px-1.5 py-1 font-mono text-[11px]">
                  {copied === c ? t('lab.palette.copied') : c}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
