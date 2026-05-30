import { useState } from 'react'
import { loginGoogle } from '../../lib/firebase'

export default function LoginScreen() {
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setErr(''); setLoading(true)
    try { await loginGoogle() }
    catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Đăng nhập thất bại')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(160deg,#1a4a2a 0%,#2d6a3f 50%,#1a3a20 100%)' }}>

      {/* bg pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 30px,rgba(200,151,58,.3) 30px,rgba(200,151,58,.3) 32px)' }}/>

      <div className="relative bg-[#fdf6e8] rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center">
        {/* logo */}
        <img src="/thuan-chau-pagoda/logo.png" alt="Logo"
          className="w-24 h-24 rounded-full object-cover mx-auto mb-5 ring-4 ring-amber-400/50 shadow-lg"/>

        <h1 className="font-['Cormorant_Garamond'] text-[28px] font-bold text-[#1a4a2a] leading-tight">
          Chùa Thuận Châu
        </h1>
        <p className="text-[13px] text-stone-500 italic mt-1 mb-1">Admin Dashboard</p>

        <div className="w-16 h-px mx-auto my-5"
          style={{ background: 'linear-gradient(90deg,transparent,#c8973a,transparent)' }}/>

        <p className="text-[13px] text-stone-500 mb-6 leading-relaxed">
          Đăng nhập để quản lý sự kiện,<br/>danh sách cầu siêu và thông báo.
        </p>

        <button onClick={handleLogin} disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white
            border-2 border-stone-200 rounded-2xl font-semibold text-[15px] text-stone-700
            hover:border-amber-400 hover:shadow-md transition-all disabled:opacity-60 shadow-sm">
          {loading
            ? <span className="w-5 h-5 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin"/>
            : <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G"/>
          }
          {loading ? 'Đang đăng nhập…' : 'Đăng nhập bằng Google'}
        </button>

        {err && <p className="mt-4 text-[12.5px] text-red-500 bg-red-50 rounded-xl p-3">{err}</p>}

        <p className="mt-5 text-[11.5px] text-stone-400 italic">
          Chỉ tài khoản được uỷ quyền mới truy cập được
        </p>
      </div>
    </div>
  )
}
