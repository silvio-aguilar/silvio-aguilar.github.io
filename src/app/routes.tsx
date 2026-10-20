import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router'
import { Layout } from '../features/layout/Layout'
import { detectLang, isLang } from '../i18n'
import CvPage from '../pages/CvPage'
import HomePage from '../pages/HomePage'
import LabPage from '../pages/LabPage'
import NotFoundPage from '../pages/NotFoundPage'

/** "/" → preferred language. The prerendered root does the same with an inline script. */
function RootRedirect() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(`/${detectLang()}/`, { replace: true })
  }, [navigate])
  return null
}

function LangGuard() {
  const { lang } = useParams()
  if (!isLang(lang)) return <Navigate to="/es/" replace />
  return <Layout />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<RootRedirect />} />
      <Route path=":lang" element={<LangGuard />}>
        <Route index element={<HomePage />} />
        <Route path="cv" element={<CvPage />} />
        <Route path="lab" element={<LabPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
