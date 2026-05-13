import {
  CheckCircleFilled,
  ClockCircleOutlined,
  GiftOutlined,
  LoadingOutlined,
  PrinterOutlined,
  ReadOutlined,
  StarFilled,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { CSSProperties, ReactNode } from 'react';
import type { ProductItem } from '../types';

interface ProductCardProps {
  product: ProductItem;
  currentPoints: number;
  loading: boolean;
  onRedeem: () => void;
  onEarnPoints: () => void;
}

const productMeta: Record<string, { tag: string; metaPrefix: string; metaValue: number; metaSuffix: string; icon: ReactNode }> = {
  'prod-1': { tag: '学习刚需', metaPrefix: '库存', metaValue: 36, metaSuffix: '件', icon: <ReadOutlined /> },
  'prod-2': { tag: '校园纪念', metaPrefix: '库存', metaValue: 58, metaSuffix: '件', icon: <StarFilled /> },
  'prod-3': { tag: '复习高频', metaPrefix: '本周', metaValue: 24, metaSuffix: '次兑换', icon: <PrinterOutlined /> },
  'prod-4': { tag: '稀缺权益', metaPrefix: '剩余', metaValue: 8, metaSuffix: '张', icon: <ClockCircleOutlined /> },
};

function ProductCard({ product, currentPoints, loading, onRedeem, onEarnPoints }: ProductCardProps) {
  const canRedeem = currentPoints >= product.points;
  const remaining = Math.max(product.points - currentPoints, 0);
  const progress = Math.min(Math.round((currentPoints / product.points) * 100), 100);
  const meta = productMeta[product.id] ?? {
    tag: '积分权益',
    metaPrefix: '库存',
    metaValue: 20,
    metaSuffix: '件',
    icon: <GiftOutlined />,
  };
  const cardStyle = { '--product-accent': product.accent } as CSSProperties;

  return (
    <motion.article
      className={`product-card ${canRedeem ? 'product-card--redeemable' : 'product-card--locked'}`}
      style={cardStyle}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22 }}
    >
      <div className="product-card__visual">
        <span className="product-card__halo" />
        <span className="product-card__icon">{meta.icon}</span>
        <span className={`product-card__badge ${canRedeem ? 'product-card__badge--ready' : 'product-card__badge--locked'}`}>
          {canRedeem ? (
            <>
              <CheckCircleFilled />
              可兑换
            </>
          ) : (
            <span className="product-card__badge-gap text-num-text">
              <span>还差</span>
              <span className="num">{remaining}</span>
              <span>分</span>
            </span>
          )}
        </span>
      </div>

      <div className="product-card__body">
        <div className="product-card__title-row">
          <h3>{product.name}</h3>
          <span>{meta.tag}</span>
        </div>
        <p>{product.description}</p>
      </div>

      <div className="product-card__points">
        <div className="product-card__points-main">
          <span>兑换积分</span>
          <div className="product-card__point-line num-unit">
            <strong className="product-card__points-value num">
              <CountUp end={product.points} duration={1} />
            </strong>
            <span className="product-card__points-label unit">积分</span>
          </div>
        </div>
        <em className="product-card__meta text-num-text">
          <span>{meta.metaPrefix}</span>
          <strong className="num">{meta.metaValue}</strong>
          <span>{meta.metaSuffix}</span>
        </em>
      </div>

      <div className="product-card__progress" aria-label={`积分进度 ${progress}%`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <button
        className={`product-card__button ${canRedeem ? 'product-card__button--ready' : 'product-card__button--locked'}`}
        type="button"
        onClick={canRedeem ? onRedeem : onEarnPoints}
        disabled={loading}
      >
        {loading ? (
          <>
            <LoadingOutlined spin />
            兑换中
          </>
        ) : canRedeem ? (
          <>
            <GiftOutlined />
            立即兑换
          </>
        ) : (
          '继续赚积分'
        )}
      </button>
    </motion.article>
  );
}

export default ProductCard;
