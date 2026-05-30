import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { loadEvents, createEvent, updateEvent, deleteEvent } from '../../lib/firebase';
const EMOJIS = ['🌸', '🏮', '🙏', '🧘', '🕯️', '☸', '🪷', '📖', '🎋', '🌕', '🔔', '🫧'];
const BADGES = ['Lễ hội', 'Khóa tu', 'Cầu an', 'Đại lễ', 'Cầu siêu', 'Pháp thoại', 'Khác'];
const EMPTY = { title: '', emoji: '🌸', badge: 'Lễ hội', day: '', month: '', date: '', time: '', loc: '', desc: '' };
export default function EventsAdmin({ toast }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, editing: null });
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);
    const reload = async () => { setLoading(true); setEvents(await loadEvents()); setLoading(false); };
    useEffect(() => { reload(); }, []);
    const openNew = () => { setForm(EMPTY); setModal({ open: true, editing: null }); };
    const openEdit = (e) => { setForm({ ...e }); setModal({ open: true, editing: e }); };
    const closeModal = () => setModal({ open: false, editing: null });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
    const save = async () => {
        if (!form.title.trim()) {
            toast('Vui lòng nhập tên sự kiện', 'error');
            return;
        }
        setSaving(true);
        try {
            if (modal.editing) {
                await updateEvent(modal.editing.id, form);
                toast('✅ Đã cập nhật sự kiện', 'success');
            }
            else {
                await createEvent(form);
                toast('✅ Đã thêm sự kiện mới', 'success');
            }
            closeModal();
            reload();
        }
        catch {
            toast('Lỗi khi lưu', 'error');
        }
        finally {
            setSaving(false);
        }
    };
    const del = async (e) => {
        if (!confirm(`Xóa sự kiện "${e.title}"?`))
            return;
        try {
            await deleteEvent(e.id);
            toast('🗑️ Đã xóa', 'success');
            reload();
        }
        catch {
            toast('Lỗi khi xóa', 'error');
        }
    };
    const inp = 'w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition';
    const lbl = 'block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5';
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-start justify-between mb-6 gap-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a]", children: "\uD83D\uDCC5 Qu\u1EA3n l\u00FD S\u1EF1 Ki\u1EC7n" }), _jsx("p", { className: "text-[13px] text-stone-400 mt-0.5", children: "Th\u00EAm, s\u1EEDa, x\u00F3a s\u1EF1 ki\u1EC7n tr\u00EAn app" })] }), _jsx("button", { onClick: openNew, className: "flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold text-white shadow-md transition hover:opacity-90", style: { background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }, children: "+ Th\u00EAm s\u1EF1 ki\u1EC7n" })] }), _jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden", children: loading ? (_jsxs("div", { className: "flex items-center justify-center py-16 text-stone-400 gap-3", children: [_jsx("div", { className: "w-5 h-5 border-2 border-stone-200 border-t-amber-400 rounded-full animate-spin" }), "\u0110ang t\u1EA3i\u2026"] })) : events.length === 0 ? (_jsxs("div", { className: "text-center py-16 text-stone-400", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDCC5" }), _jsx("p", { className: "text-[13.5px]", children: "Ch\u01B0a c\u00F3 s\u1EF1 ki\u1EC7n n\u00E0o" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-[13.5px]", children: [_jsx("thead", { children: _jsx("tr", { className: "bg-stone-50 text-stone-500 text-[11px] uppercase tracking-wider", children: ['Sự kiện', 'Ngày', 'Thời gian', 'Địa điểm', ''].map(h => (_jsx("th", { className: "px-5 py-3 text-left font-semibold", children: h }, h))) }) }), _jsx("tbody", { children: events.map(e => (_jsxs("tr", { className: "border-t border-stone-100 hover:bg-stone-50 transition-colors", children: [_jsx("td", { className: "px-5 py-3", children: _jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("span", { className: "text-2xl", children: e.emoji }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-stone-800", children: e.title }), _jsx("span", { className: "text-[11px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium", children: e.badge })] })] }) }), _jsxs("td", { className: "px-5 py-3 text-stone-600 whitespace-nowrap", children: [e.day, " ", e.month] }), _jsx("td", { className: "px-5 py-3 text-stone-500 whitespace-nowrap", children: e.time || '—' }), _jsx("td", { className: "px-5 py-3 text-stone-500", children: e.loc || '—' }), _jsx("td", { className: "px-5 py-3", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => openEdit(e), className: "px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-[12px] font-medium hover:border-amber-400 hover:text-amber-700 transition", children: "\u270F\uFE0F S\u1EEDa" }), _jsx("button", { onClick: () => del(e), className: "px-3 py-1.5 rounded-lg border border-red-100 text-red-400 text-[12px] font-medium hover:bg-red-50 transition", children: "\uD83D\uDDD1\uFE0F" })] }) })] }, e.id))) })] }) })) }), modal.open && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: { background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }, onClick: e => e.target === e.currentTarget && closeModal(), children: _jsxs("div", { className: "bg-[#fdf6e8] rounded-3xl p-7 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl", children: [_jsx("h3", { className: "font-['Cormorant_Garamond'] text-[22px] font-bold text-[#1a4a2a] mb-5 pb-4 border-b border-amber-200", children: modal.editing ? '✏️ Sửa Sự Kiện' : '➕ Thêm Sự Kiện Mới' }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: lbl, children: "T\u00EAn s\u1EF1 ki\u1EC7n *" }), _jsx("input", { className: inp, placeholder: "VD: L\u1EC5 V\u00EDa \u0110\u1EE9c Ph\u1EADt A Di \u0110\u00E0", value: form.title, onChange: e => set('title', e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: lbl, children: "Ng\u00E0y hi\u1EC3n th\u1ECB" }), _jsx("input", { className: inp, placeholder: "VD: 15", value: form.day, onChange: e => set('day', e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: lbl, children: "Th\u00E1ng hi\u1EC3n th\u1ECB" }), _jsx("input", { className: inp, placeholder: "VD: Th\u00E1ng 6", value: form.month, onChange: e => set('month', e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: lbl, children: "Ng\u00E0y th\u1EF1c t\u1EBF (sort)" }), _jsx("input", { className: inp, type: "date", value: form.date, onChange: e => set('date', e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: lbl, children: "Th\u1EDDi gian" }), _jsx("input", { className: inp, placeholder: "07:00 \u2013 11:00", value: form.time, onChange: e => set('time', e.target.value) })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: lbl, children: "\u0110\u1ECBa \u0111i\u1EC3m" }), _jsx("input", { className: inp, placeholder: "Ch\u00E1nh \u0110i\u1EC7n", value: form.loc, onChange: e => set('loc', e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: lbl, children: "Lo\u1EA1i (badge)" }), _jsx("select", { className: inp, value: form.badge, onChange: e => set('badge', e.target.value), children: BADGES.map(b => _jsx("option", { children: b }, b)) })] })] }), _jsxs("div", { children: [_jsx("label", { className: lbl, children: "Emoji" }), _jsx("div", { className: "flex flex-wrap gap-2 mt-1", children: EMOJIS.map(em => (_jsx("button", { onClick: () => set('emoji', em), className: `text-2xl px-2 py-1.5 rounded-xl border-2 transition ${form.emoji === em ? 'border-amber-400 bg-amber-50' : 'border-transparent hover:border-stone-200'}`, children: em }, em))) })] }), _jsxs("div", { children: [_jsx("label", { className: lbl, children: "M\u00F4 t\u1EA3" }), _jsx("textarea", { className: `${inp} min-h-[80px] resize-none`, placeholder: "M\u00F4 t\u1EA3 chi ti\u1EBFt\u2026", value: form.desc, onChange: e => set('desc', e.target.value) })] })] }), _jsxs("div", { className: "flex gap-3 mt-6 pt-5 border-t border-amber-200", children: [_jsx("button", { onClick: closeModal, className: "flex-1 py-3 rounded-xl border-2 border-stone-200 text-stone-600 text-[13.5px] font-semibold hover:border-stone-300 transition", children: "H\u1EE7y" }), _jsxs("button", { onClick: save, disabled: saving, className: "flex-1 py-3 rounded-xl text-white text-[13.5px] font-semibold shadow-md transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2", style: { background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }, children: [saving && _jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }), saving ? 'Đang lưu…' : '💾 Lưu'] })] })] }) }))] }));
}
