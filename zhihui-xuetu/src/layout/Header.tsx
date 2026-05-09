import { BellOutlined, HomeOutlined, TrophyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 8);
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrolled);
    };
  }, []);

  return (
    <motion.header
      className={`site-header${scrolled ? ' scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="site-header__inner">
        <Link className="site-brand" to="/">
          <div className="site-brand__logo">
            <HomeOutlined />
          </div>
          <h1 className="site-brand__title">智汇学途</h1>
        </Link>

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
          <button className="header-icon-button" type="button" aria-label="消息通知">
            <BellOutlined />
          </button>
          <div className="user-avatar">{name.slice(0, 1)}</div>
          <div className="header-pill">
            <span>{name}</span>
          </div>
          <div className="header-pill">
            <TrophyOutlined />
            <span>当前积分</span>
            <strong>
              <CountUp end={points} duration={1.1} separator="," />
            </strong>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
