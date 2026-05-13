import {
  BookOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  LoadingOutlined,
  ReadOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { EbookItem } from '../types';

interface EbookCardProps {
  ebook: EbookItem;
  downloading?: boolean;
  downloaded?: boolean;
  onRead: () => void;
  onDownload: () => void;
}

const categoryClassMap: Record<string, string> = {
  编程: 'ebook-tag--programming',
  数学: 'ebook-tag--math',
  英语: 'ebook-tag--english',
  物理: 'ebook-tag--physics',
  经济: 'ebook-tag--economics',
};

function EbookCard({
  ebook,
  downloading = false,
  downloaded = false,
  onRead,
  onDownload,
}: EbookCardProps) {
  return (
    <motion.article className="ebook-card" whileHover={{ y: -6 }} transition={{ duration: 0.22 }}>
      <div className="ebook-cover">
        <span className="ebook-cover__spine" />
        <span className="ebook-cover__screen" />
        <BookOutlined />
      </div>

      <div className="ebook-card__body">
        <h3 className="ebook-title">{ebook.title}</h3>
        <p className="ebook-author">{ebook.author}</p>
        <p className="ebook-desc">{ebook.summary}</p>
      </div>

      <div className="ebook-meta">
        <span className={`ebook-tag ${categoryClassMap[ebook.category] ?? 'ebook-tag--default'}`}>
          {ebook.category}
        </span>
        <span className="chapter-count">
          <UnorderedListOutlined />
          <strong>
            <CountUp end={ebook.chapters} duration={1.1} />
          </strong>
          <span>章节</span>
        </span>
      </div>

      <div className="ebook-actions">
        <button className="ebook-read-btn" type="button" onClick={onRead}>
          <ReadOutlined />
          在线阅读
        </button>
        <button
          className={`ebook-download-btn ${downloaded ? 'ebook-download-btn--done' : ''}`}
          type="button"
          onClick={onDownload}
          disabled={downloading || downloaded}
        >
          {downloading ? <LoadingOutlined spin /> : downloaded ? <CheckCircleOutlined /> : <DownloadOutlined />}
          {downloading ? '下载中...' : downloaded ? '已下载' : '下载教材'}
        </button>
      </div>
    </motion.article>
  );
}

export default EbookCard;
