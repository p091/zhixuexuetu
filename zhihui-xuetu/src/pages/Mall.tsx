import { App, Col, Modal, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import PageHeader from '../layout/PageHeader';
import { useAppStore } from '../store/useAppStore';

const fireworkPalette = ['#14b8a6', '#f97316', '#3b82f6', '#ef4444', '#10b981'];

function Mall() {
  const { message } = App.useApp();
  const { points, uploadCount } = useAppStore((state) => state.user);
  const spendPoints = useAppStore((state) => state.spendPoints);
  const [loadingId, setLoadingId] = useState('');
  const [successProduct, setSuccessProduct] = useState('');
  const redeemableCount = useMemo(
    () => products.filter((item) => item.points <= points).length,
    [points],
  );
  const nextProduct = useMemo(
    () => products.find((item) => item.points > points),
    [points],
  );

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
    <div className="page-grid">
      <PageHeader
        title="积分商城"
        subtitle=""
        extra={
          <div className="header-stats">
            <div className="header-stat">
              <span>当前积分</span>
              <strong><CountUp end={points} duration={1.2} /> 分</strong>
            </div>
            <div className="header-stat">
              <span>累计上传</span>
              <strong><CountUp end={uploadCount} duration={1.2} /> 次</strong>
            </div>
            <div className="header-stat">
              <span>可直接兑换</span>
              <strong><CountUp end={redeemableCount} duration={1} /> 件</strong>
            </div>
          </div>
        }
      />

      <section className="surface-panel surface-panel--compact">
        <div className="mall-overview">
          <div className="mall-overview__item">
            <span>优先推荐</span>
            <strong>{products[0].name}</strong>
          </div>
          <div className="mall-overview__item">
            <span>下一目标</span>
            <strong>{nextProduct ? `${nextProduct.name} 还差 ${nextProduct.points - points} 分` : '当前已可兑换全部商品'}</strong>
          </div>
        </div>
      </section>

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
                loading={loadingId === product.id}
                onRedeem={() => handleRedeem(product.id, product.points, product.name)}
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
