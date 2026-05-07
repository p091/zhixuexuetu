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
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="hover-lift glass-card" styles={{ body: { padding: 24 } }}>
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: 140,
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(93, 178, 255, 0.22), rgba(61, 255, 203, 0.12))',
              border: '1px solid rgba(131, 206, 255, 0.15)',
            }}
          >
            <BookOutlined style={{ fontSize: 40, color: '#84ceff' }} />
          </div>
          <div>
            <Typography.Title
              level={4}
              style={{ color: '#0f2235', marginTop: 0, marginBottom: 8, fontWeight: 800 }}
            >
              {ebook.title}
            </Typography.Title>
            <Typography.Paragraph
              style={{ color: '#1c3a57', marginBottom: 6, fontWeight: 700 }}
            >
              {ebook.author}
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{ color: '#284866', marginBottom: 0, fontWeight: 600 }}
            >
              {ebook.summary}
            </Typography.Paragraph>
          </div>
          <Space wrap>
            <Tag color="blue">{ebook.category}</Tag>
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
