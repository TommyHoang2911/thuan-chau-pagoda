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

  return (
    <div className="flex flex-col h-screen bg-amber-50 overflow-hidden">
      <Header onNotif={handleNotif} />

      <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
        <div className={tab === 'events'  ? 'block animate-[fadeUp_.25s_ease]' : 'hidden'}><Events /></div>
        <div className={tab === 'causieu' ? 'block animate-[fadeUp_.25s_ease]' : 'hidden'}><CauSieu /></div>
        <div className={tab === 'chat'    ? 'flex flex-col h-full animate-[fadeUp_.25s_ease]' : 'hidden'}><Chat onNavigate={t => setTab(t as TabId)} /></div>
        <div className={tab === 'about'   ? 'block animate-[fadeUp_.25s_ease]' : 'hidden'}><About /></div>
      </main>

      <BottomNav active={tab} onChange={t => { setTab(t); window.scrollTo(0,0) }} />
    </div>
  )
}
