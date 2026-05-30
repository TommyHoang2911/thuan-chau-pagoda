import { useState, useRef } from 'react'
import { saveCauSieu } from '../lib/firebase'
import type { CauSieuForm } from '../types'

const CEREMONIES = [
  'Lễ Cầu An đầu tháng (Mùng 1)',
  'Lễ Rằm hàng tháng',
  'Đại Lễ Vu Lan – Báo Hiếu',
  'Tụng kinh Chủ Nhật hàng tuần',
  'Khác (ghi rõ ở phần ghi chú)',
]

export default function CauSieu() {
  const [form, setForm] = useState<CauSieuForm>({ name:'', phone:'', ceremony:'', names:[''], relation:'', note:'' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [errors, setErrors] = useState<Record<string,string>>({})
  const topRef = useRef<HTMLDivElement>(null)

  const set = (k: keyof CauSieuForm, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }
  const setName = (i: number, v: string) => {
    setForm(f => { const names = [...f.names]; names[i]=v; return {...f, names} })
  }
  const addName = () => setForm(f => ({ ...f, names: [...f.names, ''] }))
  const removeName = (i: number) => setForm(f => ({ ...f, names: f.names.filter((_,j)=>j!==i) }))

  const validate = () => {
    const e: Record<string,string> = {}
    if (!form.name.trim())     e.name     = 'Vui lòng nhập họ tên'
    if (!form.phone.trim())    e.phone    = 'Vui lòng nhập số điện thoại'
    if (!form.ceremony)        e.ceremony = 'Vui lòng chọn buổi lễ'
    if (!form.names.some(n=>n.trim())) e.names = 'Vui lòng nhập ít nhất một hương linh'
    return e
  }

  const submit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitting(true)
    try {
      await saveCauSieu({ ...form, names: form.names.filter(n=>n.trim()) })
      setDone(true)
      topRef.current?.scrollIntoView({ behavior: 'smooth' })
    } catch { setErrors({ form: 'Có lỗi xảy ra, vui lòng thử lại' }) }
    finally { setSubmitting(false) }
  }

  const reset = () => {
    setForm({ name:'', phone:'', ceremony:'', names:[''], relation:'', note:'' })
    setDone(false); setErrors({})
  }

  const inp = 'w-full border border-amber-200 rounded-xl px-3.5 py-2.5 text-[14px] bg-amber-50/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition'
  const lbl = 'block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5'

  return (
    <div ref={topRef}>
      {/* hero */}
      <div className="relative bg-gradient-to-br from-[#1a4a2a] via-[#2d6a3f] to-[#1a4a2a] text-center py-6 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:'repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(200,151,58,.4) 24px,rgba(200,151,58,.4) 26px)' }}/>
        <h2 className="font-['Cormorant_Garamond'] text-[22px] font-bold text-amber-200 relative">🕯️ Đăng Ký Cầu Siêu</h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2.5"/>
        <p className="text-[12px] text-amber-200/70 italic relative">Gửi danh sách hương linh để chùa tụng kinh hồi hướng</p>
      </div>

      <div className="p-4 flex flex-col gap-4">

        {done ? (
          /* ── Success ── */
          <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-amber-200/40 animate-[fadeIn_.4s_ease]">
            <span className="text-6xl block mb-4">🪷</span>
            <h3 className="font-['Cormorant_Garamond'] text-[22px] font-bold text-[#7a1c1c] mb-2">Nam mô A Di Đà Phật</h3>
            <p className="text-[13.5px] text-stone-500 leading-loose">
              Đăng ký của quý Phật tử đã được ghi nhận.<br/>
              Ban hộ tự sẽ đọc danh sách hương linh<br/>trong buổi lễ đã chọn.<br/><br/>
              Hồi hướng công đức lành đến tất cả chúng sinh.
            </p>
            <button onClick={reset}
              className="mt-6 px-6 py-2.5 border-2 border-amber-400 text-amber-700 rounded-xl text-[13.5px] font-semibold hover:bg-amber-50 transition">
              🙏 Đăng ký thêm
            </button>
          </div>
        ) : (
          <>
            {/* Card 1 – Người đăng ký */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-amber-200/40">
              <h3 className="font-['Cormorant_Garamond'] text-[16px] font-bold text-[#7a1c1c] mb-4 flex items-center gap-2">👤 Thông Tin Người Đăng Ký</h3>
              <div className="space-y-3.5">
                <div>
                  <label className={lbl}>Họ và tên <span className="text-orange-500">*</span></label>
                  <input className={`${inp} ${errors.name ? 'border-red-400' : ''}`} placeholder="Nguyễn Thị Lan" value={form.name} onChange={e=>set('name',e.target.value)}/>
                  {errors.name && <p className="text-[11.5px] text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={lbl}>Số điện thoại <span className="text-orange-500">*</span></label>
                  <input className={`${inp} ${errors.phone ? 'border-red-400' : ''}`} type="tel" placeholder="0901 234 567" value={form.phone} onChange={e=>set('phone',e.target.value)}/>
                  {errors.phone && <p className="text-[11.5px] text-red-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Card 2 – Buổi lễ */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-amber-200/40">
              <h3 className="font-['Cormorant_Garamond'] text-[16px] font-bold text-[#7a1c1c] mb-4 flex items-center gap-2">🗓️ Chọn Buổi Lễ</h3>
              <div className="space-y-2">
                {CEREMONIES.map(c => (
                  <button key={c} onClick={()=>set('ceremony',c)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 text-[13.5px] transition-all ${
                      form.ceremony===c
                        ? 'border-amber-400 bg-amber-50 text-[#3d1a00] font-semibold'
                        : 'border-amber-100 text-stone-600 hover:border-amber-300'
                    }`}>
                    {form.ceremony===c ? '✅ ' : '○ '}{c}
                  </button>
                ))}
                {errors.ceremony && <p className="text-[11.5px] text-red-500 mt-1">{errors.ceremony}</p>}
              </div>
            </div>

            {/* Card 3 – Hương linh */}
            <div className="bg-white rounded-2xl p-5 shadow-md border border-amber-200/40">
              <h3 className="font-['Cormorant_Garamond'] text-[16px] font-bold text-[#7a1c1c] mb-4 flex items-center gap-2">📜 Danh Sách Hương Linh</h3>
              <div className="border border-amber-200 rounded-xl overflow-hidden mb-3">
                {form.names.map((n, i) => (
                  <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 ${i < form.names.length-1 ? 'border-b border-dashed border-amber-100' : ''}`}>
                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                    <input className="flex-1 text-[14px] bg-transparent outline-none placeholder:text-stone-300" placeholder="Họ tên người quá cố…" value={n} onChange={e=>setName(i,e.target.value)}/>
                    {form.names.length > 1 && (
                      <button onClick={()=>removeName(i)} className="text-stone-300 hover:text-orange-500 transition text-lg leading-none">✕</button>
                    )}
                  </div>
                ))}
              </div>
              {errors.names && <p className="text-[11.5px] text-red-500 mb-2">{errors.names}</p>}
              <button onClick={addName} className="w-full py-2.5 border-2 border-dashed border-amber-300 text-amber-600 rounded-xl text-[13px] font-medium hover:bg-amber-50 transition">
                + Thêm hương linh
              </button>
              <div className="mt-4 space-y-3.5">
                <div>
                  <label className={lbl}>Quan hệ</label>
                  <input className={inp} placeholder="VD: Ông nội, bà ngoại, cha, mẹ…" value={form.relation} onChange={e=>set('relation',e.target.value)}/>
                </div>
                <div>
                  <label className={lbl}>Ghi chú</label>
                  <textarea className={`${inp} min-h-[72px] resize-none`} placeholder="Năm sinh, năm mất, địa phương… (nếu có)" value={form.note} onChange={e=>set('note',e.target.value)}/>
                </div>
              </div>
            </div>

            {errors.form && <p className="text-[13px] text-red-500 text-center">{errors.form}</p>}

            <button onClick={submit} disabled={submitting}
              className="w-full py-4 bg-gradient-to-r from-[#7a1c1c] to-[#3d1a00] text-amber-200 rounded-2xl font-['Cormorant_Garamond'] text-[18px] font-bold tracking-wider shadow-lg disabled:opacity-60 hover:opacity-90 active:scale-[.98] transition-all">
              {submitting ? '⏳ Đang gửi…' : '🙏 Gửi Đăng Ký Cầu Siêu'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
