import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import { ToastContainer, useToast } from './components/Toast';
import Dashboard from './pages/Dashboard';
import EventsAdmin from './pages/Events';
import CauSieuAdmin from './pages/CauSieu';
import Push from './pages/Push';
export default function AdminApp() {
    const { user, loading } = useAuth();
    const [tab, setTab] = useState('dashboard');
    const { toasts, toast } = useToast();
    if (loading)
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", style: { background: 'linear-gradient(160deg,#1a4a2a,#2d6a3f)' }, children: _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("img", { src: "/thuan-chau-pagoda/logo.png", className: "w-16 h-16 rounded-full object-cover ring-4 ring-amber-400/40 animate-pulse", alt: "" }), _jsx("div", { className: "w-6 h-6 border-2 border-white/30 border-t-amber-400 rounded-full animate-spin" })] }) }));
    if (!user)
        return _jsx(LoginScreen, {});
    return (_jsxs("div", { className: "flex h-screen bg-stone-50 overflow-hidden", children: [_jsx(Sidebar, { active: tab, onChange: setTab, user: user }), _jsxs("main", { className: "flex-1 overflow-y-auto", children: [_jsxs("div", { className: "sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-stone-100 px-8 py-4 flex items-center justify-between shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-[13px] text-stone-400", children: [_jsx("span", { children: "Admin" }), _jsx("span", { children: "/" }), _jsx("span", { className: "text-stone-700 font-semibold capitalize", children: tab })] }), _jsxs("a", { href: "/thuan-chau-pagoda/", target: "_blank", className: "flex items-center gap-1.5 text-[12.5px] text-[#1a4a2a] font-semibold hover:opacity-75 transition", children: ["\uD83C\uDF10 Xem app ", _jsx("span", { className: "text-stone-400", children: "\u2197" })] })] }), _jsxs("div", { className: "p-8 max-w-5xl", children: [tab === 'dashboard' && _jsx(Dashboard, {}), tab === 'events' && _jsx(EventsAdmin, { toast: toast }), tab === 'causieu' && _jsx(CauSieuAdmin, { toast: toast }), tab === 'push' && _jsx(Push, { toast: toast })] })] }), _jsx(ToastContainer, { toasts: toasts })] }));
}
