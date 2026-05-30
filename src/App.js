import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Events from './pages/Events';
import CauSieu from './pages/CauSieu';
import Chat from './pages/Chat';
import About from './pages/About';
export default function App() {
    const [tab, setTab] = useState('events');
    const handleNotif = async () => {
        if (!('Notification' in window))
            return;
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
            new Notification('Chùa Thuận Châu 🙏', {
                body: 'Bạn sẽ nhận thông báo sự kiện từ chùa.',
                icon: '/thuan-chau-pagoda/icon-192.png'
            });
        }
    };
    const changeTab = (t) => {
        setTab(t);
        // scroll về đầu cho các tab cuộn dọc
        if (t !== 'chat') {
            setTimeout(() => {
                document.getElementById('main-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
        }
    };
    return (_jsxs("div", { className: "flex flex-col bg-amber-50", style: { height: '100dvh' }, children: ["   ", _jsx(Header, { onNotif: handleNotif }), _jsxs("main", { id: "main-scroll", className: "flex-1 overflow-hidden relative", children: [_jsx("div", { className: `absolute inset-0 overflow-y-auto overflow-x-hidden ${tab === 'events' ? 'block' : 'hidden'}`, style: { WebkitOverflowScrolling: 'touch' }, children: _jsx("div", { className: "animate-[fadeUp_.25s_ease] pb-4", children: _jsx(Events, {}) }) }), _jsx("div", { className: `absolute inset-0 overflow-y-auto overflow-x-hidden ${tab === 'causieu' ? 'block' : 'hidden'}`, style: { WebkitOverflowScrolling: 'touch' }, children: _jsx("div", { className: "animate-[fadeUp_.25s_ease] pb-4", children: _jsx(CauSieu, {}) }) }), _jsx("div", { className: `absolute inset-0 flex flex-col ${tab === 'chat' ? 'flex' : 'hidden'}`, children: _jsx("div", { className: "animate-[fadeUp_.25s_ease] flex flex-col flex-1 overflow-hidden", children: _jsx(Chat, { onNavigate: t => changeTab(t) }) }) }), _jsx("div", { className: `absolute inset-0 overflow-y-auto overflow-x-hidden ${tab === 'about' ? 'block' : 'hidden'}`, style: { WebkitOverflowScrolling: 'touch' }, children: _jsx("div", { className: "animate-[fadeUp_.25s_ease] pb-4", children: _jsx(About, {}) }) })] }), _jsx(BottomNav, { active: tab, onChange: changeTab })] }));
}
