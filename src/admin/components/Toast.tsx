import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info'
interface ToastItem { id: number; msg: string; type: ToastType }

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  let counter = 0

  const toast = useCallback((msg: string, type: ToastType = 'info') => {
    const id = ++counter
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200)
  }, [])

  return { toasts, toast }
}

const COLOR: Record<ToastType, string> = {
  success: 'border-l-emerald-400 text-emerald-300',
  error:   'border-l-red-400 text-red-300',
  info:    'border-l-amber-400 text-amber-200',
}

export function ToastContainer({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id}
          className={`bg-stone-900/95 backdrop-blur-sm border-l-4 px-4 py-3 rounded-xl
            shadow-xl text-[13.5px] font-medium animate-[fadeUp_.3s_ease] ${COLOR[t.type]}`}>
          {t.msg}
        </div>
      ))}
    </div>
  )
}
