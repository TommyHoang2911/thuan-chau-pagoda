import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { logoutUser } from '../../lib/firebase';
const NAV = [
    { id: 'dashboard', icon: '📊', label: 'Tổng quan' },
    { id: 'events', icon: '📅', label: 'Sự kiện' },
    { id: 'causieu', icon: '📜', label: 'Cầu siêu' },
    { id: 'push', icon: '🔔', label: 'Push Notification' },
];
export default function Sidebar({ active, onChange, user }) {
    return (_jsxs("aside", { className: "flex flex-col w-56 flex-shrink-0 h-full", style: { background: 'linear-gradient(180deg,#1a4a2a 0%,#2d6a3f 100%)' }, children: [_jsx("div", { className: "px-5 py-6 border-b border-white/10", children: _jsxs("div", { className: "flex items-center gap-3 mb-1", children: [_jsx("img", { src: "/thuan-chau-pagoda/logo.png", alt: "", className: "w-9 h-9 rounded-full object-cover ring-2 ring-amber-400/50" }), _jsxs("div", { children: [_jsx("p", { className: "text-amber-200 font-['Cormorant_Garamond'] text-[15px] font-bold leading-tight", children: "Ch\u00F9a Thu\u1EADn Ch\u00E2u" }), _jsx("p", { className: "text-amber-200/50 text-[10px] italic", children: "Admin Panel" })] })] }) }), _jsx("nav", { className: "flex-1 px-3 py-4 flex flex-col gap-1", children: NAV.map(n => (_jsxs("button", { onClick: () => onChange(n.id), className: `flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left text-[13.5px] font-medium transition-all relative
              ${active === n.id
                        ? 'bg-white/15 text-amber-200 font-semibold'
                        : 'text-amber-200/60 hover:bg-white/8 hover:text-amber-200/90'}`, children: [active === n.id && (_jsx("span", { className: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-400 rounded-r-full" })), _jsx("span", { className: "text-[17px]", children: n.icon }), n.label] }, n.id))) }), _jsxs("div", { className: "px-4 py-4 border-t border-white/10", children: [_jsxs("div", { className: "flex items-center gap-2.5 mb-3", children: [user.photoURL
                                ? _jsx("img", { src: user.photoURL, className: "w-8 h-8 rounded-full ring-2 ring-amber-400/30", alt: "" })
                                : _jsx("div", { className: "w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 text-sm font-bold", children: user.displayName?.[0] ?? '?' }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-amber-200 text-[12px] font-semibold truncate", children: user.displayName ?? user.email }), _jsx("p", { className: "text-amber-200/45 text-[10px]", children: "Administrator" })] })] }), _jsx("button", { onClick: logoutUser, className: "w-full py-2 rounded-xl border border-white/15 text-amber-200/60 text-[12px]\n            hover:bg-white/10 hover:text-amber-200 transition-all", children: "\uD83D\uDEAA \u0110\u0103ng xu\u1EA5t" })] })] }));
}
