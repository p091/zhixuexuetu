import { App, Card, Col, Modal, Row, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import PageHeader from '../layout/PageHeader';
import { useAppStore } from '../store/useAppStore';

const fireworkPalette = ['#5db2ff', '#3dffcb', '#ffc857', '#ff8b73', '#d8f0ff'];

function Mall() {
  const { message } = App.useApp();
  const { points, uploadCount } = useAppStore((state) => state.user);
  const spendPoints = useAppStore((state) => state.spendPoints);
  const [loadingId, setLoadingId] = useState('');
  const [successProduct, setSuccessProduct] = useState('');

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
        tag="积分商城"
        title="积分商城"
        subtitle=""
      />

      <Row gutter={[18, 18]}>
        <Col xs={24} lg={10}>
          <Card className="glass-card" styles={{ body: { padding: 28 } }}>
            <Space direction="vertical" size={18} style={{ width: '100%' }}>
              <Typography.Text style={{ color: '#667a94' }}>当前积分</Typography.Text>
              <Typography.Title level={1} style={{ color: '#17324d', margin: 0 }}>
                <CountUp end={points} duration={1.3} /> 积分
              </Typography.Title>
              <span className="stat-chip">累计上传 <CountUp end={uploadCount} duration={1.1} /> 次</span>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card className="glass-card" styles={{ body: { padding: 28 } }}>
            <Typography.Title level={4} style={{ color: '#17324d', marginTop: 0 }}>
              热门兑换
            </Typography.Title>
          </Card>
        </Col>
      </Row>

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
