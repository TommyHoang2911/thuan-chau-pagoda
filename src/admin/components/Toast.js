import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
export function useToast() {
    const [toasts, setToasts] = useState([]);
    let counter = 0;
    const toast = useCallback((msg, type = 'info') => {
        const id = ++counter;
        setToasts(t => [...t, { id, msg, type }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
    }, []);
    return { toasts, toast };
}
const COLOR = {
    success: 'border-l-emerald-400 text-emerald-300',
    error: 'border-l-red-400 text-red-300',
    info: 'border-l-amber-400 text-amber-200',
};
export function ToastContainer({ toasts }) {
    return (_jsx("div", { className: "fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none", children: toasts.map(t => (_jsx("div", { className: `bg-stone-900/95 backdrop-blur-sm border-l-4 px-4 py-3 rounded-xl
            shadow-xl text-[13.5px] font-medium animate-[fadeUp_.3s_ease] ${COLOR[t.type]}`, children: t.msg }, t.id))) }));
}
