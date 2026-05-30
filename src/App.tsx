import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Events from './pages/Events'
import CauSieu from './pages/CauSieu'
import Chat from './pages/Chat'
import About from './pages/About'
import type { TabId } from './types'

export default function App() {
  const [tab, setTab] = useState<TabId>('events')

  const handleNotif = async () => {
    if (!('Notification' in window)) return
    const perm = await Notification.requestPermission()
    if (perm === 'granted') {
      new Notification('Chùa Thuận Châu 🙏', {
        body: 'Bạn sẽ nhận thông báo sự kiện từ chùa.',
        icon: '/thuan-chau-pagoda/icon-192.png'
      })
    }
  }

  const changeTab = (t: TabId) => {
    setTab(t)
    // scroll về đầu cho các tab cuộn dọc
    if (t !== 'chat') {
      setTimeout(() => {
        document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <div className="flex flex-col bg-amber-50"
      style={{ height: '100dvh' }}>   {/* dvh = dynamic viewport height — tránh bị che bởi browser UI */}

      <Header onNotif={handleNotif} />

      {/* main scroll area — pb đủ để content không bị nav che */}
      <main
        id="main-scroll"
        className="flex-1 overflow-hidden relative"
      >
        {/* ── Scrollable tabs (events, causieu, about) ── */}
        <div className={`absolute inset-0 overflow-y-auto overflow-x-hidden ${tab === 'events' ? 'block' : 'hidden'}`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <div className="animate-[fadeUp_.25s_ease] pb-4">
            <Events />
          </div>
        </div>

        <div className={`absolute inset-0 overflow-y-auto overflow-x-hidden ${tab === 'causieu' ? 'block' : 'hidden'}`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <div className="animate-[fadeUp_.25s_ease] pb-4">
            <CauSieu />
          </div>
        </div>

        {/* ── Chat: không cuộn ngoài, tự quản lý height bên trong ── */}
        <div className={`absolute inset-0 flex flex-col ${tab === 'chat' ? 'flex' : 'hidden'}`}>
          <div className="animate-[fadeUp_.25s_ease] flex flex-col flex-1 overflow-hidden">
            <Chat onNavigate={t => changeTab(t as TabId)} />
          </div>
        </div>

        <div className={`absolute inset-0 overflow-y-auto overflow-x-hidden ${tab === 'about' ? 'block' : 'hidden'}`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <div className="animate-[fadeUp_.25s_ease] pb-4">
            <About />
          </div>
        </div>
      </main>

      <BottomNav active={tab} onChange={changeTab} />
    </div>
  )
}
