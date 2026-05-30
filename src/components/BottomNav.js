import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TABS = [
    { id: 'events', icon: '🗓️', label: 'Sự Kiện' },
    { id: 'causieu', icon: '🕯️', label: 'Cầu Siêu' },
    { id: 'chat', icon: '💬', label: 'Hỏi Đáp' },
    { id: 'about', icon: '🏛️', label: 'Về Chùa' },
];
export default function BottomNav({ active, onChange }) {
    return (_jsx("nav", { className: "flex-shrink-0 flex bg-white border-t border-amber-200/40 shadow-[0_-4px_20px_rgba(61,26,0,.12)]", style: { paddingBottom: 'env(safe-area-inset-bottom, 0px)' }, children: TABS.map(t => (_jsxs("button", { onClick: () => onChange(t.id), className: `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative transition-all
            ${active === t.id ? 'text-[#7a1c1c]' : 'text-stone-400 hover:text-stone-600'}`, children: [active === t.id && (_jsx("span", { className: "absolute top-0 left-1/4 right-1/4 h-[3px] bg-amber-500 rounded-b-sm" })), _jsx("span", { className: `text-xl transition-transform ${active === t.id ? '-translate-y-0.5' : ''}`, children: t.icon }), _jsx("span", { className: `text-[10px] tracking-wide ${active === t.id ? 'font-semibold' : 'font-medium'}`, children: t.label })] }, t.id))) }));
}
