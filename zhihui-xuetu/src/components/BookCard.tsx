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
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="hover-lift glass-card" styles={{ body: { padding: 24 } }}>
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: 140,
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(82, 176, 115, 0.2), rgba(28, 83, 156, 0.28))',
              border: '1px solid rgba(150, 215, 154, 0.14)',
            }}
          >
            <BookOutlined style={{ fontSize: 40, color: '#9ef0a9' }} />
          </div>
          <div>
            <Typography.Title
              level={4}
              style={{ color: '#0f2235', marginTop: 0, marginBottom: 8, fontWeight: 800 }}
            >
              {book.title}
            </Typography.Title>
            <Typography.Paragraph style={{ color: '#1f3c58', marginBottom: 0, fontWeight: 700 }}>
              {book.publisher}
            </Typography.Paragraph>
          </div>
          <Space wrap>
            <Tag color="green">{book.condition}</Tag>
            <Tag color="cyan">{book.major}</Tag>
          </Space>
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Typography.Title level={3} style={{ color: '#176141', margin: 0, fontWeight: 800 }}>
              ￥{book.price}
            </Typography.Title>
            <Button type="primary" icon={<CheckCircleOutlined />} onClick={onContact}>
              联系购买
            </Button>
          </Space>
        </Space>
      </Card>
    </motion.div>
  );
}

export default BookCard;
