import type { Event } from '../types'

export default function EventCard({ ev, delay = 0 }: { ev: Event; delay?: number }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md border border-amber-200/40
        hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:scale-[.98]"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* image / hero */}
      <div className="h-36 bg-gradient-to-br from-[#3d1a00] to-[#6b2d00] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(200,151,58,.3) 20px,rgba(200,151,58,.3) 22px)' }} />
        <span className="text-5xl relative z-10">{ev.emoji}</span>
        <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-bold tracking-wider
          bg-orange-600 text-white px-2.5 py-1 rounded-full uppercase">
          {ev.badge}
        </span>
      </div>

      {/* body */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-[11px] font-bold text-white bg-gradient-to-r from-orange-600 to-[#7a1c1c] px-2.5 py-1 rounded-md">
            {ev.day} {ev.month}
          </span>
          <span className="text-[11.5px] text-orange-700 italic">⏰ {ev.time}</span>
        </div>
        <h3 className="font-['Cormorant_Garamond'] text-[17px] font-bold text-stone-900 mb-1.5 leading-snug">
          {ev.title}
        </h3>
        <p className="text-[13px] text-stone-600 leading-relaxed line-clamp-2">{ev.desc}</p>
      </div>

      {/* footer */}
      <div className="px-4 py-2.5 border-t border-amber-100 flex justify-between items-center">
        <span className="text-[11.5px] text-stone-400">📍 {ev.loc}</span>
      </div>
    </div>
  )
}
