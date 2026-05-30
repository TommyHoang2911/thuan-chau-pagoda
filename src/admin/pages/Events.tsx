import { useEffect, useState } from 'react'
import { loadEvents, createEvent, updateEvent, deleteEvent } from '../../lib/firebase'
import type { Event } from '../../types'
import type { ToastType } from '../components/Toast'

const EMOJIS = ['🌸','🏮','🙏','🧘','🕯️','☸','🪷','📖','🎋','🌕','🔔','🫧']
const BADGES = ['Lễ hội','Khóa tu','Cầu an','Đại lễ','Cầu siêu','Pháp thoại','Khác']
const EMPTY: Omit<Event,'id'> = { title:'', emoji:'🌸', badge:'Lễ hội', day:'', month:'', date:'', time:'', loc:'', desc:'' }

interface Props { toast: (msg: string, type?: ToastType) => void }

export default function EventsAdmin({ toast }: Props) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; editing: Event | null }>({ open: false, editing: null })
  const [form, setForm] = useState<Omit<Event,'id'>>(EMPTY)
  const [saving, setSaving] = useState(false)

  const reload = async () => { setLoading(true); setEvents(await loadEvents()); setLoading(false) }
  useEffect(() => { reload() }, [])

  const openNew  = () => { setForm(EMPTY); setModal({ open: true, editing: null }) }
  const openEdit = (e: Event) => { setForm({ ...e }); setModal({ open: true, editing: e }) }
  const closeModal = () => setModal({ open: false, editing: null })

  const set = (k: keyof Omit<Event,'id'>, v: string) => setForm(f => ({ ...f, [k]: v }))

  const save = async () => {
    if (!form.title.trim()) { toast('Vui lòng nhập tên sự kiện', 'error'); return }
    setSaving(true)
    try {
      if (modal.editing) {
        await updateEvent(modal.editing.id, form)
        toast('✅ Đã cập nhật sự kiện', 'success')
      } else {
        await createEvent(form)
        toast('✅ Đã thêm sự kiện mới', 'success')
      }
      closeModal(); reload()
    } catch { toast('Lỗi khi lưu', 'error') }
    finally { setSaving(false) }
  }

  const del = async (e: Event) => {
    if (!confirm(`Xóa sự kiện "${e.title}"?`)) return
    try { await deleteEvent(e.id); toast('🗑️ Đã xóa', 'success'); reload() }
    catch { toast('Lỗi khi xóa', 'error') }
  }

  const inp = 'w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition'
  const lbl = 'block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5'

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a]">📅 Quản lý Sự Kiện</h2>
          <p className="text-[13px] text-stone-400 mt-0.5">Thêm, sửa, xóa sự kiện trên app</p>
        </div>
        <button onClick={openNew}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold text-white shadow-md transition hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }}>
          + Thêm sự kiện
        </button>
      </div>

      {/* table */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-stone-400 gap-3">
            <div className="w-5 h-5 border-2 border-stone-200 border-t-amber-400 rounded-full animate-spin"/>
            Đang tải…
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <div className="text-4xl mb-2">📅</div>
            <p className="text-[13.5px]">Chưa có sự kiện nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-[11px] uppercase tracking-wider">
                  {['Sự kiện','Ngày','Thời gian','Địa điểm',''].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map(e => (
                  <tr key={e.id} className="border-t border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{e.emoji}</span>
                        <div>
                          <p className="font-semibold text-stone-800">{e.title}</p>
                          <span className="text-[11px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">{e.badge}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-stone-600 whitespace-nowrap">{e.day} {e.month}</td>
                    <td className="px-5 py-3 text-stone-500 whitespace-nowrap">{e.time || '—'}</td>
                    <td className="px-5 py-3 text-stone-500">{e.loc || '—'}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(e)}
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-[12px] font-medium hover:border-amber-400 hover:text-amber-700 transition">
                          ✏️ Sửa
                        </button>
                        <button onClick={() => del(e)}
                          className="px-3 py-1.5 rounded-lg border border-red-100 text-red-400 text-[12px] font-medium hover:bg-red-50 transition">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-[#fdf6e8] rounded-3xl p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="font-['Cormorant_Garamond'] text-[22px] font-bold text-[#1a4a2a] mb-5 pb-4 border-b border-amber-200">
              {modal.editing ? '✏️ Sửa Sự Kiện' : '➕ Thêm Sự Kiện Mới'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className={lbl}>Tên sự kiện *</label>
                <input className={inp} placeholder="VD: Lễ Vía Đức Phật A Di Đà" value={form.title} onChange={e=>set('title',e.target.value)}/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Ngày hiển thị</label>
                  <input className={inp} placeholder="VD: 15" value={form.day} onChange={e=>set('day',e.target.value)}/>
                </div>
                <div>
                  <label className={lbl}>Tháng hiển thị</label>
                  <input className={inp} placeholder="VD: Tháng 6" value={form.month} onChange={e=>set('month',e.target.value)}/>
                </div>
                <div>
                  <label className={lbl}>Ngày thực tế (sort)</label>
                  <input className={inp} type="date" value={form.date} onChange={e=>set('date',e.target.value)}/>
                </div>
                <div>
                  <label className={lbl}>Thời gian</label>
                  <input className={inp} placeholder="07:00 – 11:00" value={form.time} onChange={e=>set('time',e.target.value)}/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Địa điểm</label>
                  <input className={inp} placeholder="Chánh Điện" value={form.loc} onChange={e=>set('loc',e.target.value)}/>
                </div>
                <div>
                  <label className={lbl}>Loại (badge)</label>
                  <select className={inp} value={form.badge} onChange={e=>set('badge',e.target.value)}>
                    {BADGES.map(b=><option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={lbl}>Emoji</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {EMOJIS.map(em => (
                    <button key={em} onClick={()=>set('emoji',em)}
                      className={`text-2xl px-2 py-1.5 rounded-xl border-2 transition ${form.emoji===em ? 'border-amber-400 bg-amber-50' : 'border-transparent hover:border-stone-200'}`}>
                      {em}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={lbl}>Mô tả</label>
                <textarea className={`${inp} min-h-[80px] resize-none`} placeholder="Mô tả chi tiết…" value={form.desc} onChange={e=>set('desc',e.target.value)}/>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-5 border-t border-amber-200">
              <button onClick={closeModal}
                className="flex-1 py-3 rounded-xl border-2 border-stone-200 text-stone-600 text-[13.5px] font-semibold hover:border-stone-300 transition">
                Hủy
              </button>
              <button onClick={save} disabled={saving}
                className="flex-1 py-3 rounded-xl text-white text-[13.5px] font-semibold shadow-md transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }}>
                {saving && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
                {saving ? 'Đang lưu…' : '💾 Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
