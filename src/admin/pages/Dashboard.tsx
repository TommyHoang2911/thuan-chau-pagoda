import { useEffect, useState } from 'react'
import { loadEvents, loadCauSieu, loadTokenCount } from '../../lib/firebase'

interface Stats { events: number; total: number; pending: number; done: number; tokens: number }

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recent, setRecent] = useState<{ name:string; ceremony:string; count:number; status:string }[]>([])

  useEffect(() => {
    async function fetch() {
      const [evs, cs, tokens] = await Promise.all([loadEvents(), loadCauSieu(), loadTokenCount()])
      setStats({
        events:  evs.length,
        total:   cs.length,
        pending: cs.filter(r => r.status === 'pending').length,
        done:    cs.filter(r => r.status === 'done').length,
        tokens,
      })
      setRecent(
        cs.slice(0, 5).map(r => ({
          name: r.name, ceremony: r.ceremony,
          count: (r.names ?? []).length, status: r.status,
        }))
      )
    }
    fetch()
  }, [])

  const CARDS = [
    { label: 'Sự kiện',       val: stats?.events,  icon: '📅', color: 'from-amber-400 to-amber-600'   },
    { label: 'Đăng ký',       val: stats?.total,   icon: '📜', color: 'from-[#1a4a2a] to-[#2d6a3f]'  },
    { label: 'Chờ xử lý',     val: stats?.pending, icon: '⏳', color: 'from-orange-500 to-orange-700'  },
    { label: 'Hoàn thành',    val: stats?.done,    icon: '✅', color: 'from-emerald-500 to-emerald-700'},
  ]

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a] mb-1">📊 Tổng quan</h2>
      <p className="text-[13px] text-stone-400 mb-6">Cập nhật real-time từ Firestore</p>

      {/* stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CARDS.map(c => (
          <div key={c.label}
            className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white shadow-md`}>
            <div className="text-3xl mb-2">{c.icon}</div>
            <div className="text-[32px] font-bold leading-none">
              {stats ? c.val : <span className="inline-block w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
            </div>
            <div className="text-[12px] opacity-80 mt-1 font-medium">{c.label}</div>
          </div>
        ))}
      </div>

      {/* device count */}
      {stats && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-3">
          <span className="text-2xl">📱</span>
          <p className="text-[13.5px] text-stone-600">
            Thiết bị đã đăng ký nhận thông báo: <strong className="text-[#1a4a2a]">{stats.tokens}</strong>
          </p>
        </div>
      )}

      {/* recent registrations */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h3 className="font-semibold text-[15px] text-stone-800">📜 Đăng ký cầu siêu gần nhất</h3>
        </div>
        {recent.length === 0 ? (
          <div className="text-center py-10 text-stone-400">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-[13.5px]">Chưa có đăng ký nào</p>
          </div>
        ) : (
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="bg-stone-50 text-stone-500 text-[11px] uppercase tracking-wider">
                <th className="px-6 py-3 text-left font-semibold">Người đăng ký</th>
                <th className="px-6 py-3 text-left font-semibold">Buổi lễ</th>
                <th className="px-6 py-3 text-left font-semibold">Hương linh</th>
                <th className="px-6 py-3 text-left font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={i} className="border-t border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-3 font-semibold text-stone-800">{r.name}</td>
                  <td className="px-6 py-3 text-stone-500 text-[12.5px]">{r.ceremony}</td>
                  <td className="px-6 py-3 text-stone-600">{r.count} người</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${
                      r.status === 'done'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {r.status === 'done' ? '✅ Xong' : '⏳ Chờ'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
