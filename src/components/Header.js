import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function Header({ onNotif, activeTab }) {
    const [notifOn, setNotifOn] = useState(false);
    const TITLES = {
        chat: 'Chùa Thuận Châu',
        events: 'Sự Kiện & Thông Báo',
        causieu: 'Đăng Ký Cầu Siêu',
        about: 'Thông Tin Chùa',
    };
    return (_jsx("header", { className: "header-safe flex-shrink-0 z-50", style: {
            background: '#1a4a2a',
            boxShadow: '0 1px 0 rgba(0,0,0,0.15)',
            // KHÔNG dùng paddingTop inline — để CSS class header-safe xử lý
        }, children: _jsxs("div", { className: "flex items-center gap-3 px-3 py-2.5", children: [_jsxs("div", { className: "flex items-center gap-2.5 flex-1 min-w-0", children: [_jsxs("div", { className: "relative flex-shrink-0", children: [_jsx("img", { src: "/thuan-chau-pagoda/logo.png", alt: "Ch\u00F9a Thu\u1EADn Ch\u00E2u", className: "w-9 h-9 rounded-full object-cover", style: { border: '2px solid rgba(255,255,255,0.25)' } }), _jsx("span", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1a4a2a]" })] }), _jsxs("div", { className: "min-w-0", children: [_jsx("h1", { className: "text-white font-semibold text-[15px] leading-tight truncate", children: TITLES[activeTab] ?? 'Chùa Thuận Châu' }), activeTab === 'chat' && (_jsx("p", { className: "text-[11px] text-emerald-300 mt-px", children: "\u0110ang ho\u1EA1t \u0111\u1ED9ng" }))] })] }), _jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [_jsxs("button", { onClick: () => { setNotifOn(true); onNotif(); }, className: "relative w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:bg-white/15 transition text-[17px]", children: ["\uD83D\uDD14", notifOn && (_jsx("span", { className: "absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-[#1a4a2a]" }))] }), _jsx("button", { className: "w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:bg-white/15 transition text-[17px]", children: "\u22EE" })] })] }) }));
}
