import { useEffect, useState } from 'react'
import { loadCauSieu, updateCauSieuStatus } from '../../lib/firebase'
import type { CauSieuRecord } from '../../types'
import type { ToastType } from '../components/Toast'

interface Props { toast: (msg: string, type?: ToastType) => void }

export default function CauSieuAdmin({ toast }: Props) {
  const [list, setList] = useState<CauSieuRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all'|'pending'|'done'>('all')
  const [detail, setDetail] = useState<CauSieuRecord | null>(null)

  const reload = async () => { setLoading(true); setList(await loadCauSieu()); setLoading(false) }
  useEffect(() => { reload() }, [])

  const toggleStatus = async (r: CauSieuRecord) => {
    const next = r.status === 'done' ? 'pending' : 'done'
    try {
      await updateCauSieuStatus(r.id, next)
      toast(next === 'done' ? '✅ Đánh dấu hoàn thành' : '↩️ Chuyển về chờ xử lý', 'success')
      reload()
    } catch { toast('Lỗi cập nhật', 'error') }
  }

  const exportCSV = () => {
    const rows = [['Họ tên','SĐT','Buổi lễ','Hương linh','Quan hệ','Ghi chú','Trạng thái','Ngày đăng ký']]
    filtered.forEach(r => {
      const ts = r.createdAt?.seconds ? new Date(r.createdAt.seconds * 1000).toLocaleDateString('vi-VN') : ''
      rows.push([r.name, r.phone, r.ceremony, (r.names??[]).join(' | '), r.relation??'', r.note??'', r.status, ts])
    })
    const csv = rows.map(r => r.map(c => `"${String(c??'').replace(/"/g,'""')}"`).join(',')).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8' }))
    a.download = `causieu-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    toast('⬇️ Đã xuất CSV', 'success')
  }

  const filtered = list.filter(r => filter === 'all' || r.status === filter)
  const fmtDate  = (ts: {seconds:number}|null) =>
    ts ? new Date(ts.seconds * 1000).toLocaleDateString('vi-VN') : '—'

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a]">📜 Danh Sách Cầu Siêu</h2>
          <p className="text-[13px] text-stone-400 mt-0.5">Đăng ký từ Phật tử gửi qua app</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all','pending','done'] as const).map(f => (
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border-2 transition ${
                filter===f ? 'border-[#1a4a2a] bg-[#1a4a2a] text-white' : 'border-stone-200 text-stone-500 hover:border-stone-300'
              }`}>
              {f==='all'?'Tất cả':f==='pending'?'⏳ Chờ':'✅ Xong'}
            </button>
          ))}
          <button onClick={exportCSV}
            className="px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border-2 border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition">
            ⬇️ CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-stone-400 gap-3">
            <div className="w-5 h-5 border-2 border-stone-200 border-t-amber-400 rounded-full animate-spin"/>
            Đang tải…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-[13.5px]">Không có đăng ký nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-[11px] uppercase tracking-wider">
                  {['Người đăng ký','SĐT','Buổi lễ','Hương linh','Ngày','Trạng thái',''].map(h=>(
                    <th key={h} className="px-5 py-3 text-left font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id} className="border-t border-stone-100 hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-stone-800">{r.name}</td>
                    <td className="px-5 py-3 text-stone-500">{r.phone}</td>
                    <td className="px-5 py-3 text-stone-600 text-[12.5px] max-w-[160px] truncate" title={r.ceremony}>{r.ceremony}</td>
                    <td className="px-5 py-3">
                      <button onClick={()=>setDetail(r)}
                        className="text-[#1a4a2a] underline underline-offset-2 text-[12.5px] hover:text-amber-700 transition">
                        {(r.names??[]).length} người →
                      </button>
                    </td>
                    <td className="px-5 py-3 text-stone-400 text-[12px] whitespace-nowrap">{fmtDate(r.createdAt)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${
                        r.status==='done' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {r.status==='done'?'✅ Xong':'⏳ Chờ'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button onClick={()=>toggleStatus(r)}
                        className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-500 text-[12px] font-medium hover:border-amber-400 hover:text-amber-700 transition whitespace-nowrap">
                        {r.status==='done'?'↩️ Hoàn tác':'✅ Xong'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={e => e.target===e.currentTarget && setDetail(null)}>
          <div className="bg-[#fdf6e8] rounded-3xl p-7 w-full max-w-md shadow-2xl">
            <h3 className="font-['Cormorant_Garamond'] text-[20px] font-bold text-[#1a4a2a] mb-1">📜 Danh Sách Hương Linh</h3>
            <p className="text-[12.5px] text-stone-500 mb-5">Người đăng ký: <strong>{detail.name}</strong> · {detail.phone}</p>
            <div className="bg-white rounded-2xl border border-amber-200 divide-y divide-amber-100 mb-4 overflow-hidden">
              {(detail.names??[]).map((n,i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                  <span className="text-[14px] text-stone-800">{n}</span>
                </div>
              ))}
            </div>
            {detail.relation && <p className="text-[13px] text-stone-500 mb-1">Quan hệ: {detail.relation}</p>}
            {detail.note     && <p className="text-[13px] text-stone-500 mb-4">Ghi chú: {detail.note}</p>}
            <button onClick={()=>setDetail(null)}
              className="w-full py-3 rounded-xl border-2 border-stone-200 text-stone-600 text-[13.5px] font-semibold hover:border-stone-300 transition">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
