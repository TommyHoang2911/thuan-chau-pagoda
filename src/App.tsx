import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Events from './pages/Events'
import CauSieu from './pages/CauSieu'
import Chat from './pages/Chat'
import About from './pages/About'
import type { TabId } from './types'

export default function App() {
  // Mặc định vào thẳng Chat — như Zalo OA
  const [tab, setTab] = useState<TabId>('chat')

  const handleNotif = async () => {
    if (!('Notification' in window)) return
    const perm = await Notification.requestPermission()
    if (perm === 'granted') {
      new Notification('Chùa Thuận Châu 🙏', {
        body: 'Bạn sẽ nhận thông báo sự kiện từ chùa.',
        icon: '/thuan-chau-pagoda/icon-192.png',
      })
    }
  }

  const changeTab = (t: TabId) => {
    setTab(t)
    if (t !== 'chat') {
      setTimeout(() => {
        document.getElementById(`panel-${t}`)?.scrollTo({ top: 0, behavior: 'smooth' })
      }, 50)
    }
  }

  return (
    <div className="flex flex-col" style={{ height: '100dvh', background: '#f0f2f5' }}>

      <Header onNotif={handleNotif} activeTab={tab} />

      <main className="flex-1 overflow-hidden relative">

        {/* Chat — full height, flex column */}
        <div className={`absolute inset-0 flex flex-col ${tab === 'chat' ? '' : 'hidden'}`}>
          <Chat onNavigate={t => changeTab(t as TabId)} />
        </div>

        {/* Events */}
        <div id="panel-events"
          className={`absolute inset-0 overflow-y-auto bg-[#f5f5f5] ${tab === 'events' ? '' : 'hidden'}`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <div className="pb-4 animate-[fadeUp_.2s_ease]"><Events /></div>
        </div>

        {/* Cầu siêu */}
        <div id="panel-causieu"
          className={`absolute inset-0 overflow-y-auto bg-[#f5f5f5] ${tab === 'causieu' ? '' : 'hidden'}`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <div className="pb-4 animate-[fadeUp_.2s_ease]"><CauSieu /></div>
        </div>

        {/* About */}
        <div id="panel-about"
          className={`absolute inset-0 overflow-y-auto bg-[#f5f5f5] ${tab === 'about' ? '' : 'hidden'}`}
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
          <div className="pb-4 animate-[fadeUp_.2s_ease]"><About /></div>
        </div>

      </main>

      <BottomNav active={tab} onChange={changeTab} />
    </div>
  )
}
