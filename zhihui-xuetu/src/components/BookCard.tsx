import { BookOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import type { TextbookItem } from '../types';

interface BookCardProps {
  book: TextbookItem;
  onContact: () => void;
}

function BookCard({ book, onContact }: BookCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card
        className="hover-lift glass-card"
        styles={{ body: { padding: 24 } }}
        style={{
          background: 'var(--bg-card)',
          borderColor: 'transparent',
        }}
      >
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: 140,
              borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent-50), var(--gray-50))',
              border: '1px solid var(--accent-100)',
            }}
          >
            <BookOutlined style={{ fontSize: 40, color: 'var(--accent-600)' }} />
          </div>
          <div>
            <Typography.Title
              level={4}
              style={{ color: 'var(--gray-900)', marginTop: 0, marginBottom: 8, fontWeight: 700 }}
            >
              {book.title}
            </Typography.Title>
            <Typography.Paragraph style={{ color: 'var(--gray-500)', marginBottom: 0, fontWeight: 500 }}>
              {book.publisher}
            </Typography.Paragraph>
          </div>
          <Space wrap>
            <Tag color="gold">{book.condition}</Tag>
            <Tag color="orange">{book.major}</Tag>
          </Space>
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Typography.Title level={3} style={{ color: 'var(--accent-600)', margin: 0, fontWeight: 700 }}>
              ￥{book.price}
            </Typography.Title>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={onContact}
            >
              联系购买
            </Button>
          </Space>
        </Space>
      </Card>
    </motion.div>
  );
}

export default BookCard;
