import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import LoginScreen from './components/LoginScreen'
import Sidebar, { type AdminTab } from './components/Sidebar'
import { ToastContainer, useToast } from './components/Toast'
import Dashboard from './pages/Dashboard'
import EventsAdmin from './pages/Events'
import CauSieuAdmin from './pages/CauSieu'
import Push from './pages/Push'

export default function AdminApp() {
  const { user, loading } = useAuth()
  const [tab, setTab] = useState<AdminTab>('dashboard')
  const { toasts, toast } = useToast()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(160deg,#1a4a2a,#2d6a3f)' }}>
      <div className="flex flex-col items-center gap-4">
        <img src="/thuan-chau-pagoda/logo.png" className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-400/40 animate-pulse" alt=""/>
        <div className="w-6 h-6 border-2 border-white/30 border-t-amber-400 rounded-full animate-spin"/>
      </div>
    </div>
  )

  if (!user) return <LoginScreen />

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      <Sidebar active={tab} onChange={setTab} user={user} />

      <main className="flex-1 overflow-y-auto">
        {/* top bar */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-stone-100 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-[13px] text-stone-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-stone-700 font-semibold capitalize">{tab}</span>
          </div>
          <a href="/thuan-chau-pagoda/" target="_blank"
            className="flex items-center gap-1.5 text-[12.5px] text-[#1a4a2a] font-semibold hover:opacity-75 transition">
            🌐 Xem app <span className="text-stone-400">↗</span>
          </a>
        </div>

        <div className="p-8 max-w-5xl">
          {tab === 'dashboard' && <Dashboard />}
          {tab === 'events'    && <EventsAdmin toast={toast} />}
          {tab === 'causieu'   && <CauSieuAdmin toast={toast} />}
          {tab === 'push'      && <Push toast={toast} />}
        </div>
      </main>

      <ToastContainer toasts={toasts} />
    </div>
  )
}
