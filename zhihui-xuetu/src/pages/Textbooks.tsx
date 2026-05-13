import { BookOutlined, DollarOutlined, ShoppingCartOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { App, Col, Row } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import BookCard from '../components/BookCard';
import { textbooks } from '../data/textbooks';
import PageHeader from '../layout/PageHeader';

const textbookStats = [
  { label: '总在售教材', value: 126, suffix: ' 本', icon: <BookOutlined />, tone: 'total' },
  { label: '已成交', value: 89, suffix: ' 单', icon: <ShoppingCartOutlined />, tone: 'sold' },
  { label: '平均折扣', value: 3.2, suffix: ' 折', icon: <DollarOutlined />, tone: 'discount', decimals: 1 },
  { label: '今日上新', value: 18, suffix: ' 本', icon: <ThunderboltOutlined />, tone: 'new' },
];

function Textbooks() {
  const { message } = App.useApp();

  return (
    <div className="page-grid">
      <PageHeader
        title="二手教材交易"
        subtitle=""
      />

      <motion.section
        className="textbook-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.06 }}
      >
        {textbookStats.map((item) => (
          <div className="textbook-stat-card" key={item.label}>
            <span className={`textbook-stat-card__icon textbook-stat-card__icon--${item.tone}`}>
              {item.icon}
            </span>
            <span className="textbook-stat-card__label">{item.label}</span>
            <strong className="textbook-stat-card__value">
              <CountUp end={item.value} duration={1.1} decimals={item.decimals ?? 0} />
              {item.suffix}
            </strong>
          </div>
        ))}
      </motion.section>

      <Row gutter={[28, 28]}>
        {textbooks.map((book, index) => (
          <Col xs={24} md={12} xl={8} key={book.id}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <BookCard
                book={book}
                onContact={() => message.success('已发送联系请求给卖家')}
              />
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Textbooks;
