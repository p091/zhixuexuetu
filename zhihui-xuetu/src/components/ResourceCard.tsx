import {
  CloudDownloadOutlined,
  FileTextOutlined,
  LoadingOutlined,
  StarFilled,
  FireFilled,
} from '@ant-design/icons';
import { Progress } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { ResourceItem } from '../types';

interface ResourceCardProps {
  resource: ResourceItem;
  hot?: boolean;
  downloading: boolean;
  progress: number;
  onDownload: () => void;
}

const categoryClassMap: Record<string, string> = {
  编程: 'resource-tag--programming',
  数学: 'resource-tag--math',
  英语: 'resource-tag--english',
  物理: 'resource-tag--physics',
  经济: 'resource-tag--economics',
};

function ResourceCard({ resource, hot = false, downloading, progress, onDownload }: ResourceCardProps) {
  return (
    <motion.article
      className={`resource-card ${hot ? 'resource-card--hot' : ''}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {hot ? (
        <span className="resource-hot-badge">
          <FireFilled />
          热门
        </span>
      ) : null}

      <div className="resource-card__header">
        <div className="resource-card__icon">
          <FileTextOutlined />
        </div>
        <div className="resource-card__info">
          <h3 className="resource-card__title">{resource.title}</h3>
          <p className="resource-card__author">{resource.author}</p>
        </div>
        <span className={`resource-tag ${categoryClassMap[resource.category] ?? 'resource-tag--default'}`}>
          {resource.category}
        </span>
      </div>

      <p className="resource-card__desc">{resource.description}</p>

      <div className="resource-card__stats">
        <span className="download-count">
          <CloudDownloadOutlined />
          <CountUp end={resource.downloads} duration={1.2} />
          <span>次下载</span>
        </span>
        {resource.reward ? (
          <span className="points-value">
            <StarFilled />
            <strong>{resource.reward}</strong>
            <span>积分值</span>
          </span>
        ) : null}
      </div>

      {downloading ? (
        <Progress
          className="resource-progress"
          percent={progress}
          strokeColor={{ '0%': '#14b8a6', '100%': '#f97316' }}
          trailColor="#e5e7eb"
        />
      ) : null}

      <button
        className={`download-btn ${downloading ? 'download-btn--disabled' : ''}`}
        type="button"
        onClick={onDownload}
        disabled={downloading}
      >
        {downloading ? <LoadingOutlined spin /> : <CloudDownloadOutlined />}
        {downloading ? '下载中...' : '立即下载'}
      </button>
    </motion.article>
  );
}

export default ResourceCard;
