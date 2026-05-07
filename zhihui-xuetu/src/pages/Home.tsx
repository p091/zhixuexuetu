import {
  BookOutlined,
  CloudUploadOutlined,
  CommentOutlined,
  GiftOutlined,
  ReadOutlined,
  RocketOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const featureCards = [
  {
    title: '共享课程',
    icon: <RocketOutlined />,
    path: '/resources',
  },
  {
    title: '校园论坛',
    icon: <CommentOutlined />,
    path: '/forum',
  },
  {
    title: '资源共享',
    icon: <ShareAltOutlined />,
    path: '/resources',
  },
  {
    title: '二手教材',
    icon: <BookOutlined />,
    path: '/textbooks',
  },
];

const quickLinks = [
  {
    title: '电子教材',
    icon: <ReadOutlined />,
    path: '/ebooks',
  },
  {
    title: '热门话题',
    icon: <CommentOutlined />,
    path: '/forum',
  },
  {
    title: '上传资源',
    icon: <CloudUploadOutlined />,
    path: '/upload',
  },
  {
    title: '积分商城',
    icon: <GiftOutlined />,
    path: '/mall',
  },
];

function Home() {
  const navigate = useNavigate();
  const { points, uploadCount } = useAppStore((state) => state.user);
  const [typedText, setTypedText] = useState('');
  const slogan = '让学习资源自由流动';

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedText(slogan.slice(0, index));
      if (index >= slogan.length) {
        window.clearInterval(timer);
      }
    }, 85);

    return () => window.clearInterval(timer);
  }, []);

  const kpis = useMemo(
    () => [
      { label: '累计活跃资源', value: 1280, suffix: '+' },
      { label: '本周新增上传', value: uploadCount * 6 + 42, suffix: ' 份' },
      { label: '当前可用积分', value: points, suffix: ' 分' },
    ],
    [points, uploadCount],
  );

  return (
    <div className="page-grid">
      <motion.section
        className="hero-banner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <div className="gradient-tag">智汇学途</div>
          <Typography.Title level={1} style={{ color: '#17324d', margin: 0, fontFamily: '"Noto Serif SC", serif' }}>
            智汇学途
          </Typography.Title>
          <Typography.Title
            level={2}
            style={{ color: '#2f80ff', margin: 0, minHeight: 56, fontWeight: 600 }}
          >
            {typedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY }}
            >
              |
            </motion.span>
          </Typography.Title>
          <Space size={14} wrap>
            <Button type="primary" size="large" onClick={() => navigate('/upload')}>
              上传资料
            </Button>
            <Button size="large" onClick={() => navigate('/mall')}>
              进入商城
            </Button>
          </Space>
        </Space>

        <div className="hero-kpis">
          {kpis.map((item) => (
            <div key={item.label} className="hero-kpi">
              <div className="hero-kpi__label">{item.label}</div>
              <div className="hero-kpi__value">
                <CountUp end={item.value} duration={1.4} separator="," />
                {item.suffix}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <Row gutter={[18, 18]}>
        {featureCards.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={item.title}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.12 * index }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card
                className="hover-lift glass-card"
                styles={{ body: { padding: 24 } }}
                onClick={() => navigate(item.path)}
                style={{ cursor: 'pointer', minHeight: 242 }}
              >
                <Space direction="vertical" size={18} style={{ width: '100%' }}>
                  <div className="site-brand__logo" style={{ width: 54, height: 54, borderRadius: 18 }}>
                    {item.icon}
                  </div>
                  <Typography.Title level={3} style={{ color: '#17324d', margin: 0 }}>
                    {item.title}
                  </Typography.Title>
                </Space>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <section className="page-grid">
        <div>
          <h2 className="section-title">快速入口</h2>
        </div>
        <div className="tile-grid">
          {quickLinks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.1 * index }}
              whileHover={{ y: -8 }}
            >
              <Card
                className="hover-lift glass-card"
                styles={{ body: { padding: 22 } }}
                onClick={() => navigate(item.path)}
                style={{ cursor: 'pointer' }}
              >
                <Space direction="vertical" size={14}>
                  <div className="stat-chip" style={{ width: 'fit-content' }}>
                    {item.icon}
                    <strong>{item.title}</strong>
                  </div>
                </Space>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;
