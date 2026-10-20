import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes } from './app/routes'
import type { Lang } from './content/types'
import i18n from './i18n'

export { resources } from './i18n'
export { featured, getContent } from './content'
export { cvData } from './features/cv/cvData'

export async function render(url: string, lang: Lang): Promise<string> {
  await i18n.changeLanguage(lang)
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
