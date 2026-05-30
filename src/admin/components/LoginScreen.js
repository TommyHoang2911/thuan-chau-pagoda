import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { loginGoogle } from '../../lib/firebase';
export default function LoginScreen() {
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        setErr('');
        setLoading(true);
        try {
            await loginGoogle();
        }
        catch (e) {
            setErr(e instanceof Error ? e.message : 'Đăng nhập thất bại');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen flex items-center justify-center p-4", style: { background: 'linear-gradient(160deg,#1a4a2a 0%,#2d6a3f 50%,#1a3a20 100%)' }, children: [_jsx("div", { className: "absolute inset-0 opacity-10", style: { backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 30px,rgba(200,151,58,.3) 30px,rgba(200,151,58,.3) 32px)' } }), _jsxs("div", { className: "relative bg-[#fdf6e8] rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center", children: [_jsx("img", { src: "/thuan-chau-pagoda/logo.png", alt: "Logo", className: "w-24 h-24 rounded-full object-cover mx-auto mb-5 ring-4 ring-amber-400/50 shadow-lg" }), _jsx("h1", { className: "font-['Cormorant_Garamond'] text-[28px] font-bold text-[#1a4a2a] leading-tight", children: "Ch\u00F9a Thu\u1EADn Ch\u00E2u" }), _jsx("p", { className: "text-[13px] text-stone-500 italic mt-1 mb-1", children: "Admin Dashboard" }), _jsx("div", { className: "w-16 h-px mx-auto my-5", style: { background: 'linear-gradient(90deg,transparent,#c8973a,transparent)' } }), _jsxs("p", { className: "text-[13px] text-stone-500 mb-6 leading-relaxed", children: ["\u0110\u0103ng nh\u1EADp \u0111\u1EC3 qu\u1EA3n l\u00FD s\u1EF1 ki\u1EC7n,", _jsx("br", {}), "danh s\u00E1ch c\u1EA7u si\u00EAu v\u00E0 th\u00F4ng b\u00E1o."] }), _jsxs("button", { onClick: handleLogin, disabled: loading, className: "w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white\n            border-2 border-stone-200 rounded-2xl font-semibold text-[15px] text-stone-700\n            hover:border-amber-400 hover:shadow-md transition-all disabled:opacity-60 shadow-sm", children: [loading
                                ? _jsx("span", { className: "w-5 h-5 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin" })
                                : _jsx("img", { src: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg", className: "w-5 h-5", alt: "G" }), loading ? 'Đang đăng nhập…' : 'Đăng nhập bằng Google'] }), err && _jsx("p", { className: "mt-4 text-[12.5px] text-red-500 bg-red-50 rounded-xl p-3", children: err }), _jsx("p", { className: "mt-5 text-[11.5px] text-stone-400 italic", children: "Ch\u1EC9 t\u00E0i kho\u1EA3n \u0111\u01B0\u1EE3c u\u1EF7 quy\u1EC1n m\u1EDBi truy c\u1EADp \u0111\u01B0\u1EE3c" })] })] }));
}
