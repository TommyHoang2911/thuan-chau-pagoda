import { useState } from 'react'

interface Props { onNotif: () => void }

export default function Header({ onNotif }: Props) {
  const [notifOn, setNotifOn] = useState(false)

  const handleNotif = () => { setNotifOn(true); onNotif() }

  return (
    <header className="sticky top-0 z-50 flex-shrink-0 bg-gradient-to-r from-[#3d1a00] to-[#6b2d00] text-amber-200 shadow-lg"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-[float_5s_ease-in-out_infinite]">☸</span>
          <div>
            <h1 className="font-['Cormorant_Garamond'] text-[17px] font-bold tracking-wide leading-tight">
              Chùa Thuận Châu
            </h1>
            <p className="text-[10.5px] text-amber-200/60 italic mt-0.5">
              220 Đống Đa, Hải Châu, Đà Nẵng
            </p>
          </div>
        </div>
        <button
          onClick={handleNotif}
          className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-lg"
        >
          🔔
          {notifOn && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 border-2 border-[#3d1a00]" />
          )}
        </button>
      </div>
      {/* gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
    </header>
  )
}
