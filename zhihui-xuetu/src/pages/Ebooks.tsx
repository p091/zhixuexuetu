import {
  BookOutlined,
  EyeOutlined,
  SearchOutlined,
  ThunderboltOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { App, Col, Modal, Row, Skeleton } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import CountUp from 'react-countup';
import EbookCard from '../components/EbookCard';
import { ebooks } from '../data/ebooks';
import PageHeader from '../layout/PageHeader';
import { useAppStore } from '../store/useAppStore';
import type { EbookItem } from '../types';

const categories = ['全部', '编程', '数学', '英语', '物理', '经济'] as const;
const downloadCost = 10;

const ebookStats = [
  { label: '电子教材总数', value: 42, suffix: ' 本', icon: <BookOutlined />, tone: 'total' },
  { label: '总章节数', value: 587, suffix: ' 章', icon: <UnorderedListOutlined />, tone: 'chapters' },
  { label: '累计阅读次数', value: 2146, suffix: ' 次', icon: <EyeOutlined />, tone: 'reads' },
  { label: '本周更新', value: 7, suffix: ' 本', icon: <ThunderboltOutlined />, tone: 'new' },
];

function Ebooks() {
  const { message } = App.useApp();
  const points = useAppStore((state) => state.user.points);
  const spendPoints = useAppStore((state) => state.spendPoints);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('全部');
  const [downloadingId, setDownloadingId] = useState('');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);
  const [readingEbook, setReadingEbook] = useState<EbookItem | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();

    return ebooks.filter((ebook) => {
      const matchCategory = category === '全部' || ebook.category === category;
      const matchKeyword =
        !trimmedKeyword ||
        ebook.title.toLowerCase().includes(trimmedKeyword) ||
        ebook.author.toLowerCase().includes(trimmedKeyword) ||
        ebook.summary.toLowerCase().includes(trimmedKeyword);
      return matchCategory && matchKeyword;
    });
  }, [category, keyword]);

  const openReader = (ebook: EbookItem) => {
    setReadingEbook(ebook);
    message.success('已打开在线阅读器');
  };

  const downloadEbook = (ebook: EbookItem) => {
    if (downloadingId || downloadedIds.includes(ebook.id)) {
      return;
    }

    if (points < downloadCost) {
      message.error(`积分不足，下载需要 ${downloadCost} 积分`);
      return;
    }

    setDownloadingId(ebook.id);
    window.setTimeout(() => {
      const ok = spendPoints(downloadCost);
      setDownloadingId('');

      if (!ok) {
        message.error('积分不足，下载未完成');
        return;
      }

      setDownloadedIds((state) => [...state, ebook.id]);
      message.success(`下载成功，已扣除 ${downloadCost} 积分`);
    }, 650);
  };

  return (
    <div className="page-grid ebooks-page">
      <PageHeader
        title="电子教材"
        subtitle=""
      />

      <motion.section
        className="ebook-overview"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.08 }}
      >
        {ebookStats.map((item) => (
          <div className="ebook-stat-card" key={item.label}>
            <span className={`ebook-stat-card__icon ebook-stat-card__icon--${item.tone}`}>
              {item.icon}
            </span>
            <span className="ebook-stat-card__label">{item.label}</span>
            <strong className="ebook-stat-card__value">
              <CountUp end={item.value} duration={1.1} separator="," />
              {item.suffix}
            </strong>
          </div>
        ))}
      </motion.section>

      <motion.section
        className="ebook-toolbar surface-panel surface-panel--compact"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.14 }}
      >
        <label className="ebook-search">
          <SearchOutlined className="ebook-search__icon" />
          <input
            className="ebook-search__input"
            placeholder="搜索教材标题、出品方或内容简介"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          {keyword ? (
            <button className="ebook-search__clear" type="button" onClick={() => setKeyword('')}>
              清除
            </button>
          ) : null}
        </label>
        <div className="ebook-category-tabs">
          {categories.map((item) => (
            <button
              className={`ebook-category-tab ${category === item ? 'ebook-category-tab--active' : ''}`}
              key={item}
              type="button"
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.section>

      {loading ? (
        <Row gutter={[28, 28]}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Col xs={24} md={12} xl={8} key={`ebook-skeleton-${index}`}>
              <Skeleton.Node active style={{ width: '100%', height: 360, borderRadius: 18 }} />
            </Col>
          ))}
        </Row>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${keyword}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <Row gutter={[28, 28]}>
              {filtered.map((ebook, index) => (
                <Col xs={24} md={12} xl={8} key={ebook.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                  >
                    <EbookCard
                      ebook={ebook}
                      downloading={downloadingId === ebook.id}
                      downloaded={downloadedIds.includes(ebook.id)}
                      onRead={() => openReader(ebook)}
                      onDownload={() => downloadEbook(ebook)}
                    />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </AnimatePresence>
      )}

      <Modal
        className="ebook-reader-modal"
        open={Boolean(readingEbook)}
        width={920}
        centered
        footer={null}
        onCancel={() => setReadingEbook(null)}
        destroyOnClose
      >
        {readingEbook ? (
          <div className="ebook-reader">
            <div className="ebook-reader__header">
              <span className="ebook-reader__eyebrow">在线阅读</span>
              <h3>{readingEbook.title}</h3>
              <p>{readingEbook.author} · {readingEbook.chapters} 章节</p>
            </div>
            <div className="ebook-reader__body">
              <aside className="ebook-reader__toc">
                <strong>章节目录</strong>
                {Array.from({ length: Math.min(6, readingEbook.chapters) }).map((_, index) => (
                  <span key={`${readingEbook.id}-chapter-${index + 1}`}>
                    第 {index + 1} 章 学习重点
                  </span>
                ))}
              </aside>
              <section className="ebook-reader__page">
                <span>第 1 章</span>
                <h4>核心概念速览</h4>
                <p>{readingEbook.summary}</p>
                <p>
                  系统已按章节结构整理重点概念、例题路径和复习提示，适合课前预习、课后复盘与离线下载。
                </p>
                <div className="ebook-reader__note">
                  阅读进度会自动保存，下次打开可继续学习。
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default Ebooks;
