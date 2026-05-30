export default function About() {
  return (
    <div>
      <div className="relative bg-gradient-to-br from-[#1a4a2a] via-[#2d6a3f] to-[#1a4a2a] text-center py-6 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(200,151,58,.4) 24px,rgba(200,151,58,.4) 26px)' }}/>
        <h2 className="font-['Cormorant_Garamond'] text-[22px] font-bold text-amber-200 relative">🏛️ Về Chùa</h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2.5"/>
        <p className="text-[12px] text-amber-200/70 italic relative">Chùa Thuận Châu – Đà Nẵng</p>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {/* Contact */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-amber-200/40">
          <div className="px-4 py-3 bg-amber-50 border-b border-amber-100 text-[13px] font-bold text-[#6b2d00] flex items-center gap-2">
            📍 Thông Tin Liên Hệ
          </div>
          <div className="p-4 space-y-3">
            {[
              { ico:'🗺️', label:'Địa chỉ', val:'220 Đống Đa, Hải Châu, TP. Đà Nẵng' },
              { ico:'⏰', label:'Giờ mở cửa', val:'05:00 – 18:30 hàng ngày' },
              { ico:'🙏', label:'Hệ phái', val:'Phật Giáo Việt Nam' },
            ].map(r => (
              <div key={r.label} className="flex gap-3 items-start pb-3 border-b border-dashed border-amber-100 last:border-none last:pb-0">
                <span className="text-xl mt-0.5 flex-shrink-0">{r.ico}</span>
                <div>
                  <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider mb-0.5">{r.label}</p>
                  <p className="text-[13.5px] text-stone-700 font-medium">{r.val}</p>
                </div>
              </div>
            ))}
            <a href="https://maps.google.com/?q=220+Đống+Đa,+Hải+Châu,+Đà+Nẵng" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 w-full px-4 py-2.5 bg-amber-50 border-2 border-amber-200 rounded-xl text-[13.5px] font-semibold text-[#6b2d00] hover:bg-amber-100 transition mt-1">
              🗺️ Xem bản đồ chỉ đường
            </a>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-amber-200/40">
          <div className="px-4 py-3 bg-amber-50 border-b border-amber-100 text-[13px] font-bold text-[#6b2d00]">
            📅 Lịch Tụng Kinh Thường Nhật
          </div>
          <div className="p-4 space-y-3">
            {[
              { time:'05:30',        name:'Tụng kinh sáng',     sub:'Khai chuông, lễ Phật, cầu an' },
              { time:'17:30',        name:'Tụng kinh chiều',     sub:'Lễ Phật, hồi hướng công đức' },
              { time:'Chủ Nhật',     name:'Sinh hoạt Phật tử',  sub:'08:00 – Pháp thoại & tu học' },
              { time:'Rằm & Mùng 1', name:'Lễ đặc biệt',        sub:'Cầu an – Cầu siêu – Thí thực' },
            ].map(s => (
              <div key={s.time} className="flex gap-3 items-start pb-3 border-b border-dashed border-amber-100 last:border-none last:pb-0">
                <span className="text-[11px] font-bold text-white bg-gradient-to-r from-orange-600 to-[#7a1c1c] px-2.5 py-1 rounded-lg flex-shrink-0 mt-0.5 min-w-[72px] text-center">
                  {s.time}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-stone-800">{s.name}</p>
                  <p className="text-[11.5px] text-stone-400 mt-0.5">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guide */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-amber-200/40">
          <div className="px-4 py-3 bg-amber-50 border-b border-amber-100 text-[13px] font-bold text-[#6b2d00]">
            📖 Hướng Dẫn Sử Dụng App
          </div>
          <div className="p-4 space-y-3">
            {[
              { ico:'🗓️', text:'Tab Sự Kiện — xem lịch lễ, khóa tu sắp tới' },
              { ico:'🕯️', text:'Tab Cầu Siêu — gửi danh sách hương linh' },
              { ico:'💬', text:'Tab Hỏi Đáp — trợ lý tự động giải đáp' },
            ].map(r => (
              <div key={r.ico} className="flex gap-3 items-center pb-3 border-b border-dashed border-amber-100 last:border-none last:pb-0">
                <span className="text-xl">{r.ico}</span>
                <p className="text-[13.5px] text-stone-600">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[12px] text-stone-400 italic py-4 pb-6">
          ☸ Nam mô Bổn Sư Thích Ca Mâu Ni Phật ☸
        </p>
      </div>
    </div>
  )
}
