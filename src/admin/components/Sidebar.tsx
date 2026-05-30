import type { User } from 'firebase/auth'
import { logoutUser } from '../../lib/firebase'

export type AdminTab = 'dashboard' | 'events' | 'causieu' | 'push'

const NAV: { id: AdminTab; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '📊', label: 'Tổng quan'        },
  { id: 'events',    icon: '📅', label: 'Sự kiện'          },
  { id: 'causieu',   icon: '📜', label: 'Cầu siêu'         },
  { id: 'push',      icon: '🔔', label: 'Push Notification' },
]

interface Props { active: AdminTab; onChange: (t: AdminTab) => void; user: User }

export default function Sidebar({ active, onChange, user }: Props) {
  return (
    <aside className="flex flex-col w-56 flex-shrink-0 h-full"
      style={{ background: 'linear-gradient(180deg,#1a4a2a 0%,#2d6a3f 100%)' }}>

      {/* header */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-1">
          <img src="/thuan-chau-pagoda/logo.png" alt=""
            className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400/50"/>
          <div>
            <p className="text-amber-200 font-['Cormorant_Garamond'] text-[15px] font-bold leading-tight">Chùa Thuận Châu</p>
            <p className="text-amber-200/50 text-[10px] italic">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV.map(n => (
          <button key={n.id} onClick={() => onChange(n.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left text-[13.5px] font-medium transition-all relative
              ${active === n.id
                ? 'bg-white/15 text-amber-200 font-semibold'
                : 'text-amber-200/60 hover:bg-white/8 hover:text-amber-200/90'}`}>
            {active === n.id && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-400 rounded-r-full"/>
            )}
            <span className="text-[17px]">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* user footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 mb-3">
          {user.photoURL
            ? <img src={user.photoURL} className="w-8 h-8 rounded-full ring-2 ring-amber-400/30" alt=""/>
            : <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 text-sm font-bold">
                {user.displayName?.[0] ?? '?'}
              </div>
          }
          <div className="min-w-0">
            <p className="text-amber-200 text-[12px] font-semibold truncate">{user.displayName ?? user.email}</p>
            <p className="text-amber-200/45 text-[10px]">Administrator</p>
          </div>
        </div>
        <button onClick={logoutUser}
          className="w-full py-2 rounded-xl border border-white/15 text-amber-200/60 text-[12px]
            hover:bg-white/10 hover:text-amber-200 transition-all">
          🚪 Đăng xuất
        </button>
      </div>
    </aside>
  )
}
