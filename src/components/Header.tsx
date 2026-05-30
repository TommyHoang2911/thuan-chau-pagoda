import { useState } from 'react'

interface Props { onNotif: () => void }

export default function Header({ onNotif }: Props) {
  const [notifOn, setNotifOn] = useState(false)

  const handleNotif = () => { setNotifOn(true); onNotif() }

  return (
    <header
      className="sticky top-0 z-50 flex-shrink-0 shadow-lg"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)', background: 'linear-gradient(135deg, #1a4a2a 0%, #2d6a3f 50%, #1a4a2a 100%)' }}
    >
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/thuan-chau-pagoda/logo.png"
            alt="Chùa Thuận Châu"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/60 shadow-md"
          />
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-[17px] font-bold tracking-wide leading-tight text-amber-200">
              Chùa Thuận Châu
            </h1>
            <p className="text-[10.5px] italic mt-0.5 text-amber-200/60">
              220 Đống Đa, Hải Châu, Đà Nẵng
            </p>
          </div>
        </div>

        {/* Notification bell */}
        <button
          onClick={handleNotif}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-lg transition hover:bg-white/15"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          title="Bật thông báo"
        >
          🔔
          {notifOn && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-400 border-2 border-[#1a4a2a]" />
          )}
        </button>
      </div>

      {/* Gold divider line */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #c8973a, transparent)' }} />
    </header>
  )
}
