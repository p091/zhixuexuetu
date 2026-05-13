import {
  App,
  Col,
  Modal,
  Row,
  Typography,
} from 'antd';
import {
  CheckCircleFilled,
  CloudUploadOutlined,
  CrownFilled,
  GiftOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import PageHeader from '../layout/PageHeader';
import { useAppStore } from '../store/useAppStore';

const fireworkPalette = ['#14b8a6', '#f97316', '#3b82f6', '#ef4444', '#10b981'];

function Mall() {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { points, uploadCount } = useAppStore((state) => state.user);
  const spendPoints = useAppStore((state) => state.spendPoints);
  const [loadingId, setLoadingId] = useState('');
  const [successProduct, setSuccessProduct] = useState('');
  const redeemableCount = useMemo(
    () => products.filter((item) => item.points <= points).length,
    [points],
  );
  const premiumProduct = useMemo(
    () => [...products].sort((a, b) => b.points - a.points)[0],
    [],
  );
  const nextProduct = useMemo(
    () => [...products].sort((a, b) => a.points - b.points).find((item) => item.points > points),
    [points],
  );
  const targetProduct = nextProduct ?? premiumProduct;
  const needForNext = nextProduct ? nextProduct.points - points : 0;
  const goalProgress = targetProduct ? Math.min(Math.round((points / targetProduct.points) * 100), 100) : 100;
  const uploadsNeeded = Math.ceil(needForNext / 10);
  const mallStats = [
    { label: '当前积分', value: points, unit: '分', icon: <ThunderboltOutlined />, tone: 'points' },
    { label: '累计上传', value: uploadCount, unit: '次', icon: <CloudUploadOutlined />, tone: 'uploads' },
    { label: '可兑换商品', value: redeemableCount, unit: '件', icon: <CheckCircleFilled />, tone: 'redeemable' },
    { label: '最贵商品', value: premiumProduct.points, unit: '分', icon: <CrownFilled />, tone: 'premium' },
  ];

  const fireworks = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: `${8 + ((index * 11) % 84)}%`,
        top: `${18 + ((index * 7) % 54)}%`,
        color: fireworkPalette[index % fireworkPalette.length],
        x: ((index % 6) - 3) * 34,
        y: ((index % 5) - 2) * 28,
      })),
    [],
  );

  const handleRedeem = (productId: string, needPoints: number, name: string) => {
    if (points < needPoints) {
      message.warning(`积分不足，还差 ${needPoints - points} 积分。上传资料可继续获得积分`);
      return;
    }

    setLoadingId(productId);
    window.setTimeout(() => {
      const ok = spendPoints(needPoints);
      setLoadingId('');
      if (!ok) {
        message.error(`积分不足，还差 ${needPoints - points} 积分`);
        return;
      }
      setSuccessProduct(name);
    }, 650);
  };

  return (
    <div className="page-grid mall-page">
      <PageHeader title="积分商城" subtitle="" />

      <motion.section
        className="mall-stats"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.08 }}
      >
        {mallStats.map((item) => (
          <div className={`mall-stat-card mall-stat-card--${item.tone}`} key={item.label}>
            <span className={`mall-stat-card__icon mall-stat-card__icon--${item.tone}`}>
              {item.icon}
            </span>
            <strong className="mall-stat-card__value num-unit">
              <span className="mall-stat-card__number num">
                <CountUp end={item.value} duration={1.1} separator="," />
              </span>
              <span className="mall-stat-card__unit unit">{item.unit}</span>
            </strong>
            <span className="mall-stat-card__label">{item.label}</span>
          </div>
        ))}
      </motion.section>

      <motion.section
        className="mall-goal-panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.14 }}
      >
        <div className="mall-goal-panel__content">
          <span className="mall-kicker">下一目标</span>
          <h2 className="mall-goal-title">
            {nextProduct ? (
              <>
                <span>距离「{nextProduct.name}」</span>
                <span className="mall-goal-diff-line text-num-text">
                  <span>还差</span>
                  <span className="mall-goal-diff num">{needForNext}</span>
                  <span>分</span>
                </span>
              </>
            ) : (
              '当前积分已解锁全部商品'
            )}
          </h2>
          <p>
            {nextProduct
              ? `继续上传 ${uploadsNeeded} 份优质资料即可达成，积分会实时进入商城闭环。`
              : `可优先兑换「${premiumProduct.name}」，也可以继续上传资料积累更多积分。`}
          </p>
          <div className="mall-goal-progress" aria-label={`目标进度 ${goalProgress}%`}>
            <span style={{ width: `${goalProgress}%` }} />
          </div>
          <div className="mall-goal-panel__meta">
            <span className="mall-progress-status">
              <span className="mall-progress-number num-unit">
                <strong className="mall-progress-percent num">{goalProgress}</strong>
                <span className="unit">%</span>
              </span>
              <span>已完成</span>
            </span>
            <strong>{targetProduct.name}</strong>
          </div>
        </div>
        <div className="mall-goal-panel__action">
          <span className="mall-goal-panel__points num-unit">
            <strong className="mall-goal-number num">
              <CountUp end={points} duration={1.1} separator="," />
            </strong>
            <span className="mall-goal-unit unit">分</span>
          </span>
          <Link className="mall-earn-link" to="/upload">
            上传资料赚积分
          </Link>
        </div>
      </motion.section>

      <Row gutter={[18, 18]}>
        {products.map((product, index) => (
          <Col xs={24} md={12} xl={6} key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <ProductCard
                product={product}
                currentPoints={points}
                loading={loadingId === product.id}
                onRedeem={() => handleRedeem(product.id, product.points, product.name)}
                onEarnPoints={() => navigate('/upload')}
              />
            </motion.div>
          </Col>
        ))}
      </Row>

      {successProduct ? (
        <div className="fireworks">
          {fireworks.map((item) => (
            <motion.span
              key={item.id}
              className="firework-dot"
              style={{ left: item.left, top: item.top, background: item.color }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.2, 1.4, 0.6],
                x: [0, item.x],
                y: [0, item.y],
              }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          ))}
        </div>
      ) : null}

      <Modal
        open={Boolean(successProduct)}
        centered
        onCancel={() => setSuccessProduct('')}
        onOk={() => setSuccessProduct('')}
        okText="完成"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ textAlign: 'center', padding: '12px 0' }}
        >
          <Typography.Title level={3}>兑换成功</Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            {successProduct} 已加入兑换记录。
          </Typography.Paragraph>
        </motion.div>
      </Modal>
    </div>
  );
}

export default Mall;
