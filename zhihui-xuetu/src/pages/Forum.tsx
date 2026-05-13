import { FireFilled, MessageOutlined, PlusOutlined, StarFilled, TeamOutlined } from '@ant-design/icons';
import { App, Button, Skeleton } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useEffect, useMemo, useState } from 'react';
import PostCard from '../components/PostCard';
import PageHeader from '../layout/PageHeader';
import { posts as defaultPosts } from '../data/posts';

function Forum() {
  const { message, modal } = App.useApp();
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<Record<string, number>>(
    Object.fromEntries(defaultPosts.map((post) => [post.id, post.likes])),
  );
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [activeTag, setActiveTag] = useState('全部');

  const categoryTabs = useMemo(() => ['全部', ...Array.from(new Set(defaultPosts.map((post) => post.tag)))], []);

  const filteredPosts = useMemo(
    () => (activeTag === '全部' ? defaultPosts : defaultPosts.filter((post) => post.tag === activeTag)),
    [activeTag],
  );

  const forumStats = useMemo(
    () => [
      { label: '今日新帖', value: 23, suffix: ' 条', icon: <MessageOutlined /> },
      { label: '在线用户', value: 156, suffix: ' 人', icon: <TeamOutlined /> },
      { label: '热门内容', value: defaultPosts.filter((post) => post.likes >= 150).length, suffix: ' 条', icon: <FireFilled /> },
      { label: '精选回复', value: defaultPosts.reduce((total, post) => total + post.comments, 0), suffix: ' 条', icon: <StarFilled /> },
    ],
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page-grid forum-page">
      <PageHeader
        back
        title="校园论坛"
        subtitle=""
        extra={
          <Button
            type="primary"
            className="publish-btn"
            icon={<PlusOutlined />}
            onClick={() => message.success('发帖入口已打开')}
          >
            发布帖子
          </Button>
        }
      />

      <motion.section
        className="forum-overview"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.08 }}
      >
        {forumStats.map((item) => (
          <div className="forum-stat-card" key={item.label}>
            <span className="forum-stat-card__icon">{item.icon}</span>
            <span className="forum-stat-card__label">{item.label}</span>
            <strong className="forum-stat-card__value">
              <CountUp end={item.value} duration={1.1} />
              {item.suffix}
            </strong>
          </div>
        ))}
      </motion.section>

      <motion.section
        className="forum-filter-panel surface-panel surface-panel--compact"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.14 }}
      >
        <div>
          <h3 className="forum-filter-panel__title">内容分类</h3>
          <p className="forum-filter-panel__meta">按主题快速浏览讨论内容</p>
        </div>
        <div className="forum-filter-row">
          {categoryTabs.map((tag) => (
            <button
              key={tag}
              className={`forum-filter ${activeTag === tag ? 'forum-filter--active' : ''}`}
              type="button"
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.section>

      <motion.button
        className="pinned-post"
        type="button"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.2 }}
        onClick={() => message.success('已查看置顶内容')}
      >
        <span className="pinned-post__badge">置顶</span>
        <span className="pinned-post__title">资料共享规范与互助公约已更新</span>
        <span className="pinned-post__meta">管理员发布</span>
      </motion.button>

      <div className="forum-post-list">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton.Node
                key={`forum-skeleton-${index}`}
                active
                style={{ width: '100%', height: 180, borderRadius: 24 }}
              />
            ))
          : defaultPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.36, delay: index * 0.08 }}
              >
                <PostCard
                  post={{ ...post, likes: likes[post.id] ?? post.likes }}
                  hot={(likes[post.id] ?? post.likes) >= 150}
                  liked={Boolean(likedMap[post.id])}
                  onLike={() => {
                    if (likedMap[post.id]) {
                      return;
                    }
                    setLikedMap((state) => ({ ...state, [post.id]: true }));
                    setLikes((state) => ({ ...state, [post.id]: (state[post.id] ?? post.likes) + 1 }));
                    message.success('已点赞');
                  }}
                  onOpen={() =>
                    modal.info({
                      title: post.title,
                      centered: true,
                      content: post.excerpt,
                      okText: '关闭',
                    })
                  }
                />
              </motion.div>
            ))}
      </div>
    </div>
  );
}

export default Forum;
