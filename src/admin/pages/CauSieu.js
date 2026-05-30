import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { loadCauSieu, updateCauSieuStatus } from '../../lib/firebase';
export default function CauSieuAdmin({ toast }) {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [detail, setDetail] = useState(null);
    const reload = async () => { setLoading(true); setList(await loadCauSieu()); setLoading(false); };
    useEffect(() => { reload(); }, []);
    const toggleStatus = async (r) => {
        const next = r.status === 'done' ? 'pending' : 'done';
        try {
            await updateCauSieuStatus(r.id, next);
            toast(next === 'done' ? '✅ Đánh dấu hoàn thành' : '↩️ Chuyển về chờ xử lý', 'success');
            reload();
        }
        catch {
            toast('Lỗi cập nhật', 'error');
        }
    };
    const exportCSV = () => {
        const rows = [['Họ tên', 'SĐT', 'Buổi lễ', 'Hương linh', 'Quan hệ', 'Ghi chú', 'Trạng thái', 'Ngày đăng ký']];
        filtered.forEach(r => {
            const ts = r.createdAt?.seconds ? new Date(r.createdAt.seconds * 1000).toLocaleDateString('vi-VN') : '';
            rows.push([r.name, r.phone, r.ceremony, (r.names ?? []).join(' | '), r.relation ?? '', r.note ?? '', r.status, ts]);
        });
        const csv = rows.map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
        a.download = `causieu-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        toast('⬇️ Đã xuất CSV', 'success');
    };
    const filtered = list.filter(r => filter === 'all' || r.status === filter);
    const fmtDate = (ts) => ts ? new Date(ts.seconds * 1000).toLocaleDateString('vi-VN') : '—';
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-start justify-between mb-6 gap-4 flex-wrap", children: [_jsxs("div", { children: [_jsx("h2", { className: "font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a]", children: "\uD83D\uDCDC Danh S\u00E1ch C\u1EA7u Si\u00EAu" }), _jsx("p", { className: "text-[13px] text-stone-400 mt-0.5", children: "\u0110\u0103ng k\u00FD t\u1EEB Ph\u1EADt t\u1EED g\u1EEDi qua app" })] }), _jsxs("div", { className: "flex gap-2 flex-wrap", children: [['all', 'pending', 'done'].map(f => (_jsx("button", { onClick: () => setFilter(f), className: `px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border-2 transition ${filter === f ? 'border-[#1a4a2a] bg-[#1a4a2a] text-white' : 'border-stone-200 text-stone-500 hover:border-stone-300'}`, children: f === 'all' ? 'Tất cả' : f === 'pending' ? '⏳ Chờ' : '✅ Xong' }, f))), _jsx("button", { onClick: exportCSV, className: "px-3.5 py-2 rounded-xl text-[12.5px] font-semibold border-2 border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition", children: "\u2B07\uFE0F CSV" })] })] }), _jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden", children: loading ? (_jsxs("div", { className: "flex items-center justify-center py-16 text-stone-400 gap-3", children: [_jsx("div", { className: "w-5 h-5 border-2 border-stone-200 border-t-amber-400 rounded-full animate-spin" }), "\u0110ang t\u1EA3i\u2026"] })) : filtered.length === 0 ? (_jsxs("div", { className: "text-center py-16 text-stone-400", children: [_jsx("div", { className: "text-4xl mb-2", children: "\uD83D\uDCED" }), _jsx("p", { className: "text-[13.5px]", children: "Kh\u00F4ng c\u00F3 \u0111\u0103ng k\u00FD n\u00E0o" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-[13.5px]", children: [_jsx("thead", { children: _jsx("tr", { className: "bg-stone-50 text-stone-500 text-[11px] uppercase tracking-wider", children: ['Người đăng ký', 'SĐT', 'Buổi lễ', 'Hương linh', 'Ngày', 'Trạng thái', ''].map(h => (_jsx("th", { className: "px-5 py-3 text-left font-semibold", children: h }, h))) }) }), _jsx("tbody", { children: filtered.map(r => (_jsxs("tr", { className: "border-t border-stone-100 hover:bg-stone-50 transition-colors", children: [_jsx("td", { className: "px-5 py-3 font-semibold text-stone-800", children: r.name }), _jsx("td", { className: "px-5 py-3 text-stone-500", children: r.phone }), _jsx("td", { className: "px-5 py-3 text-stone-600 text-[12.5px] max-w-[160px] truncate", title: r.ceremony, children: r.ceremony }), _jsx("td", { className: "px-5 py-3", children: _jsxs("button", { onClick: () => setDetail(r), className: "text-[#1a4a2a] underline underline-offset-2 text-[12.5px] hover:text-amber-700 transition", children: [(r.names ?? []).length, " ng\u01B0\u1EDDi \u2192"] }) }), _jsx("td", { className: "px-5 py-3 text-stone-400 text-[12px] whitespace-nowrap", children: fmtDate(r.createdAt) }), _jsx("td", { className: "px-5 py-3", children: _jsx("span", { className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${r.status === 'done' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`, children: r.status === 'done' ? '✅ Xong' : '⏳ Chờ' }) }), _jsx("td", { className: "px-5 py-3", children: _jsx("button", { onClick: () => toggleStatus(r), className: "px-3 py-1.5 rounded-lg border border-stone-200 text-stone-500 text-[12px] font-medium hover:border-amber-400 hover:text-amber-700 transition whitespace-nowrap", children: r.status === 'done' ? '↩️ Hoàn tác' : '✅ Xong' }) })] }, r.id))) })] }) })) }), detail && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", style: { background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }, onClick: e => e.target === e.currentTarget && setDetail(null), children: _jsxs("div", { className: "bg-[#fdf6e8] rounded-3xl p-7 w-full max-w-md shadow-2xl", children: [_jsx("h3", { className: "font-['Cormorant_Garamond'] text-[20px] font-bold text-[#1a4a2a] mb-1", children: "\uD83D\uDCDC Danh S\u00E1ch H\u01B0\u01A1ng Linh" }), _jsxs("p", { className: "text-[12.5px] text-stone-500 mb-5", children: ["Ng\u01B0\u1EDDi \u0111\u0103ng k\u00FD: ", _jsx("strong", { children: detail.name }), " \u00B7 ", detail.phone] }), _jsx("div", { className: "bg-white rounded-2xl border border-amber-200 divide-y divide-amber-100 mb-4 overflow-hidden", children: (detail.names ?? []).map((n, i) => (_jsxs("div", { className: "flex items-center gap-3 px-4 py-2.5", children: [_jsx("span", { className: "w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0", children: i + 1 }), _jsx("span", { className: "text-[14px] text-stone-800", children: n })] }, i))) }), detail.relation && _jsxs("p", { className: "text-[13px] text-stone-500 mb-1", children: ["Quan h\u1EC7: ", detail.relation] }), detail.note && _jsxs("p", { className: "text-[13px] text-stone-500 mb-4", children: ["Ghi ch\u00FA: ", detail.note] }), _jsx("button", { onClick: () => setDetail(null), className: "w-full py-3 rounded-xl border-2 border-stone-200 text-stone-600 text-[13.5px] font-semibold hover:border-stone-300 transition", children: "\u0110\u00F3ng" })] }) }))] }));
}
