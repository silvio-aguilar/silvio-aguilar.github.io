import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AppRoutes } from './app/routes'
import i18n, { isLang } from './i18n'
import './index.css'

const first = location.pathname.split('/')[1]
if (isLang(first)) void i18n.changeLanguage(first)

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)

const root = document.getElementById('root')!
// Hydrate only when the prerendered HTML belongs to this URL (404.html and the root do not)
const route = document.documentElement.dataset.route
const path = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`
if (root.firstElementChild && route === path) hydrateRoot(root, app)
else createRoot(root).render(app)
