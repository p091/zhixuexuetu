import { App, Col, Input, Row, Segmented, Skeleton } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import EbookCard from '../components/EbookCard';
import { ebooks } from '../data/ebooks';
import PageHeader from '../layout/PageHeader';

const categories = ['全部', '编程', '数学', '英语', '物理', '经济'] as const;

function Ebooks() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<(typeof categories)[number]>('全部');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return ebooks.filter((ebook) => {
      const matchCategory = category === '全部' || ebook.category === category;
      const matchKeyword =
        ebook.title.includes(keyword) ||
        ebook.author.includes(keyword) ||
        ebook.summary.includes(keyword);
      return matchCategory && matchKeyword;
    });
  }, [category, keyword]);

  return (
    <div className="page-grid">
      <PageHeader
        tag="电子教材"
        title="电子教材"
        subtitle=""
      />

      <div className="ebook-toolbar">
        <Input.Search
          allowClear
          size="large"
          placeholder="搜索电子教材"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Segmented
          block
          size="large"
          options={[...categories]}
          value={category}
          onChange={(value) => setCategory(value as (typeof categories)[number])}
        />
      </div>

      {loading ? (
        <Row gutter={[18, 18]}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Col xs={24} md={12} xl={8} key={`ebook-skeleton-${index}`}>
              <Skeleton.Node active style={{ width: '100%', height: 320, borderRadius: 24 }} />
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
            <Row gutter={[18, 18]}>
              {filtered.map((ebook, index) => (
                <Col xs={24} md={12} xl={8} key={ebook.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                  >
                    <EbookCard
                      ebook={ebook}
                      onAction={(mode) =>
                        message.success(mode === 'read' ? '已打开阅读器' : '已加入下载任务')
                      }
                    />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Ebooks;
