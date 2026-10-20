import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SegmentedControl } from '../../components/ui/SegmentedControl'
import { useTheme, type ThemePref } from './store'

export function ThemeToggle() {
  const { t } = useTranslation()
  const pref = useTheme((s) => s.pref)
  const setPref = useTheme((s) => s.setPref)
  const opt = (value: ThemePref, Icon: typeof Sun) => ({
    value,
    title: t(`theme.${value}`),
    label: (
      <>
        <Icon size={14} aria-hidden="true" />
        <span className="sr-only">{t(`theme.${value}`)}</span>
      </>
    ),
  })
  return (
    <SegmentedControl
      label={t('theme.label')}
      value={pref}
      onChange={setPref}
      options={[opt('light', Sun), opt('dark', Moon), opt('system', Monitor)]}
    />
  )
}
