import { useState, useEffect } from 'react'
import { savePushLog, loadTokenCount } from '../../lib/firebase'
import { auth } from '../../lib/firebase'
import type { ToastType } from '../components/Toast'

interface Props { toast: (msg: string, type?: ToastType) => void }

export default function Push({ toast }: Props) {
  const [title, setTitle] = useState('')
  const [body, setBody]   = useState('')
  const [url, setUrl]     = useState('https://tommyhoang2911.github.io/thuan-chau-pagoda/')
  const [sending, setSending] = useState(false)
  const [tokens, setTokens]   = useState<number | null>(null)

  useEffect(() => { loadTokenCount().then(setTokens) }, [])

  const send = async () => {
    if (!title.trim() || !body.trim()) { toast('Vui lòng nhập tiêu đề và nội dung', 'error'); return }
    setSending(true)
    try {
      await savePushLog({ title, body, url, sentBy: auth.currentUser?.email ?? 'admin' })
      toast('✅ Đã lưu thông báo vào Firestore', 'success')
      setTitle(''); setBody('')
    } catch { toast('Lỗi ghi Firestore', 'error') }
    finally { setSending(false) }
  }

  return (
    <div>
      <h2 className="font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a] mb-1">🔔 Push Notification</h2>
      <p className="text-[13px] text-stone-400 mb-6">Gửi thông báo đến Phật tử đã cài app</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* compose */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h3 className="font-semibold text-[15px] text-stone-800 mb-5 flex items-center gap-2">✍️ Soạn thông báo</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Tiêu đề *</label>
              <input className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                placeholder="VD: Lễ Vu Lan sắp diễn ra 🏮"
                value={title} onChange={e=>{setTitle(e.target.value)}}/>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Nội dung *</label>
              <textarea className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition min-h-[100px] resize-none"
                placeholder="Kính mời quý Phật tử tham dự…"
                value={body} onChange={e=>setBody(e.target.value)}/>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">Link khi click</label>
              <input className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition"
                value={url} onChange={e=>setUrl(e.target.value)}/>
            </div>
          </div>
          <button onClick={send} disabled={sending}
            className="w-full mt-6 py-3.5 rounded-xl text-white font-semibold text-[14px] shadow-md transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }}>
            {sending && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>}
            {sending ? 'Đang gửi…' : '🔔 Gửi thông báo'}
          </button>
          <p className="text-[11.5px] text-stone-400 text-center mt-3 italic">
            Lưu log vào Firestore. Cần FCM Server Key để gửi push thật.
          </p>
        </div>

        {/* preview + info */}
        <div className="flex flex-col gap-4">
          {/* preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <h3 className="font-semibold text-[15px] text-stone-800 mb-4">👁️ Preview</h3>
            <div className="rounded-2xl p-4 text-white" style={{ background: 'linear-gradient(135deg,#1a1a2e,#1a4a2a)' }}>
              <div className="flex items-center gap-2 mb-2">
                <img src="/thuan-chau-pagoda/logo.png" className="w-5 h-5 rounded-full object-cover" alt=""/>
                <span className="text-[11px] opacity-60">Chùa Thuận Châu · Vừa xong</span>
              </div>
              <p className="font-semibold text-[14px] mb-1">{title || 'Tiêu đề thông báo'}</p>
              <p className="text-[13px] opacity-75 leading-relaxed">{body || 'Nội dung thông báo sẽ hiển thị ở đây…'}</p>
            </div>
          </div>

          {/* stats + setup */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-[13px] text-stone-600 mb-4">
              📱 Thiết bị đã đăng ký:{' '}
              <strong className="text-[#1a4a2a]">
                {tokens === null ? '…' : `${tokens} thiết bị`}
              </strong>
            </p>
            <p className="text-[12.5px] font-bold text-[#1a4a2a] mb-2">📋 Thiết lập FCM (1 lần)</p>
            <ol className="text-[12px] text-stone-500 space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>Firebase Console → Project Settings</li>
              <li>Cloud Messaging → Generate Web Push certificate</li>
              <li>Copy VAPID Key → GitHub Secret <code className="bg-white px-1.5 py-0.5 rounded text-[11px]">FIREBASE_VAPID_KEY</code></li>
              <li>Server Key → GitHub Secret <code className="bg-white px-1.5 py-0.5 rounded text-[11px]">FCM_SERVER_KEY</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
