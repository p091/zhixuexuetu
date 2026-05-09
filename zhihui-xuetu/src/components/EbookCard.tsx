import { BookOutlined, DownloadOutlined, ReadOutlined } from '@ant-design/icons';
import { Button, Card, Space, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { EbookItem } from '../types';

interface EbookCardProps {
  ebook: EbookItem;
  onAction: (mode: 'read' | 'download') => void;
}

function EbookCard({ ebook, onAction }: EbookCardProps) {
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
              background: 'linear-gradient(135deg, var(--primary-50), var(--gray-50))',
              border: '1px solid var(--primary-100)',
            }}
          >
            <BookOutlined style={{ fontSize: 40, color: 'var(--primary-600)' }} />
          </div>
          <div>
            <Typography.Title
              level={4}
              style={{ color: 'var(--gray-900)', marginTop: 0, marginBottom: 8, fontWeight: 700 }}
            >
              {ebook.title}
            </Typography.Title>
            <Typography.Paragraph
              style={{ color: 'var(--gray-500)', marginBottom: 6, fontWeight: 500 }}
            >
              {ebook.author}
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{ color: 'var(--gray-600)', marginBottom: 0, fontWeight: 400 }}
            >
              {ebook.summary}
            </Typography.Paragraph>
          </div>
          <Space wrap>
            <Tag color="cyan">{ebook.category}</Tag>
            <span className="stat-chip">
              <ReadOutlined />
              <CountUp end={ebook.chapters} duration={1.1} /> 章节
            </span>
          </Space>
          <Space>
            <Button onClick={() => onAction('read')} icon={<ReadOutlined />}>
              在线阅读
            </Button>
            <Button type="primary" onClick={() => onAction('download')} icon={<DownloadOutlined />}>
              下载教材
            </Button>
          </Space>
        </Space>
      </Card>
    </motion.div>
  );
}

export default EbookCard;
