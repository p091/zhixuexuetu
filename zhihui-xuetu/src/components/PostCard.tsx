import { HeartFilled, MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Space, Tag, Typography } from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { PostItem } from '../types';

interface PostCardProps {
  post: PostItem;
  liked: boolean;
  onLike: () => void;
  onOpen: () => void;
}

function PostCard({ post, liked, onLike, onOpen }: PostCardProps) {
  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="hover-lift glass-card" styles={{ body: { padding: 24 } }}>
        <Space direction="vertical" size={18} style={{ width: '100%' }}>
          <Space align="center">
            <Avatar style={{ backgroundColor: post.avatarColor }}>
              {post.author.slice(0, 1)}
            </Avatar>
            <div>
              <Typography.Text strong style={{ color: '#0f2235', fontWeight: 800 }}>
                {post.author}
              </Typography.Text>
              <div style={{ color: '#45617d', fontSize: 12, fontWeight: 700 }}>{post.time}</div>
            </div>
            <Tag color="blue" style={{ marginInlineStart: 'auto' }}>
              {post.tag}
            </Tag>
          </Space>

          <div>
            <Typography.Title
              level={4}
              style={{ color: '#0f2235', marginTop: 0, marginBottom: 10, fontWeight: 800 }}
            >
              {post.title}
            </Typography.Title>
            <Typography.Paragraph style={{ color: '#284866', marginBottom: 0, fontWeight: 600 }}>
              {post.excerpt}
            </Typography.Paragraph>
          </div>

          <Space style={{ justifyContent: 'space-between', width: '100%' }} wrap>
            <Space size={18}>
              <span className="stat-chip">
                <MessageOutlined />
                <CountUp end={post.comments} duration={1.2} />
              </span>
              <motion.div
                animate={liked ? { scale: [1, 1.35, 1] } : undefined}
                transition={{ duration: 0.45 }}
              >
                <Button
                  type={liked ? 'primary' : 'default'}
                  shape="round"
                  icon={<HeartFilled style={{ color: liked ? '#fff' : '#ff8a8a' }} />}
                  onClick={onLike}
                >
                  <CountUp end={post.likes} duration={0.8} />
                </Button>
              </motion.div>
            </Space>
            <Button type="link" onClick={onOpen}>
              查看帖子
            </Button>
          </Space>
        </Space>
      </Card>
    </motion.div>
  );
}

export default PostCard;
