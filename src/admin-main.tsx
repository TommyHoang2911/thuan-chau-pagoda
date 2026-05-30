import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminApp from './admin/AdminApp'
import ErrorBoundary from './admin/components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AdminApp />
    </ErrorBoundary>
  </StrictMode>
)
