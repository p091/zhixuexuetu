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
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="hover-lift glass-card" styles={{ body: { padding: 24 } }}>
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <Space align="center" wrap>
            <div className="site-brand__logo" style={{ width: 42, height: 42, borderRadius: 14 }}>
              <FileTextOutlined />
            </div>
            <div>
              <Typography.Title
                level={4}
                style={{ margin: 0, color: '#0f2235', fontWeight: 800 }}
              >
                {resource.title}
              </Typography.Title>
              <Typography.Text style={{ color: '#1f3c58', fontWeight: 700 }}>
                {resource.author}
              </Typography.Text>
            </div>
            <Tag color={resource.isUserUpload ? 'gold' : 'blue'} style={{ marginInlineStart: 'auto' }}>
              {resource.category}
            </Tag>
          </Space>

          <Typography.Paragraph style={{ color: '#284866', marginBottom: 0, fontWeight: 600 }}>
            {resource.description}
          </Typography.Paragraph>

          <Space size={12} wrap>
            <span className="stat-chip">
              <CloudDownloadOutlined />
              <CountUp end={resource.downloads} duration={1.2} />
            </span>
            {resource.reward ? (
              <span className="stat-chip">
                <StarFilled style={{ color: '#ffc857' }} />
                {resource.reward} 积分参考值
              </span>
            ) : null}
          </Space>

          {downloading ? (
            <Progress percent={progress} strokeColor={{ '0%': '#5db2ff', '100%': '#3dffcb' }} />
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
