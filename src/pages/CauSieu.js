import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { saveCauSieu } from '../lib/firebase';
const CEREMONIES = [
    'Lễ Cầu An đầu tháng (Mùng 1)',
    'Lễ Rằm hàng tháng',
    'Đại Lễ Vu Lan – Báo Hiếu',
    'Tụng kinh Chủ Nhật hàng tuần',
    'Khác (ghi rõ ở phần ghi chú)',
];
export default function CauSieu() {
    const [form, setForm] = useState({ name: '', phone: '', ceremony: '', names: [''], relation: '', note: '' });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState({});
    const topRef = useRef(null);
    const set = (k, v) => {
        setForm(f => ({ ...f, [k]: v }));
        setErrors(e => ({ ...e, [k]: '' }));
    };
    const setName = (i, v) => {
        setForm(f => { const names = [...f.names]; names[i] = v; return { ...f, names }; });
    };
    const addName = () => setForm(f => ({ ...f, names: [...f.names, ''] }));
    const removeName = (i) => setForm(f => ({ ...f, names: f.names.filter((_, j) => j !== i) }));
    const validate = () => {
        const e = {};
        if (!form.name.trim())
            e.name = 'Vui lòng nhập họ tên';
        if (!form.phone.trim())
            e.phone = 'Vui lòng nhập số điện thoại';
        if (!form.ceremony)
            e.ceremony = 'Vui lòng chọn buổi lễ';
        if (!form.names.some(n => n.trim()))
            e.names = 'Vui lòng nhập ít nhất một hương linh';
        return e;
    };
    const submit = async () => {
        const e = validate();
        if (Object.keys(e).length) {
            setErrors(e);
            return;
        }
        setSubmitting(true);
        try {
            await saveCauSieu({ ...form, names: form.names.filter(n => n.trim()) });
            setDone(true);
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        catch {
            setErrors({ form: 'Có lỗi xảy ra, vui lòng thử lại' });
        }
        finally {
            setSubmitting(false);
        }
    };
    const reset = () => {
        setForm({ name: '', phone: '', ceremony: '', names: [''], relation: '', note: '' });
        setDone(false);
        setErrors({});
    };
    const inp = 'w-full border border-amber-200 rounded-xl px-3.5 py-2.5 text-[14px] bg-amber-50/60 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition';
    const lbl = 'block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5';
    return (_jsxs("div", { ref: topRef, children: [_jsxs("div", { className: "relative bg-gradient-to-br from-[#1a4a2a] via-[#2d6a3f] to-[#1a4a2a] text-center py-6 px-4 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-10", style: { backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 24px,rgba(200,151,58,.4) 24px,rgba(200,151,58,.4) 26px)' } }), _jsx("h2", { className: "font-['Cormorant_Garamond'] text-[22px] font-bold text-amber-200 relative", children: "\uD83D\uDD6F\uFE0F \u0110\u0103ng K\u00FD C\u1EA7u Si\u00EAu" }), _jsx("div", { className: "w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-2.5" }), _jsx("p", { className: "text-[12px] text-amber-200/70 italic relative", children: "G\u1EEDi danh s\u00E1ch h\u01B0\u01A1ng linh \u0111\u1EC3 ch\u00F9a t\u1EE5ng kinh h\u1ED3i h\u01B0\u1EDBng" })] }), _jsx("div", { className: "p-4 flex flex-col gap-4", children: done ? (_jsxs("div", { className: "bg-white rounded-2xl p-8 text-center shadow-md border border-amber-200/40 animate-[fadeIn_.4s_ease]", children: [_jsx("span", { className: "text-6xl block mb-4", children: "\uD83E\uDEB7" }), _jsx("h3", { className: "font-['Cormorant_Garamond'] text-[22px] font-bold text-[#7a1c1c] mb-2", children: "Nam m\u00F4 A Di \u0110\u00E0 Ph\u1EADt" }), _jsxs("p", { className: "text-[13.5px] text-stone-500 leading-loose", children: ["\u0110\u0103ng k\u00FD c\u1EE7a qu\u00FD Ph\u1EADt t\u1EED \u0111\u00E3 \u0111\u01B0\u1EE3c ghi nh\u1EADn.", _jsx("br", {}), "Ban h\u1ED9 t\u1EF1 s\u1EBD \u0111\u1ECDc danh s\u00E1ch h\u01B0\u01A1ng linh", _jsx("br", {}), "trong bu\u1ED5i l\u1EC5 \u0111\u00E3 ch\u1ECDn.", _jsx("br", {}), _jsx("br", {}), "H\u1ED3i h\u01B0\u1EDBng c\u00F4ng \u0111\u1EE9c l\u00E0nh \u0111\u1EBFn t\u1EA5t c\u1EA3 ch\u00FAng sinh."] }), _jsx("button", { onClick: reset, className: "mt-6 px-6 py-2.5 border-2 border-amber-400 text-amber-700 rounded-xl text-[13.5px] font-semibold hover:bg-amber-50 transition", children: "\uD83D\uDE4F \u0110\u0103ng k\u00FD th\u00EAm" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-md border border-amber-200/40", children: [_jsx("h3", { className: "font-['Cormorant_Garamond'] text-[16px] font-bold text-[#7a1c1c] mb-4 flex items-center gap-2", children: "\uD83D\uDC64 Th\u00F4ng Tin Ng\u01B0\u1EDDi \u0110\u0103ng K\u00FD" }), _jsxs("div", { className: "space-y-3.5", children: [_jsxs("div", { children: [_jsxs("label", { className: lbl, children: ["H\u1ECD v\u00E0 t\u00EAn ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("input", { className: `${inp} ${errors.name ? 'border-red-400' : ''}`, placeholder: "Nguy\u1EC5n Th\u1ECB Lan", value: form.name, onChange: e => set('name', e.target.value) }), errors.name && _jsx("p", { className: "text-[11.5px] text-red-500 mt-1", children: errors.name })] }), _jsxs("div", { children: [_jsxs("label", { className: lbl, children: ["S\u1ED1 \u0111i\u1EC7n tho\u1EA1i ", _jsx("span", { className: "text-orange-500", children: "*" })] }), _jsx("input", { className: `${inp} ${errors.phone ? 'border-red-400' : ''}`, type: "tel", placeholder: "0901 234 567", value: form.phone, onChange: e => set('phone', e.target.value) }), errors.phone && _jsx("p", { className: "text-[11.5px] text-red-500 mt-1", children: errors.phone })] })] })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-md border border-amber-200/40", children: [_jsx("h3", { className: "font-['Cormorant_Garamond'] text-[16px] font-bold text-[#7a1c1c] mb-4 flex items-center gap-2", children: "\uD83D\uDDD3\uFE0F Ch\u1ECDn Bu\u1ED5i L\u1EC5" }), _jsxs("div", { className: "space-y-2", children: [CEREMONIES.map(c => (_jsxs("button", { onClick: () => set('ceremony', c), className: `w-full text-left px-4 py-3 rounded-xl border-2 text-[13.5px] transition-all ${form.ceremony === c
                                                ? 'border-amber-400 bg-amber-50 text-[#3d1a00] font-semibold'
                                                : 'border-amber-100 text-stone-600 hover:border-amber-300'}`, children: [form.ceremony === c ? '✅ ' : '○ ', c] }, c))), errors.ceremony && _jsx("p", { className: "text-[11.5px] text-red-500 mt-1", children: errors.ceremony })] })] }), _jsxs("div", { className: "bg-white rounded-2xl p-5 shadow-md border border-amber-200/40", children: [_jsx("h3", { className: "font-['Cormorant_Garamond'] text-[16px] font-bold text-[#7a1c1c] mb-4 flex items-center gap-2", children: "\uD83D\uDCDC Danh S\u00E1ch H\u01B0\u01A1ng Linh" }), _jsx("div", { className: "border border-amber-200 rounded-xl overflow-hidden mb-3", children: form.names.map((n, i) => (_jsxs("div", { className: `flex items-center gap-2.5 px-3 py-2.5 ${i < form.names.length - 1 ? 'border-b border-dashed border-amber-100' : ''}`, children: [_jsx("span", { className: "w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0", children: i + 1 }), _jsx("input", { className: "flex-1 text-[14px] bg-transparent outline-none placeholder:text-stone-300", placeholder: "H\u1ECD t\u00EAn ng\u01B0\u1EDDi qu\u00E1 c\u1ED1\u2026", value: n, onChange: e => setName(i, e.target.value) }), form.names.length > 1 && (_jsx("button", { onClick: () => removeName(i), className: "text-stone-300 hover:text-orange-500 transition text-lg leading-none", children: "\u2715" }))] }, i))) }), errors.names && _jsx("p", { className: "text-[11.5px] text-red-500 mb-2", children: errors.names }), _jsx("button", { onClick: addName, className: "w-full py-2.5 border-2 border-dashed border-amber-300 text-amber-600 rounded-xl text-[13px] font-medium hover:bg-amber-50 transition", children: "+ Th\u00EAm h\u01B0\u01A1ng linh" }), _jsxs("div", { className: "mt-4 space-y-3.5", children: [_jsxs("div", { children: [_jsx("label", { className: lbl, children: "Quan h\u1EC7" }), _jsx("input", { className: inp, placeholder: "VD: \u00D4ng n\u1ED9i, b\u00E0 ngo\u1EA1i, cha, m\u1EB9\u2026", value: form.relation, onChange: e => set('relation', e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: lbl, children: "Ghi ch\u00FA" }), _jsx("textarea", { className: `${inp} min-h-[72px] resize-none`, placeholder: "N\u0103m sinh, n\u0103m m\u1EA5t, \u0111\u1ECBa ph\u01B0\u01A1ng\u2026 (n\u1EBFu c\u00F3)", value: form.note, onChange: e => set('note', e.target.value) })] })] })] }), errors.form && _jsx("p", { className: "text-[13px] text-red-500 text-center", children: errors.form }), _jsx("button", { onClick: submit, disabled: submitting, className: "w-full py-4 bg-gradient-to-r from-[#7a1c1c] to-[#3d1a00] text-amber-200 rounded-2xl font-['Cormorant_Garamond'] text-[18px] font-bold tracking-wider shadow-lg disabled:opacity-60 hover:opacity-90 active:scale-[.98] transition-all", children: submitting ? '⏳ Đang gửi…' : '🙏 Gửi Đăng Ký Cầu Siêu' })] })) })] }));
}
