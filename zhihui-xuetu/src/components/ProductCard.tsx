import { GiftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Card, Space, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { ProductItem } from '../types';

interface ProductCardProps {
  product: ProductItem;
  loading: boolean;
  onRedeem: () => void;
}

function ProductCard({ product, loading, onRedeem }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="hover-lift glass-card" styles={{ body: { padding: 24 } }}>
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: 140,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${product.accent}22, var(--gray-50))`,
              border: `1px solid ${product.accent}33`,
            }}
          >
            <GiftOutlined style={{ fontSize: 42, color: product.accent }} />
          </div>
          <div>
            <Typography.Title
              level={4}
              style={{ color: 'var(--gray-900)', marginTop: 0, marginBottom: 8, fontWeight: 700 }}
            >
              {product.name}
            </Typography.Title>
            <Typography.Paragraph style={{ color: 'var(--gray-600)', marginBottom: 0, fontWeight: 400 }}>
              {product.description}
            </Typography.Paragraph>
          </div>
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Typography.Text style={{ color: 'var(--accent-500)', fontSize: 18, fontWeight: 700 }}>
              <CountUp end={product.points} duration={1} /> 积分
            </Typography.Text>
            <Button
              type="primary"
              icon={loading ? <LoadingOutlined spin /> : <GiftOutlined />}
              onClick={onRedeem}
              disabled={loading}
            >
              {loading ? '兑换中...' : '立即兑换'}
            </Button>
          </Space>
        </Space>
      </Card>
    </motion.div>
  );
}

export default ProductCard;
