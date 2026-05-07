import { HomeOutlined, TrophyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import type { NavItem } from '../types';

const navItems: NavItem[] = [
  { key: 'home', label: '首页', path: '/' },
  { key: 'forum', label: '校园论坛', path: '/forum' },
  { key: 'resources', label: '资源共享', path: '/resources' },
  { key: 'textbooks', label: '二手教材', path: '/textbooks' },
  { key: 'ebooks', label: '电子教材', path: '/ebooks' },
  { key: 'upload', label: '上传中心', path: '/upload' },
  { key: 'mall', label: '积分商城', path: '/mall' },
];

function Header() {
  const location = useLocation();
  const { name, points } = useAppStore((state) => state.user);

  return (
    <>
      <motion.div
        className="site-brand-float"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="site-brand glass-card">
          <div className="site-brand__logo">
            <HomeOutlined />
          </div>
          <div>
            <h1 className="site-brand__title">智汇学途</h1>
          </div>
        </div>
      </motion.div>

      <motion.header
        className="site-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="site-header__inner glass-card">
          <nav className="site-nav">
            {navItems.map((item) => {
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.key}
                  className={`site-nav__link ${active ? 'site-nav__link--active' : ''}`}
                  to={item.path}
                >
                  {item.label}
                  {active ? <motion.span className="site-nav__underline" layoutId="nav-underline" /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="site-header__meta">
            <div className="header-pill">
              <TrophyOutlined />
              <span>{name}</span>
            </div>
            <div className="header-pill">
              <span>当前积分</span>
              <strong>
                <CountUp end={points} duration={1.1} separator="," />
              </strong>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}

export default Header;
