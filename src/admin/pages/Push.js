import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { savePushLog, loadTokenCount } from '../../lib/firebase';
import { auth } from '../../lib/firebase';
export default function Push({ toast }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [url, setUrl] = useState('https://tommyhoang2911.github.io/thuan-chau-pagoda/');
    const [sending, setSending] = useState(false);
    const [tokens, setTokens] = useState(null);
    useEffect(() => { loadTokenCount().then(setTokens); }, []);
    const send = async () => {
        if (!title.trim() || !body.trim()) {
            toast('Vui lòng nhập tiêu đề và nội dung', 'error');
            return;
        }
        setSending(true);
        try {
            await savePushLog({ title, body, url, sentBy: auth.currentUser?.email ?? 'admin' });
            toast('✅ Đã lưu thông báo vào Firestore', 'success');
            setTitle('');
            setBody('');
        }
        catch {
            toast('Lỗi ghi Firestore', 'error');
        }
        finally {
            setSending(false);
        }
    };
    return (_jsxs("div", { children: [_jsx("h2", { className: "font-['Cormorant_Garamond'] text-[26px] font-bold text-[#1a4a2a] mb-1", children: "\uD83D\uDD14 Push Notification" }), _jsx("p", { className: "text-[13px] text-stone-400 mb-6", children: "G\u1EEDi th\u00F4ng b\u00E1o \u0111\u1EBFn Ph\u1EADt t\u1EED \u0111\u00E3 c\u00E0i app" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-stone-100 p-6", children: [_jsx("h3", { className: "font-semibold text-[15px] text-stone-800 mb-5 flex items-center gap-2", children: "\u270D\uFE0F So\u1EA1n th\u00F4ng b\u00E1o" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5", children: "Ti\u00EAu \u0111\u1EC1 *" }), _jsx("input", { className: "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition", placeholder: "VD: L\u1EC5 Vu Lan s\u1EAFp di\u1EC5n ra \uD83C\uDFEE", value: title, onChange: e => { setTitle(e.target.value); } })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5", children: "N\u1ED9i dung *" }), _jsx("textarea", { className: "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition min-h-[100px] resize-none", placeholder: "K\u00EDnh m\u1EDDi qu\u00FD Ph\u1EADt t\u1EED tham d\u1EF1\u2026", value: body, onChange: e => setBody(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1.5", children: "Link khi click" }), _jsx("input", { className: "w-full border border-stone-200 rounded-xl px-3 py-2.5 text-[14px] bg-stone-50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition", value: url, onChange: e => setUrl(e.target.value) })] })] }), _jsxs("button", { onClick: send, disabled: sending, className: "w-full mt-6 py-3.5 rounded-xl text-white font-semibold text-[14px] shadow-md transition hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2", style: { background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }, children: [sending && _jsx("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }), sending ? 'Đang gửi…' : '🔔 Gửi thông báo'] }), _jsx("p", { className: "text-[11.5px] text-stone-400 text-center mt-3 italic", children: "L\u01B0u log v\u00E0o Firestore. C\u1EA7n FCM Server Key \u0111\u1EC3 g\u1EEDi push th\u1EADt." })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-stone-100 p-6", children: [_jsx("h3", { className: "font-semibold text-[15px] text-stone-800 mb-4", children: "\uD83D\uDC41\uFE0F Preview" }), _jsxs("div", { className: "rounded-2xl p-4 text-white", style: { background: 'linear-gradient(135deg,#1a1a2e,#1a4a2a)' }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("img", { src: "/thuan-chau-pagoda/logo.png", className: "w-5 h-5 rounded-full object-cover", alt: "" }), _jsx("span", { className: "text-[11px] opacity-60", children: "Ch\u00F9a Thu\u1EADn Ch\u00E2u \u00B7 V\u1EEBa xong" })] }), _jsx("p", { className: "font-semibold text-[14px] mb-1", children: title || 'Tiêu đề thông báo' }), _jsx("p", { className: "text-[13px] opacity-75 leading-relaxed", children: body || 'Nội dung thông báo sẽ hiển thị ở đây…' })] })] }), _jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-2xl p-5", children: [_jsxs("p", { className: "text-[13px] text-stone-600 mb-4", children: ["\uD83D\uDCF1 Thi\u1EBFt b\u1ECB \u0111\u00E3 \u0111\u0103ng k\u00FD:", ' ', _jsx("strong", { className: "text-[#1a4a2a]", children: tokens === null ? '…' : `${tokens} thiết bị` })] }), _jsx("p", { className: "text-[12.5px] font-bold text-[#1a4a2a] mb-2", children: "\uD83D\uDCCB Thi\u1EBFt l\u1EADp FCM (1 l\u1EA7n)" }), _jsxs("ol", { className: "text-[12px] text-stone-500 space-y-1.5 list-decimal list-inside leading-relaxed", children: [_jsx("li", { children: "Firebase Console \u2192 Project Settings" }), _jsx("li", { children: "Cloud Messaging \u2192 Generate Web Push certificate" }), _jsxs("li", { children: ["Copy VAPID Key \u2192 GitHub Secret ", _jsx("code", { className: "bg-white px-1.5 py-0.5 rounded text-[11px]", children: "FIREBASE_VAPID_KEY" })] }), _jsxs("li", { children: ["Server Key \u2192 GitHub Secret ", _jsx("code", { className: "bg-white px-1.5 py-0.5 rounded text-[11px]", children: "FCM_SERVER_KEY" })] })] })] })] })] })] }));
}
