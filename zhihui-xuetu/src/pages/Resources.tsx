import { App, Col, Input, Row, Segmented, Skeleton } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import ResourceCard from '../components/ResourceCard';
import { resourceCategories, resources as baseResources } from '../data/resources';
import PageHeader from '../layout/PageHeader';
import { useAppStore } from '../store/useAppStore';

function Resources() {
  const { message } = App.useApp();
  const userResources = useAppStore((state) => state.resources);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<(typeof resourceCategories)[number]>('全部');
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const mergedResources = useMemo(() => [...userResources, ...baseResources], [userResources]);

  const filteredResources = useMemo(() => {
    return mergedResources.filter((item) => {
      const matchCategory = category === '全部' || item.category === category;
      const matchKeyword =
        item.title.includes(keyword) ||
        item.author.includes(keyword) ||
        item.description.includes(keyword);
      return matchCategory && matchKeyword;
    });
  }, [category, keyword, mergedResources]);

  const triggerDownload = (resourceId: string) => {
    if (progressMap[resourceId]) {
      return;
    }
    let current = 0;
    setProgressMap((state) => ({ ...state, [resourceId]: 1 }));

    const timer = window.setInterval(() => {
      current += 10;
      setProgressMap((state) => ({ ...state, [resourceId]: current }));
      if (current >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setProgressMap((state) => {
            const next = { ...state };
            delete next[resourceId];
            return next;
          });
          message.success('下载成功');
        }, 260);
      }
    }, 120);
  };

  return (
    <div className="page-grid">
      <PageHeader
        tag="资源共享"
        title="资源共享"
        subtitle=""
      />

      <div className="resource-toolbar">
        <Input.Search
          allowClear
          size="large"
          placeholder="搜索资源标题、作者或描述"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Segmented
          block
          size="large"
          options={[...resourceCategories]}
          value={category}
          onChange={(value) => setCategory(value as (typeof resourceCategories)[number])}
        />
      </div>

      {loading ? (
        <Row gutter={[18, 18]}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Col xs={24} md={12} xl={8} key={`resource-skeleton-${index}`}>
              <Skeleton.Node active style={{ width: '100%', height: 280, borderRadius: 24 }} />
            </Col>
          ))}
        </Row>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${keyword}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            <Row gutter={[18, 18]}>
              {filteredResources.map((resource, index) => (
                <Col xs={24} md={12} xl={8} key={resource.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.34, delay: index * 0.05 }}
                  >
                    <ResourceCard
                      resource={resource}
                      downloading={typeof progressMap[resource.id] === 'number'}
                      progress={progressMap[resource.id] ?? 0}
                      onDownload={() => triggerDownload(resource.id)}
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

export default Resources;
