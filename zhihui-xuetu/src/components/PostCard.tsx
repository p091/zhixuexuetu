import { EyeOutlined, FireFilled, HeartFilled, MessageOutlined, RightOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { PostItem } from '../types';

interface PostCardProps {
  post: PostItem;
  hot?: boolean;
  liked: boolean;
  onLike: () => void;
  onOpen: () => void;
}

const tagClassMap: Record<string, string> = {
  考试冲刺: 'post-tag--exam',
  编程成长: 'post-tag--programming',
  英语提分: 'post-tag--english',
  项目招募: 'post-tag--recruit',
};

const replyPreviewMap: Record<string, string> = {
  考试冲刺: '最新回复：思维导图结构很清晰，期中复习正好用上。',
  编程成长: '最新回复：建议先补二叉树和图，再集中刷并查集。',
  英语提分: '最新回复：听力速记技巧很实用，模板也方便背诵。',
  项目招募: '最新回复：我会 Python 可视化，可以参与数据展示。',
};

function PostCard({ post, hot = false, liked, onLike, onOpen }: PostCardProps) {
  const views = post.likes + post.comments * 12 + 118;
  const tagClassName = tagClassMap[post.tag] ?? 'post-tag--default';
  const replyPreview = replyPreviewMap[post.tag] ?? '最新回复：已有同学参与讨论。';

  return (
    <motion.article
      className={`post-card ${hot ? 'post-card--hot' : ''}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="post-card__top">
        <div className="post-user">
          <Avatar className="post-user__avatar" style={{ backgroundColor: post.avatarColor }}>
            {post.author.slice(0, 1)}
          </Avatar>
          <div>
            <div className="post-user__name">{post.author}</div>
            <div className="post-user__time">{post.time}</div>
          </div>
        </div>
        <div className="post-card__badges">
          <span className={`post-tag ${tagClassName}`}>{post.tag}</span>
          {hot ? (
            <span className="post-hot-badge">
              <FireFilled />
              热门
            </span>
          ) : null}
        </div>
      </div>

      <button className="post-card__main" type="button" onClick={onOpen}>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-content">{post.excerpt}</p>
      </button>

      <div className="post-reply-preview">{replyPreview}</div>

      <div className="post-actions">
        <span className="action-btn action-btn--view">
          <EyeOutlined />
          <CountUp end={views} duration={1.1} />
        </span>
        <span className="action-btn">
          <MessageOutlined />
          <CountUp end={post.comments} duration={1.1} />
        </span>
        <motion.button
          className={`action-btn action-btn--like ${liked ? 'active' : ''}`}
          type="button"
          onClick={onLike}
          animate={liked ? { scale: [1, 1.18, 1] } : undefined}
          transition={{ duration: 0.38 }}
        >
          <HeartFilled />
          <CountUp end={post.likes} duration={0.8} />
        </motion.button>
        <button className="view-post-btn" type="button" onClick={onOpen}>
          查看帖子
          <RightOutlined />
        </button>
      </div>
    </motion.article>
  );
}

export default PostCard;
