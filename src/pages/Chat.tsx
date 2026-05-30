import { useState, useEffect, useRef } from 'react'

interface Msg {
  role: 'bot' | 'user'
  text?: string
  card?: 'welcome'
  time: string
}
interface Step { msg: string; options: string[]; action?: string }
type Flow = Record<string, Step>

const FLOW: Flow = {
  start: {
    msg: 'Chào mừng quý Phật tử! 🙏\nCon có thể giúp gì cho quý vị hôm nay?',
    options: ['📅 Lịch sự kiện', '🕯️ Đăng ký cầu siêu', '⏰ Giờ tụng kinh', '📍 Địa chỉ & bản đồ', '❓ Hỏi thêm']
  },
  '📅 Lịch sự kiện': {
    msg: 'Các sự kiện sắp tới tại chùa:\n\n🌸 15/6 — Lễ Vía Phật A Di Đà (07:00)\n🧘 20/6 — Khóa Tu Một Ngày (06:00)\n🙏 01/7 — Lễ Cầu An đầu tháng\n🏮 15/7 ÂL — Đại Lễ Vu Lan',
    options: ['🌸 Lễ Vía A Di Đà', '🧘 Khóa Tu An Lạc', '🏮 Đại Lễ Vu Lan', '⬅️ Quay lại']
  },
  '🌸 Lễ Vía A Di Đà': {
    msg: '🌸 Lễ Vía Đức Phật A Di Đà\n📅 15 tháng 6 · ⏰ 07:00–11:00\n📍 Chánh Điện\n\nTụng kinh, cúng dường hoa đăng, thuyết pháp.\nTrang phục lịch sự.',
    options: ['📅 Xem sự kiện khác', '⬅️ Quay lại']
  },
  '🧘 Khóa Tu An Lạc': {
    msg: '🧘 Khóa Tu Một Ngày An Lạc\n📅 20 tháng 6 · ⏰ 06:00–17:00\n📍 Toàn khuôn viên\n\nTọa thiền · Tụng kinh · Ăn chay · Nghe pháp\nSố lượng có hạn, đăng ký trước.',
    options: ['📅 Xem sự kiện khác', '⬅️ Quay lại']
  },
  '🏮 Đại Lễ Vu Lan': {
    msg: '🏮 Đại Lễ Vu Lan – Báo Hiếu\n📅 14–15 tháng 7 âm lịch\n\nLễ cầu siêu hương linh · Bông hồng cài áo\nĐêm văn nghệ Phật giáo\n\n⚠️ Danh sách cầu siêu nhận trước 13/7 ÂL.',
    options: ['🕯️ Đăng ký cầu siêu', '⬅️ Quay lại']
  },
  '🕯️ Đăng ký cầu siêu': {
    msg: 'Quý vị có thể gửi danh sách hương linh cầu siêu trực tiếp qua tab Cầu Siêu.\n\nBan hộ tự sẽ tiếp nhận và đọc trong buổi lễ.',
    options: ['📝 Đến tab Cầu Siêu', '⬅️ Quay lại']
  },
  '📝 Đến tab Cầu Siêu': { msg: 'Kính chuyển quý vị đến form đăng ký...', options: [], action: 'causieu' },
  '⏰ Giờ tụng kinh': {
    msg: '⏰ Lịch tụng kinh thường nhật:\n\n🌅 05:30 — Tụng kinh sáng\n🌇 17:30 — Tụng kinh chiều\n📖 Chủ Nhật 08:00 — Sinh hoạt Phật tử\n🌕 Rằm & Mùng Một — Lễ đặc biệt',
    options: ['📅 Lịch sự kiện', '⬅️ Quay lại']
  },
  '📍 Địa chỉ & bản đồ': {
    msg: '📍 Chùa Thuận Châu\n220 Đống Đa, Hải Châu\nTP. Đà Nẵng\n\n⏰ Mở cửa: 05:00 – 18:30 hàng ngày',
    options: ['🗺️ Mở Google Maps', '⬅️ Quay lại']
  },
  '🗺️ Mở Google Maps': { msg: 'Đang mở Google Maps...', options: ['⬅️ Quay lại'], action: 'maps' },
  '❓ Hỏi thêm': {
    msg: 'Xin liên hệ trực tiếp với ban hộ tự tại:\n\n📍 220 Đống Đa, Hải Châu, Đà Nẵng\n⏰ Tiếp khách: 08:00 – 17:00\n\nBan hộ tự luôn sẵn lòng hỗ trợ quý Phật tử.',
    options: ['⬅️ Quay lại']
  },
  '📅 Xem sự kiện khác': { msg: '', options: [], action: 'events_menu' },
  '⬅️ Quay lại':         { msg: '', options: [], action: 'start' },
}

const nowTime = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

interface Props { onNavigate: (tab: string) => void }

