import {
  CloudDownloadOutlined,
  FileTextOutlined,
  LoadingOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Button, Card, Progress, Space, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
  downloading: boolean;
  progress: number;
  onDownload: () => void;
}

function ResourceCard({ resource, downloading, progress, onDownload }: ResourceCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="hover-lift glass-card" styles={{ body: { padding: 24 } }}>
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <Space align="center" wrap>
            <div className="site-brand__logo" style={{ width: 42, height: 42, borderRadius: 14 }}>
              <FileTextOutlined />
            </div>
            <div>
              <Typography.Title
                level={4}
                style={{ margin: 0, color: 'var(--gray-900)', fontWeight: 700 }}
              >
                {resource.title}
              </Typography.Title>
              <Typography.Text style={{ color: 'var(--gray-500)', fontWeight: 500 }}>
                {resource.author}
              </Typography.Text>
            </div>
            <Tag color={resource.isUserUpload ? 'orange' : 'cyan'} style={{ marginInlineStart: 'auto' }}>
              {resource.category}
            </Tag>
          </Space>

          <Typography.Paragraph style={{ color: 'var(--gray-600)', marginBottom: 0, fontWeight: 400 }}>
            {resource.description}
          </Typography.Paragraph>

          <Space size={12} wrap>
            <span className="stat-chip">
              <CloudDownloadOutlined />
              <CountUp end={resource.downloads} duration={1.2} />
            </span>
            {resource.reward ? (
              <span className="stat-chip">
                <StarFilled style={{ color: 'var(--accent-500)' }} />
                {resource.reward} 积分参考值
              </span>
            ) : null}
          </Space>

          {downloading ? (
            <Progress percent={progress} strokeColor={{ '0%': '#14b8a6', '100%': '#f97316' }} />
          ) : null}

          <Button
            type="primary"
            icon={downloading ? <LoadingOutlined spin /> : <CloudDownloadOutlined />}
            onClick={onDownload}
            disabled={downloading}
          >
            {downloading ? '下载中...' : '立即下载'}
          </Button>
        </Space>
      </Card>
    </motion.div>
  );
}

export default ResourceCard;
