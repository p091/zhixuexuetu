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
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="hover-lift glass-card" styles={{ body: { padding: 24 } }}>
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: 140,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${product.accent}33, rgba(6, 18, 34, 0.2))`,
              border: `1px solid ${product.accent}44`,
            }}
          >
            <GiftOutlined style={{ fontSize: 42, color: product.accent }} />
          </div>
          <div>
            <Typography.Title
              level={4}
              style={{ color: '#0f2235', marginTop: 0, marginBottom: 8, fontWeight: 800 }}
            >
              {product.name}
            </Typography.Title>
            <Typography.Paragraph style={{ color: '#284866', marginBottom: 0, fontWeight: 600 }}>
              {product.description}
            </Typography.Paragraph>
          </div>
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Typography.Text style={{ color: '#0f2235', fontSize: 18, fontWeight: 800 }}>
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
