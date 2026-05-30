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
    return (_jsxs("div", { className: "flex flex-col h-screen bg-amber-50 overflow-hidden", children: [_jsx(Header, { onNotif: handleNotif }), _jsxs("main", { className: "flex-1 overflow-y-auto overflow-x-hidden scroll-smooth", style: { WebkitOverflowScrolling: 'touch' }, children: [_jsx("div", { className: tab === 'events' ? 'block animate-[fadeUp_.25s_ease]' : 'hidden', children: _jsx(Events, {}) }), _jsx("div", { className: tab === 'causieu' ? 'block animate-[fadeUp_.25s_ease]' : 'hidden', children: _jsx(CauSieu, {}) }), _jsx("div", { className: tab === 'chat' ? 'flex flex-col h-full animate-[fadeUp_.25s_ease]' : 'hidden', children: _jsx(Chat, { onNavigate: t => setTab(t) }) }), _jsx("div", { className: tab === 'about' ? 'block animate-[fadeUp_.25s_ease]' : 'hidden', children: _jsx(About, {}) })] }), _jsx(BottomNav, { active: tab, onChange: t => { setTab(t); window.scrollTo(0, 0); } })] }));
}