function WelcomeCard() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm"
      style={{ border: '1px solid #e8e8e8', background: '#fff', maxWidth: 260 }}>
      <img src="/thuan-chau-pagoda/banner.jpg" alt="Chùa Thuận Châu"
        className="w-full object-cover" style={{ height: 110 }}/>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <img src="/thuan-chau-pagoda/logo.png" alt=""
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            style={{ border: '1.5px solid #c8973a' }}/>
          <div>
            <p className="font-semibold text-[13.5px] text-stone-900 leading-tight">Chùa Thuận Châu</p>
            <p className="text-[10.5px] text-stone-400">Thuận Châu Pagoda</p>
          </div>
        </div>
        <div className="space-y-1 text-[12px] text-stone-600">
          <p>📍 220 Đống Đa, Hải Châu, Đà Nẵng</p>
          <p>⏰ Mở cửa: 05:00 – 18:30 hàng ngày</p>
          <p>🙏 Phật Giáo Việt Nam</p>
        </div>
        <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex gap-2">
          <a href="https://maps.google.com/?q=220+Đống+Đa,+Hải+Châu,+Đà+Nẵng"
            target="_blank" rel="noreferrer"
            className="flex-1 text-center text-[11.5px] font-semibold py-1.5 rounded-lg"
            style={{ color: '#1a4a2a', background: '#e8f5e9' }}>
            🗺️ Bản đồ
          </a>
          <button className="flex-1 text-[11.5px] font-semibold py-1.5 rounded-lg"
            style={{ color: '#fff', background: '#1a4a2a' }}>
            📞 Liên hệ
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Chat({ onNavigate }: Props) {
  const [msgs, setMsgs]       = useState<Msg[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [typing, setTyping]   = useState(false)
  const bottomRef             = useRef<HTMLDivElement>(null)
  const initialized           = useRef(false)

  const scrollBottom = (delay = 80) =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), delay)

  const runStep = (key: string) => {
    const step = FLOW[key]
    if (!step) return
    if (step.action === 'start')       { runStep('start'); return }
    if (step.action === 'events_menu') { runStep('📅 Lịch sự kiện'); return }
    if (step.action === 'maps')        { window.open('https://maps.google.com/?q=220+Đống+Đa,+Hải+Châu,+Đà+Nẵng', '_blank') }
    if (step.action === 'causieu')     { onNavigate('causieu'); return }
    if (!step.msg) return

    setOptions([])
    setTyping(true)
    scrollBottom()
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { role: 'bot', text: step.msg, time: nowTime() }])
      setOptions(step.options)
      scrollBottom()
    }, 800)
  }

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    setMsgs([{ role: 'bot', card: 'welcome', time: nowTime() }])
    setTimeout(() => {
      setTyping(true)
      scrollBottom()
      setTimeout(() => {
        setTyping(false)
        setMsgs(m => [...m, { role: 'bot', text: FLOW.start.msg, time: nowTime() }])
        setOptions(FLOW.start.options)
        scrollBottom()
      }, 1000)
    }, 600)
  }, [])

  const pick = (opt: string) => {
    setMsgs(m => [...m, { role: 'user', text: opt, time: nowTime() }])
    setOptions([])
    setTimeout(() => runStep(opt), 400)
  }

  const BotAvatar = () => (
    <img src="/thuan-chau-pagoda/logo.png" alt=""
      className="w-7 h-7 rounded-full object-cover flex-shrink-0 self-end mb-0.5"
      style={{ border: '1.5px solid #c8973a' }}/>
  )

  return (
    <div className="flex flex-col" style={{ height: '100%', background: '#f0f2f5' }}>

      {/* ── Messages — chiếm toàn bộ không gian còn lại ── */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2"
        style={{ overscrollBehavior: 'contain', minHeight: 0 }}
      >
        {/* date divider */}
        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-stone-200"/>
          <span className="text-[10.5px] text-stone-400 px-2">
            {new Date().toLocaleDateString('vi-VN', { weekday:'long', day:'numeric', month:'long' })}
          </span>
          <div className="flex-1 h-px bg-stone-200"/>
        </div>

        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'items-end'}`}>
            {m.role === 'bot' && <BotAvatar />}
            <div
              className={`flex flex-col gap-0.5 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              style={{ maxWidth: '78%' }}
            >
              {m.card === 'welcome' && <WelcomeCard />}
              {m.text && (
                <div
                  className={`px-3 py-2 text-[14px] leading-relaxed whitespace-pre-line ${
                    m.role === 'bot'
                      ? 'rounded-2xl rounded-bl-sm bg-white text-stone-800 shadow-sm'
                      : 'rounded-2xl rounded-br-sm text-white'
                  }`}
                  style={m.role === 'user'
                    ? { background: '#1a4a2a' }
                    : { border: '1px solid #ebebeb' }
                  }
                >
                  {m.text}
                </div>
              )}
              <span className="text-[10px] text-stone-400 px-0.5">{m.time}</span>
            </div>
          </div>
        ))}

        {/* typing dots */}
        {typing && (
          <div className="flex gap-2 items-end">
            <BotAvatar />
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1.5 items-center"
              style={{ border: '1px solid #ebebeb' }}>
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-stone-300 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}/>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      {/* ── Quick reply — cố định ở dưới, scroll ngang nếu nhiều ── */}
      {options.length > 0 && (
        <div
          className="flex-shrink-0 bg-white"
          style={{ borderTop: '1px solid #e8e8e8' }}
        >
          {/* Scroll ngang khi nhiều options — không wrap sang dòng mới */}
          <div
            className="flex gap-2 px-3 py-2.5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            {options.map(o => (
              <button
                key={o}
                onClick={() => pick(o)}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium
                  transition-all active:scale-95 active:bg-[#1a4a2a] active:text-white"
                style={{
                  border: '1.5px solid #1a4a2a',
                  color: '#1a4a2a',
                  background: '#fff',
                  whiteSpace: 'nowrap',
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
