import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { loadEvents } from '../lib/firebase';
const MOCK = [
    { id: '1', emoji: '🌸', badge: 'Lễ hội', day: '15', month: 'Tháng 6', date: '2026-06-15', time: '07:00 – 11:00', title: 'Lễ Vía Đức Phật A Di Đà', desc: 'Tụng kinh, cúng dường hoa đăng và thuyết pháp. Phật tử xa gần kính mời về tham dự.', loc: 'Chánh Điện' },
    { id: '2', emoji: '🧘', badge: 'Khóa tu', day: '20', month: 'Tháng 6', date: '2026-06-20', time: '06:00 – 17:00', title: 'Khóa Tu Một Ngày An Lạc', desc: 'Tọa thiền, tụng kinh, ăn chay và nghe pháp thoại tại khuôn viên chùa.', loc: 'Toàn khuôn viên' },
    { id: '3', emoji: '🙏', badge: 'Cầu an', day: '01', month: 'Tháng 7', date: '2026-07-01', time: '08:00 – 10:00', title: 'Lễ Cầu An Đầu Tháng', desc: 'Lễ cầu an định kỳ đầu tháng âm lịch.', loc: 'Chánh Điện' },
    { id: '4', emoji: '🏮', badge: 'Đại lễ', day: '15', month: 'Tháng 7 ÂL', date: '2026-08-09', time: 'Cả ngày', title: 'Đại Lễ Vu Lan – Báo Hiếu', desc: 'Cầu siêu hương linh, bông hồng cài áo, đêm văn nghệ Phật giáo.', loc: 'Toàn khuôn viên' },
];
export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadEvents().then(data => {
            setEvents(data.length ? data : MOCK);
            setLoading(false);
        });
    }, []);
    return (_jsxs("div", { children: [_jsxs("div", { className: "relative bg-gradient-to-br from-[#3d1a00] via-[#6b2d00] to-[#4a1500] text-center py-6 px-4 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-10", style: { backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(200,151,58,.4) 24px,rgba(200,151,58,.4) 26px)' } }), _jsx("h2", { className: "font-['Cormorant_Garamond'] text-[22px] font-bold text-amber-200 relative", children: "\uD83D\uDDD3\uFE0F S\u1EF1 Ki\u1EC7n & Th\u00F4ng B\u00E1o" }), _jsx("div", { className: "w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2.5" }), _jsx("p", { className: "text-[12px] text-amber-200/70 italic relative", children: "L\u1ECBch l\u1EC5 h\u1ED9i, kh\u00F3a tu v\u00E0 ho\u1EA1t \u0111\u1ED9ng t\u1EA1i ch\u00F9a" })] }), _jsxs("div", { className: "mx-4 mt-4 bg-gradient-to-r from-[#3d1a00] to-[#6b2d00] rounded-2xl p-4 flex items-center gap-3 shadow-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-amber-200 text-[13.5px] font-semibold", children: "\uD83D\uDCF1 C\u00E0i app v\u1EC1 m\u00E0n h\u00ECnh ch\u00EDnh" }), _jsx("p", { className: "text-amber-200/65 text-[11.5px] mt-0.5", children: "Nh\u1EADn th\u00F4ng b\u00E1o s\u1EF1 ki\u1EC7n t\u1EE9c th\u00EC" })] }), _jsx("button", { className: "bg-amber-400 text-[#3d1a00] text-[12px] font-bold px-3 py-2 rounded-lg whitespace-nowrap hover:bg-amber-300 transition", children: "C\u00E0i \u0111\u1EB7t" })] }), _jsx("div", { className: "p-4 flex flex-col gap-4", children: loading
                    ? Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: "h-48 rounded-2xl bg-gradient-to-r from-amber-100 to-amber-50 animate-pulse" }, i)))
                    : events.map((ev, i) => _jsx(EventCard, { ev: ev, delay: i * 60 }, ev.id)) })] }));
}
