import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#14b8a6',
          colorSuccess: '#10b981',
          colorWarning: '#f59e0b',
          colorError: '#ef4444',
          colorInfo: '#3b82f6',
          colorBgLayout: '#f8fafc',
          colorText: '#374151',
          fontFamily: 'Inter, "Outfit", "PingFang SC", "Microsoft YaHei", sans-serif',
          fontSize: 14,
          borderRadius: 8,
          boxShadow: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
          boxShadowSecondary: '0 4px 12px rgba(15, 23, 42, 0.08)',
        },
        components: {
          Button: {
            controlHeight: 44,
            primaryShadow: '0 2px 8px rgba(20, 184, 166, 0.24)',
          },
          Layout: {
            bodyBg: '#f8fafc',
            headerBg: 'rgba(255, 255, 255, 0.88)',
          },
          Card: {
            colorBgContainer: '#ffffff',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
          },
        },
      }}
    >
      <AntApp>
        <HashRouter>
          <App />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  </React.StrictMode>,
);
