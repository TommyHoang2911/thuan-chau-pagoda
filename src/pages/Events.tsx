import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { loadEvents } from '../lib/firebase'
import type { Event } from '../types'

const MOCK: Event[] = [
  { id:'1', emoji:'🌸', badge:'Lễ hội',  day:'15', month:'Tháng 6',    date:'2026-06-15', time:'07:00 – 11:00', title:'Lễ Vía Đức Phật A Di Đà',   desc:'Tụng kinh, cúng dường hoa đăng và thuyết pháp. Phật tử xa gần kính mời về tham dự.', loc:'Chánh Điện' },
  { id:'2', emoji:'🧘', badge:'Khóa tu', day:'20', month:'Tháng 6',    date:'2026-06-20', time:'06:00 – 17:00', title:'Khóa Tu Một Ngày An Lạc',    desc:'Tọa thiền, tụng kinh, ăn chay và nghe pháp thoại tại khuôn viên chùa.',             loc:'Toàn khuôn viên' },
  { id:'3', emoji:'🙏', badge:'Cầu an',  day:'01', month:'Tháng 7',    date:'2026-07-01', time:'08:00 – 10:00', title:'Lễ Cầu An Đầu Tháng',        desc:'Lễ cầu an định kỳ đầu tháng âm lịch.',                                             loc:'Chánh Điện' },
  { id:'4', emoji:'🏮', badge:'Đại lễ',  day:'15', month:'Tháng 7 ÂL', date:'2026-08-09', time:'Cả ngày',       title:'Đại Lễ Vu Lan – Báo Hiếu',   desc:'Cầu siêu hương linh, bông hồng cài áo, đêm văn nghệ Phật giáo.',                  loc:'Toàn khuôn viên' },
]

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents().then(data => {
      setEvents(data.length ? data : MOCK)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* hero */}
      <div className="relative bg-gradient-to-br from-[#3d1a00] via-[#6b2d00] to-[#4a1500] text-center py-6 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(200,151,58,.4) 24px,rgba(200,151,58,.4) 26px)' }}/>
        <h2 className="font-['Cormorant_Garamond'] text-[22px] font-bold text-amber-200 relative">🗓️ Sự Kiện & Thông Báo</h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2.5"/>
        <p className="text-[12px] text-amber-200/70 italic relative">Lịch lễ hội, khóa tu và hoạt động tại chùa</p>
      </div>

      {/* install prompt */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-[#3d1a00] to-[#6b2d00] rounded-2xl p-4 flex items-center gap-3 shadow-lg">
        <div className="flex-1">
          <p className="text-amber-200 text-[13.5px] font-semibold">📱 Cài app về màn hình chính</p>
          <p className="text-amber-200/65 text-[11.5px] mt-0.5">Nhận thông báo sự kiện tức thì</p>
        </div>
        <button className="bg-amber-400 text-[#3d1a00] text-[12px] font-bold px-3 py-2 rounded-lg whitespace-nowrap hover:bg-amber-300 transition">
          Cài đặt
        </button>
      </div>

      {/* cards */}
      <div className="p-4 flex flex-col gap-4">
        {loading
          ? Array.from({length:3}).map((_,i) => (
              <div key={i} className="h-48 rounded-2xl bg-gradient-to-r from-amber-100 to-amber-50 animate-pulse"/>
            ))
          : events.map((ev, i) => <EventCard key={ev.id} ev={ev} delay={i * 60} />)
        }
      </div>
    </div>
  )
}
