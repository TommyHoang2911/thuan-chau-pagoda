import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
const FLOW = {
    start: { msg: '🙏 Nam mô A Di Đà Phật!\nKính chào quý Phật tử. Tôi là trợ lý của Chùa Thuận Châu.\nCon có thể giúp gì cho quý vị hôm nay?', options: ['📅 Lịch sự kiện', '🕯️ Đăng ký cầu siêu', '⏰ Giờ tụng kinh', '📍 Địa chỉ chùa', '❓ Câu hỏi khác'] },
    '📅 Lịch sự kiện': { msg: '📅 Các sự kiện sắp tới:\n\n🌸 15/6 — Lễ Vía Phật A Di Đà (07:00)\n🧘 20/6 — Khóa Tu Một Ngày (06:00)\n🙏 01/7 — Lễ Cầu An đầu tháng\n🏮 15/7 ÂL — Đại Lễ Vu Lan', options: ['🌸 Lễ Vía A Di Đà', '🧘 Khóa Tu An Lạc', '🏮 Đại Lễ Vu Lan', '⬅️ Quay lại'] },
    '🌸 Lễ Vía A Di Đà': { msg: '🌸 Lễ Vía Đức Phật A Di Đà\n📅 15 tháng 6 · ⏰ 07:00–11:00\n📍 Chánh Điện\n\nTụng kinh, cúng dường hoa đăng, thuyết pháp. Trang phục lịch sự.', options: ['📅 Xem sự kiện khác', '⬅️ Quay lại'] },
    '🧘 Khóa Tu An Lạc': { msg: '🧘 Khóa Tu Một Ngày An Lạc\n📅 20 tháng 6 · ⏰ 06:00–17:00\n📍 Toàn khuôn viên\n\nTọa thiền, tụng kinh, ăn chay, nghe pháp thoại. Số lượng có hạn.', options: ['📅 Xem sự kiện khác', '⬅️ Quay lại'] },
    '🏮 Đại Lễ Vu Lan': { msg: '🏮 Đại Lễ Vu Lan – Báo Hiếu\n📅 14–15 tháng 7 âm lịch\n\nCầu siêu hương linh, bông hồng cài áo, đêm văn nghệ.\n⚠️ Danh sách cầu siêu nhận trước 13/7 ÂL.', options: ['🕯️ Đăng ký cầu siêu ngay', '⬅️ Quay lại'] },
    '🕯️ Đăng ký cầu siêu': { msg: '🕯️ Để đăng ký danh sách cầu siêu, vui lòng chuyển sang tab Cầu Siêu và điền đầy đủ thông tin. Ban hộ tự sẽ tiếp nhận và đọc trong buổi lễ.', options: ['📝 Đến tab Cầu Siêu', '⬅️ Quay lại'] },
    '📝 Đến tab Cầu Siêu': { msg: '🙏 Kính chuyển quý vị đến form đăng ký.', options: [], action: 'causieu' },
    '⏰ Giờ tụng kinh': { msg: '⏰ Lịch tụng kinh thường nhật:\n\n🌅 05:30 — Tụng kinh sáng\n🌇 17:30 — Tụng kinh chiều\n📖 Chủ Nhật 08:00 — Sinh hoạt Phật tử\n🌕 Rằm & Mùng Một — Lễ đặc biệt', options: ['📅 Lịch sự kiện', '⬅️ Quay lại'] },
    '📍 Địa chỉ chùa': { msg: '📍 Chùa Thuận Châu\n220 Đống Đa, Hải Châu\nTP. Đà Nẵng\n\n⏰ Mở cửa: 05:00 – 18:30 hàng ngày', options: ['🗺️ Mở Google Maps', '⬅️ Quay lại'] },
    '🗺️ Mở Google Maps': { msg: '🗺️ Đang mở bản đồ…', options: ['⬅️ Quay lại'], action: 'maps' },
    '❓ Câu hỏi khác': { msg: '🙏 Xin liên hệ trực tiếp tại:\n\n📍 220 Đống Đa, Hải Châu, Đà Nẵng\n⏰ Tiếp khách: 08:00 – 17:00\n\nBan hộ tự luôn sẵn lòng hỗ trợ.', options: ['⬅️ Quay lại'] },
    '📅 Xem sự kiện khác': { msg: '', options: [], action: 'events_menu' },
    '🕯️ Đăng ký cầu siêu ngay': { msg: '', options: [], action: 'causieu' },
    '⬅️ Quay lại': { msg: '', options: [], action: 'start' },
};
const now = () => new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
// ── Bot avatar dùng logo thật ─────────────────────────────
const BOT_AVATAR = '/thuan-chau-pagoda/logo.png';
export default function Chat({ onNavigate }) {
    const [msgs, setMsgs] = useState([]);
    const [options, setOptions] = useState([]);
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);
    const scrollBottom = () => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    const runStep = (key) => {
        const step = FLOW[key];
        if (!step)
            return;
        if (step.action === 'start') {
            runStep('start');
            return;
        }
        if (step.action === 'events_menu') {
            runStep('📅 Lịch sự kiện');
            return;
        }
        if (step.action === 'maps') {
            window.open('https://maps.google.com/?q=220+Đống+Đa,+Hải+Châu,+Đà+Nẵng', '_blank');
        }
        if (step.action === 'causieu') {
            onNavigate('causieu');
            return;
        }
        if (!step.msg)
            return;
        setOptions([]);
        setTyping(true);
        scrollBottom();
        setTimeout(() => {
            setTyping(false);
            setMsgs(m => [...m, { role: 'bot', text: step.msg, time: now() }]);
            setOptions(step.options);
            scrollBottom();
        }, 900);
    };
    const pick = (opt) => {
        setMsgs(m => [...m, { role: 'user', text: opt, time: now() }]);
        setOptions([]);
        setTimeout(() => runStep(opt), 500);
    };
    useEffect(() => { runStep('start'); }, []);
    // ── Avatar component ──────────────────────────────────
    const BotAvatar = () => (_jsx("img", { src: BOT_AVATAR, alt: "Ch\u00F9a Thu\u1EADn Ch\u00E2u", className: "w-8 h-8 rounded-full object-cover ring-2 ring-amber-400/50 flex-shrink-0 shadow-sm" }));
    return (_jsxs("div", { className: "flex flex-col", style: { height: '100%' }, children: [_jsxs("div", { className: "relative text-center py-5 px-4 overflow-hidden flex-shrink-0", style: { background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f,#1a4a2a)' }, children: [_jsx("div", { className: "absolute inset-0 opacity-10", style: { backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(200,151,58,.4) 24px,rgba(200,151,58,.4) 26px)' } }), _jsxs("div", { className: "relative flex items-center justify-center gap-2.5", children: [_jsx("img", { src: BOT_AVATAR, alt: "", className: "w-8 h-8 rounded-full object-cover ring-2 ring-amber-400/60" }), _jsx("h2", { className: "font-['Cormorant_Garamond'] text-[20px] font-bold text-amber-200", children: "H\u1ECFi \u0110\u00E1p" })] }), _jsx("div", { className: "w-14 h-px mx-auto my-2", style: { background: 'linear-gradient(90deg,transparent,#c8973a,transparent)' } }), _jsx("p", { className: "text-[11.5px] italic", style: { color: 'rgba(232,201,122,0.75)' }, children: "Tr\u1EE3 l\u00FD t\u1EF1 \u0111\u1ED9ng c\u1EE7a ch\u00F9a" })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-amber-50/40", style: { overscrollBehavior: 'contain' }, children: [msgs.map((m, i) => (_jsxs("div", { className: `flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'items-end'}`, children: [m.role === 'bot' && _jsx(BotAvatar, {}), _jsxs("div", { className: `flex flex-col gap-1 max-w-[78%] ${m.role === 'user' ? 'items-end' : 'items-start'}`, children: [_jsx("div", { className: `px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-line shadow-sm ${m.role === 'bot'
                                            ? 'bg-white text-stone-800 border border-amber-100/80 rounded-bl-sm'
                                            : 'text-amber-50 rounded-br-sm'}`, style: m.role === 'user' ? { background: 'linear-gradient(135deg,#2d6a3f,#1a4a2a)' } : {}, children: m.text }), _jsx("span", { className: "text-[10px] text-stone-400 px-1", children: m.time })] })] }, i))), typing && (_jsxs("div", { className: "flex gap-2.5 items-end", children: [_jsx(BotAvatar, {}), _jsx("div", { className: "bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-amber-100 flex gap-1.5 items-center", children: [0, 1, 2].map(i => (_jsx("div", { className: "w-2 h-2 rounded-full bg-stone-300 animate-bounce", style: { animationDelay: `${i * 0.15}s` } }, i))) })] })), _jsx("div", { ref: bottomRef })] }), options.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 px-4 py-3 bg-white border-t border-amber-100 flex-shrink-0", children: options.map(o => (_jsx("button", { onClick: () => pick(o), className: "px-4 py-2 border-2 border-amber-300 bg-amber-50 text-[#1a4a2a] rounded-full text-[12.5px] font-semibold hover:bg-amber-100 active:scale-95 transition-all whitespace-nowrap", children: o }, o))) }))] }));
}
