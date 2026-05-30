import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TABS = [
    { id: 'chat', icon: '💬', label: 'Tin nhắn' },
    { id: 'events', icon: '🗓️', label: 'Sự kiện' },
    { id: 'causieu', icon: '🕯️', label: 'Cầu siêu' },
    { id: 'about', icon: '🏛️', label: 'Về chùa' },
];
export default function BottomNav({ active, onChange }) {
    return (_jsx("nav", { className: "bottom-nav-safe flex-shrink-0 flex bg-white", style: {
            borderTop: '1px solid #e8e8e8',
            boxShadow: '0 -1px 8px rgba(0,0,0,0.06)',
            // KHÔNG dùng paddingBottom inline — để CSS class bottom-nav-safe xử lý
        }, children: TABS.map(t => {
            const isActive = active === t.id;
            return (_jsxs("button", { onClick: () => onChange(t.id), className: "flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all active:scale-95", children: [_jsx("span", { className: `text-[21px] leading-none transition-transform duration-150 ${isActive ? 'scale-110' : ''}`, children: t.icon }), _jsx("span", { className: `text-[10px] leading-none font-medium transition-colors ${isActive ? 'text-[#1a4a2a] font-semibold' : 'text-stone-400'}`, children: t.label })] }, t.id));
        }) }));
}
