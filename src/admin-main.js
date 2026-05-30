import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AdminApp from './admin/AdminApp';
import ErrorBoundary from './admin/components/ErrorBoundary';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(ErrorBoundary, { children: _jsx(AdminApp, {}) }) }));
