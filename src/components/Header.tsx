// Header theo phong cách Zalo OA:
// - Xanh lá đặc trưng, avatar tròn bên trái
// - Tên OA + trạng thái "Đang hoạt động"
// - Icon search + menu bên phải
import { useState } from 'react'

interface Props { onNotif: () => void; activeTab: string }

export default function Header({ onNotif, activeTab }: Props) {
  const [notifOn, setNotifOn] = useState(false)

  // Tiêu đề động theo tab
  const TITLES: Record<string, string> = {
    chat:    'Chùa Thuận Châu',
    events:  'Sự Kiện & Thông Báo',
    causieu: 'Đăng Ký Cầu Siêu',
    about:   'Thông Tin Chùa',
  }

  const isChat = activeTab === 'chat'

  return (
    <header
      className="flex-shrink-0 z-50"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: '#1a4a2a',
        boxShadow: '0 1px 0 rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">

        {/* Avatar + tên — kiểu Zalo chat header */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <img
              src="/thuan-chau-pagoda/logo.png"
              alt="Chùa Thuận Châu"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: '2px solid rgba(255,255,255,0.25)' }}
            />
            {/* online dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400
              border-2 border-[#1a4a2a]" />
          </div>

          <div className="min-w-0">
            <h1 className="text-white font-semibold text-[15px] leading-tight truncate"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
              {TITLES[activeTab] ?? 'Chùa Thuận Châu'}
            </h1>
            {isChat && (
              <p className="text-[11px] text-emerald-300 mt-px">Đang hoạt động</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => { setNotifOn(true); onNotif() }}
            className="relative w-8 h-8 rounded-full flex items-center justify-center
              text-white/80 hover:bg-white/15 transition text-[17px]"
          >
            🔔
            {notifOn && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full
                bg-red-500 border border-[#1a4a2a]" />
            )}
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center
            text-white/80 hover:bg-white/15 transition text-[17px]">
            ⋮
          </button>
        </div>
      </div>
    </header>
  )
}
