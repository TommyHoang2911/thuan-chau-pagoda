import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import { requestPushPermission, onForegroundMessage } from './lib/firebase'
import Events from './pages/Events'
import CauSieu from './pages/CauSieu'
import Chat from './pages/Chat'
import About from './pages/About'
import type { TabId } from './types'

export default function App() {
  const [tab, setTab] = useState<TabId>('chat')

  const handleNotif = async () => {
    const token = await requestPushPermission()
    if (token) {
      new Notification('Chùa Thuận Châu 🙏', {
        body: 'Đã bật thông báo. Bạn sẽ nhận tin từ chùa!',
        icon: '/thuan-chau-pagoda/icon-192.png',
      })
    }
  }

  // Foreground push → hiện native notification
  onForegroundMessage((payload: unknown) => {
    const p = payload as { notification?: { title?: string; body?: string } }
    const title = p?.notification?.title ?? 'Chùa Thuận Châu'
    const body  = p?.notification?.body  ?? 'Có thông báo mới từ chùa.'
    new Notification(title, { body, icon: '/thuan-chau-pagoda/icon-192.png' })
  })

  const changeTab = (t: TabId) => {
    setTab(t)
    if (t !== 'chat') {
      setTimeout(() => {
        document.getElementById(`panel-${t}`)?.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    // #root đã là position:fixed + safe area từ CSS
    // App chỉ cần flex-col flex-1 — không cần height ở đây
    <>
      <Header onNotif={handleNotif} activeTab={tab} />

      {/* Main: flex-1 để lấp đầy khoảng giữa header và nav */}
      <main
        className="flex-1 overflow-hidden relative"
        style={{ background: '#f0f2f5' }}
      >
        {/* Chat */}
        <div className={`absolute inset-0 flex flex-col ${tab === 'chat' ? '' : 'hidden'}`}>
          <Chat onNavigate={t => changeTab(t as TabId)} />
        </div>

        {/* Events */}
        <div
          id="panel-events"
          className={`absolute inset-0 overflow-y-auto ${tab === 'events' ? '' : 'hidden'}`}
          style={{ background: '#f5f5f5', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <div className="pb-6 animate-[fadeUp_.2s_ease]"><Events /></div>
        </div>

        {/* Cầu siêu */}
        <div
          id="panel-causieu"
          className={`absolute inset-0 overflow-y-auto ${tab === 'causieu' ? '' : 'hidden'}`}
          style={{ background: '#f5f5f5', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <div className="pb-6 animate-[fadeUp_.2s_ease]"><CauSieu /></div>
        </div>

        {/* About */}
        <div
          id="panel-about"
          className={`absolute inset-0 overflow-y-auto ${tab === 'about' ? '' : 'hidden'}`}
          style={{ background: '#f5f5f5', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <div className="pb-6 animate-[fadeUp_.2s_ease]"><About /></div>
        </div>
      </main>

      <BottomNav active={tab} onChange={changeTab} />
    </>
  )
}
