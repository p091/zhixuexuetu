import {
  ArrowRightOutlined,
  BookOutlined,
  CloudUploadOutlined,
  CommentOutlined,
  GiftOutlined,
  ReadOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ebooks } from '../data/ebooks';
import { posts } from '../data/posts';
import { products } from '../data/products';
import { resources } from '../data/resources';
import { textbooks } from '../data/textbooks';
import { useAppStore } from '../store/useAppStore';

function Home() {
  const navigate = useNavigate();
  const userResources = useAppStore((state) => state.resources);
  const { points, uploadCount } = useAppStore((state) => state.user);
  const exchangeableCount = useMemo(
    () => products.filter((item) => item.points <= points).length,
    [points],
  );

  const overviewStats = useMemo(
    () => [
      { label: '当前积分', value: points, suffix: ' 分' },
      { label: '累计上传', value: uploadCount, suffix: ' 次' },
      { label: '资源总量', value: resources.length + ebooks.length + userResources.length, suffix: ' 份' },
      { label: '可兑商品', value: exchangeableCount, suffix: ' 件' },
    ],
    [exchangeableCount, points, uploadCount, userResources.length],
  );

  const primaryModules = useMemo(
    () => [
      {
        title: '资源共享',
        icon: <ShareAltOutlined />,
        path: '/resources',
        value: resources.length + userResources.length,
        unit: '份资料',
      },
      {
        title: '校园论坛',
        icon: <CommentOutlined />,
        path: '/forum',
        value: posts.length,
        unit: '条帖子',
      },
      {
        title: '二手教材',
        icon: <BookOutlined />,
        path: '/textbooks',
        value: textbooks.length,
        unit: '本在架',
      },
      {
        title: '电子教材',
        icon: <ReadOutlined />,
        path: '/ebooks',
        value: ebooks.length,
        unit: '册馆藏',
      },
    ],
    [userResources.length],
  );

  const activityItems = useMemo(
    () => [
      { tag: '资源', title: resources[0].title, meta: `${resources[0].downloads} 次下载`, path: '/resources' },
      { tag: '论坛', title: posts[0].title, meta: posts[0].time, path: '/forum' },
      { tag: '教材', title: textbooks[0].title, meta: `￥${textbooks[0].price}`, path: '/textbooks' },
      { tag: '教材', title: ebooks[0].title, meta: `${ebooks[0].chapters} 章节`, path: '/ebooks' },
    ],
    [],
  );

  const shortcuts = useMemo(
    () => [
      { title: '上传中心', meta: '+10 分', path: '/upload', icon: <CloudUploadOutlined /> },
      { title: '积分商城', meta: `${exchangeableCount} 件可兑`, path: '/mall', icon: <GiftOutlined /> },
      { title: '论坛新帖', meta: `${posts[1].comments} 条回复`, path: '/forum', icon: <CommentOutlined /> },
      { title: '电子教材', meta: `${ebooks.length} 册在架`, path: '/ebooks', icon: <ReadOutlined /> },
    ],
    [exchangeableCount],
  );

  return (
    <div className="page-grid">
      <motion.section
        className="hero-banner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dashboard-hero">
          <div className="dashboard-hero__intro">
            <Typography.Title level={1} className="dashboard-hero__title">
              智汇学途
            </Typography.Title>
            <Typography.Text className="dashboard-hero__copy">
              让学习资源自由流动
            </Typography.Text>
            <Space size={14} wrap>
              <Button type="primary" size="large" onClick={() => navigate('/upload')}>
                上传资料
              </Button>
              <Button size="large" onClick={() => navigate('/resources')}>
                查看资源
              </Button>
            </Space>
          </div>

          <div className="overview-metrics">
            {overviewStats.map((item) => (
              <div key={item.label} className="overview-metric">
                <span className="overview-metric__label">{item.label}</span>
                <strong className="overview-metric__value">
                  <CountUp end={item.value} duration={1.2} separator="," />
                  {item.suffix}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="page-grid">
        <div className="section-heading">
          <h2 className="section-title">核心模块</h2>
        </div>

        <Row gutter={[18, 18]}>
          {primaryModules.map((item, index) => (
          <Col xs={24} sm={12} lg={6} key={item.title}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.12 * index }}
              whileHover={{ y: -4, scale: 1.01 }}
            >
              <Card
                className={`hover-lift glass-card feature-card feature-card--${index + 1}`}
                styles={{ body: { padding: 24 } }}
                onClick={() => navigate(item.path)}
                style={{ cursor: 'pointer', minHeight: 220 }}
              >
                <Space direction="vertical" size={18} style={{ width: '100%' }}>
                  <div className="site-brand__logo feature-card__icon" style={{ width: 54, height: 54, borderRadius: 16 }}>
                    {item.icon}
                  </div>
                  <Typography.Title level={3} style={{ color: '#13283f', margin: 0, fontWeight: 800 }}>
                    {item.title}
                  </Typography.Title>
                  <div className="feature-card__metric">
                    <strong className="feature-card__number">
                      <CountUp end={item.value} duration={1.1} />
                    </strong>
                    <span className="feature-card__unit">{item.unit}</span>
                  </div>
                  <div className="feature-card__entry">
                    <span>进入</span>
                    <ArrowRightOutlined />
                  </div>
                </Space>
              </Card>
            </motion.div>
          </Col>
          ))}
        </Row>
      </section>

      <div className="home-band">
        <motion.section
          className="surface-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.12 }}
        >
          <div className="surface-panel__header">
            <h3 className="surface-panel__title">最新动态</h3>
          </div>
          <div className="update-list">
            {activityItems.map((item) => (
              <button
                key={`${item.tag}-${item.title}`}
                className="update-item"
                type="button"
                onClick={() => navigate(item.path)}
              >
                <span className="update-item__tag" data-type={item.tag}>{item.tag}</span>
                <span className="update-item__title">{item.title}</span>
                <span className="update-item__meta">{item.meta}</span>
              </button>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="surface-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.2 }}
        >
          <div className="surface-panel__header">
            <h3 className="surface-panel__title">常用入口</h3>
          </div>
          <div className="shortcut-list">
            {shortcuts.map((item) => (
              <button
                key={item.title}
                className="shortcut-button"
                type="button"
                onClick={() => navigate(item.path)}
              >
                <span className="shortcut-button__icon">{item.icon}</span>
                <span className="shortcut-button__label">{item.title}</span>
                <span className="shortcut-button__meta">{item.meta}</span>
              </button>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Home;
