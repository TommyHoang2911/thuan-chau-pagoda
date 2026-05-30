import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { requestPushPermission, onForegroundMessage } from './lib/firebase';
import Events from './pages/Events';
import CauSieu from './pages/CauSieu';
import Chat from './pages/Chat';
import About from './pages/About';
export default function App() {
    const [tab, setTab] = useState('chat');
    const handleNotif = async () => {
        const token = await requestPushPermission();
        if (token) {
            new Notification('Chùa Thuận Châu 🙏', {
                body: 'Đã bật thông báo. Bạn sẽ nhận tin từ chùa!',
                icon: '/thuan-chau-pagoda/icon-192.png',
            });
        }
    };
    // Foreground push → hiện native notification
    onForegroundMessage((payload) => {
        const p = payload;
        const title = p?.notification?.title ?? 'Chùa Thuận Châu';
        const body = p?.notification?.body ?? 'Có thông báo mới từ chùa.';
        new Notification(title, { body, icon: '/thuan-chau-pagoda/icon-192.png' });
    });
    const changeTab = (t) => {
        setTab(t);
        if (t !== 'chat') {
            setTimeout(() => {
                document.getElementById(`panel-${t}`)?.scrollTo({ top: 0, behavior: 'smooth' });
            }, 50);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, { onNotif: handleNotif, activeTab: tab }), _jsxs("main", { className: "flex-1 overflow-hidden relative", style: { background: '#f0f2f5' }, children: [_jsx("div", { className: `absolute inset-0 flex flex-col ${tab === 'chat' ? '' : 'hidden'}`, children: _jsx(Chat, { onNavigate: t => changeTab(t) }) }), _jsx("div", { id: "panel-events", className: `absolute inset-0 overflow-y-auto ${tab === 'events' ? '' : 'hidden'}`, style: { background: '#f5f5f5', WebkitOverflowScrolling: 'touch' }, children: _jsx("div", { className: "pb-6 animate-[fadeUp_.2s_ease]", children: _jsx(Events, {}) }) }), _jsx("div", { id: "panel-causieu", className: `absolute inset-0 overflow-y-auto ${tab === 'causieu' ? '' : 'hidden'}`, style: { background: '#f5f5f5', WebkitOverflowScrolling: 'touch' }, children: _jsx("div", { className: "pb-6 animate-[fadeUp_.2s_ease]", children: _jsx(CauSieu, {}) }) }), _jsx("div", { id: "panel-about", className: `absolute inset-0 overflow-y-auto ${tab === 'about' ? '' : 'hidden'}`, style: { background: '#f5f5f5', WebkitOverflowScrolling: 'touch' }, children: _jsx("div", { className: "pb-6 animate-[fadeUp_.2s_ease]", children: _jsx(About, {}) }) })] }), _jsx(BottomNav, { active: tab, onChange: changeTab })] }));
}
