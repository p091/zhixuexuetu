import { PlusOutlined } from '@ant-design/icons';
import { App, Button, Skeleton, Space } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="page-grid">
      <PageHeader
        back
        tag="校园论坛"
        title="校园论坛"
        subtitle=""
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => message.success('已进入发帖页')}>
            发布帖子
          </Button>
        }
      />

      <Space direction="vertical" size={18} style={{ width: '100%' }}>
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
      </Space>
    </div>
  );
}

export default Forum;
