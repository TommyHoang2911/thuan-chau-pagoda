import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
export default class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-6", style: { background: 'linear-gradient(160deg,#1a4a2a,#2d6a3f)' }, children: _jsxs("div", { className: "bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl", children: [_jsx("img", { src: "/thuan-chau-pagoda/logo.png", className: "w-16 h-16 rounded-full mx-auto mb-4 object-cover", alt: "" }), _jsx("h2", { className: "font-['Cormorant_Garamond'] text-[22px] font-bold text-red-700 mb-2", children: "C\u00F3 l\u1ED7i x\u1EA3y ra" }), _jsx("p", { className: "text-[13px] text-stone-500 mb-4 leading-relaxed", children: this.state.error.message }), _jsx("div", { className: "bg-stone-50 rounded-xl p-3 text-left mb-4", children: _jsx("p", { className: "text-[11px] text-stone-400 font-mono break-all", children: this.state.error.stack?.slice(0, 200) }) }), _jsx("button", { onClick: () => window.location.reload(), className: "px-6 py-2.5 rounded-xl text-white text-[13.5px] font-semibold", style: { background: 'linear-gradient(135deg,#1a4a2a,#2d6a3f)' }, children: "\uD83D\uDD04 T\u1EA3i l\u1EA1i trang" })] }) }));
        }
        return this.props.children;
    }
}
