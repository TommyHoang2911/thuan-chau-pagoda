import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { loadEvents, loadCauSieu, loadTokenCount } from '../../lib/firebase';
export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [recent, setRecent] = useState([]);
    useEffect(() => {
        async function fetch() {
            const [evs, cs, tokens] = await Promise.all([loadEvents(), loadCauSieu(), loadTokenCount()]);
            setStats({
                events: evs.length,
                total: cs.length,
                pending: cs.filter(r => r.status === 'pending').length,
                done: cs.filter(r => r.status === 'done').length,
                tokens,
            });
            setRecent(cs.slice(0, 5).map(r => ({
                name: r.name, ceremony: r.ceremony,
                count: (r.names ?? []).length, status: r.status,
            })));
        }
        fetch();
    }, []);
    const CARDS = [
        { label: 'Sự kiện', val: stats?.events, icon: '📅', color: 'from-amber-400 to-amber-600' },
        { label: 'Đăng ký', val: stats?.total, icon: '📜', color: 'from-[#1a4a2a] to-[#2d6a3f]' },
        { label: 'Chờ xử lý', val: stats?.pending, icon: '⏳', color: 'from-orange-500 to-orange-700' },
        { label: 'Hoàn thành', val: stats?.done, icon: '✅', color: 'from-emerald-500 to-emerald-700' },
    ];
    return (_jsxs("div", { children: [_jsx("h2", { className: "font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a] mb-1", children: "\uD83D\uDCCA T\u1ED5ng quan" }), _jsx("p", { className: "text-[13px] text-stone-400 mb-6", children: "C\u1EADp nh\u1EADt real-time t\u1EEB Firestore" }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: CARDS.map(c => (_jsxs("div", { className: `bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white shadow-md`, children: [_jsx("div", { className: "text-3xl mb-2", children: c.icon }), _jsx("div", { className: "text-[32px] font-bold leading-none", children: stats ? c.val : _jsx("span", { className: "inline-block w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" }) }), _jsx("div", { className: "text-[12px] opacity-80 mt-1 font-medium", children: c.label })] }, c.label))) }), stats && (_jsxs("div", { className: "mb-6 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-3", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCF1" }), _jsxs("p", { className: "text-[13.5px] text-stone-600", children: ["Thi\u1EBFt b\u1ECB \u0111\u00E3 \u0111\u0103ng k\u00FD nh\u1EADn th\u00F4ng b\u00E1o: ", _jsx("strong", { className: "text-[#1a4a2a]", children: stats.tokens })] })] })), _jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden", children: [_jsx("div", { className: "flex items-center justify-between px-6 py-4 border-b border-stone-100", children: _jsx("h3", { className: "font-semibold text-[15px] text-stone-800", children: "\uD83D\uDCDC \u0110\u0103ng k\u00FD c\u1EA7u si\u00EAu g\u1EA7n nh\u1EA5t" }) }), recent.length === 0 ? (_jsxs("div", { className: "text-center py-10 text-stone-400", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDCED" }), _jsx("p", { className: "text-[13.5px]", children: "Ch\u01B0a c\u00F3 \u0111\u0103ng k\u00FD n\u00E0o" })] })) : (_jsxs("table", { className: "w-full text-[13.5px]", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-stone-50 text-stone-500 text-[11px] uppercase tracking-wider", children: [_jsx("th", { className: "px-6 py-3 text-left font-semibold", children: "Ng\u01B0\u1EDDi \u0111\u0103ng k\u00FD" }), _jsx("th", { className: "px-6 py-3 text-left font-semibold", children: "Bu\u1ED5i l\u1EC5" }), _jsx("th", { className: "px-6 py-3 text-left font-semibold", children: "H\u01B0\u01A1ng linh" }), _jsx("th", { className: "px-6 py-3 text-left font-semibold", children: "Tr\u1EA1ng th\u00E1i" })] }) }), _jsx("tbody", { children: recent.map((r, i) => (_jsxs("tr", { className: "border-t border-stone-100 hover:bg-stone-50 transition-colors", children: [_jsx("td", { className: "px-6 py-3 font-semibold text-stone-800", children: r.name }), _jsx("td", { className: "px-6 py-3 text-stone-500 text-[12.5px]", children: r.ceremony }), _jsxs("td", { className: "px-6 py-3 text-stone-600", children: [r.count, " ng\u01B0\u1EDDi"] }), _jsx("td", { className: "px-6 py-3", children: _jsx("span", { className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${r.status === 'done'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-amber-100 text-amber-700'}`, children: r.status === 'done' ? '✅ Xong' : '⏳ Chờ' }) })] }, i))) })] }))] })] }));
}
