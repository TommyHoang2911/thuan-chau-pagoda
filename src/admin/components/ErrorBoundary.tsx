import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6"
          style={{ background: 'linear-gradient(160deg,#1a4a2a,#2d6a3f)' }}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
            <img src="/thuan-chau-pagoda/logo.png" className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" alt=""/>
            <h2 className="font-['Cormorant_Garamond'] text-[22px] font-bold text-red-700 mb-2">
              Có lỗi xảy ra
            </h2>
            <p className="text-[13px] text-stone-500 mb-4 leading-relaxed">
              {this.state.error.message}
            </p>
            <div className="bg-stone-50 rounded-xl p-3 text-left mb-4">
              <p className="text-[11px] text-stone-400 font-mono break-all">
                {this.state.error.stack?.slice(0, 200)}
              </p>
            </div>
            <button onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl text-white text-[13.5px] font-semibold"
              style={{ background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }}>
              🔄 Tải lại trang
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
