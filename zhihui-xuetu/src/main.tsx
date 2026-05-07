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
          colorPrimary: '#2f80ff',
          colorSuccess: '#16b07b',
          colorWarning: '#ffb02e',
          colorBgLayout: '#f4f9ff',
          colorText: '#17324d',
          fontFamily: '"Outfit", "PingFang SC", "Microsoft YaHei", sans-serif',
          borderRadius: 20,
        },
        components: {
          Layout: {
            bodyBg: '#f4f9ff',
            headerBg: 'rgba(255, 255, 255, 0.78)',
          },
          Card: {
            colorBgContainer: 'rgba(255, 255, 255, 0.88)',
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
