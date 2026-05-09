import {
  CheckCircleFilled,
  InboxOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Space,
  Typography,
  Upload as AntUpload,
} from 'antd';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../layout/PageHeader';
import { useAppStore } from '../store/useAppStore';
import type { ResourceItem } from '../types';
import type { UploadProps } from 'antd';

interface UploadFormValues {
  title: string;
  category: string;
  description: string;
}

function UploadPage() {
  const { message, modal } = App.useApp();
  const navigate = useNavigate();
  const [form] = Form.useForm<UploadFormValues>();
  const { points, uploadCount } = useAppStore((state) => state.user);
  const addPoints = useAppStore((state) => state.addPoints);
  const incrementUpload = useAppStore((state) => state.incrementUpload);
  const addResource = useAppStore((state) => state.addResource);
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!fileName) {
        message.warning('请先选择文件');
        return;
      }

      setUploading(true);
      setProgress(0);
      let current = 0;
      const timer = window.setInterval(() => {
        current += 5;
        setProgress(current);
        if (current >= 100) {
          window.clearInterval(timer);
          const resource: ResourceItem = {
            id: `user-${Date.now()}`,
            title: values.title,
            category: values.category,
            description: values.description ? `${values.description}（附件：${fileName}）` : `附件：${fileName}`,
            author: '林知夏',
            downloads: 0,
            reward: 10,
            isUserUpload: true,
          };
          addResource(resource);
          addPoints(10);
          incrementUpload();
          setUploading(false);
          setSuccessVisible(true);
          modal.success({
            title: '上传成功',
            content: '资源已发布到共享列表。',
            centered: true,
          });
          window.setTimeout(() => {
            setSuccessVisible(false);
            navigate('/resources');
          }, 1200);
        }
      }, 100);
    } catch {
      return;
    }
  };

  const uploadProps: UploadProps = {
    maxCount: 1,
    beforeUpload: (file) => {
      setFileName(file.name);
      return false;
    },
    onRemove: () => {
      setFileName('');
    },
  };

  return (
    <div className="page-grid">
      <PageHeader
        title="上传中心"
        subtitle=""
        extra={
          <div className="header-stats">
            <div className="header-stat">
              <span>当前积分</span>
              <strong><CountUp end={points} duration={1.1} /> 分</strong>
            </div>
            <div className="header-stat">
              <span>累计上传</span>
              <strong><CountUp end={uploadCount} duration={1.1} /> 次</strong>
            </div>
            <div className="header-stat">
              <span>上传奖励</span>
              <strong>+10 分</strong>
            </div>
          </div>
        }
      />

      <div className="content-split">
        <section className="surface-panel surface-panel--form">
          <Form form={form} layout="vertical">
            <Form.Item
              label="资料标题"
              name="title"
              rules={[{ required: true, message: '请输入资料标题' }]}
            >
              <Input size="large" placeholder="例如：高数期末压轴题讲义" />
            </Form.Item>

            <Form.Item
              label="资料分类"
              name="category"
              rules={[{ required: true, message: '请选择资料分类' }]}
            >
              <Select
                size="large"
                placeholder="选择分类"
                options={['编程', '数学', '英语', '物理', '经济'].map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>

            <Form.Item label="资料描述" name="description">
              <Input.TextArea rows={4} placeholder="简要说明内容" />
            </Form.Item>

            <Form.Item label="文件上传">
              <AntUpload.Dragger {...uploadProps} style={{ padding: '16px 0' }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: '#6f8fc0' }} />
                </p>
                <p className="ant-upload-text">拖拽文件到此处或点击上传</p>
                <p className="ant-upload-hint">支持常见文档格式</p>
              </AntUpload.Dragger>
            </Form.Item>

            {uploading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Progress
                  percent={progress}
                  status="active"
                  strokeColor={{ '0%': '#5d8df6', '100%': '#f0a12a' }}
                />
              </motion.div>
            ) : null}

            <Space style={{ marginTop: 16 }} wrap>
              <Button
                type="primary"
                size="large"
                icon={uploading ? <LoadingOutlined spin /> : <InboxOutlined />}
                onClick={handleSubmit}
                disabled={uploading}
              >
                {uploading ? '上传中...' : '提交资源'}
              </Button>
              {fileName ? <span className="stat-chip">已选择：{fileName}</span> : null}
            </Space>
          </Form>
        </section>

        <aside className="surface-panel surface-panel--side">
          <div className="side-stack">
            <div className="side-stack__item">
              <span>已选文件</span>
              <strong>{fileName || '未选择'}</strong>
            </div>
            <div className="side-stack__item">
              <span>当前状态</span>
              <strong>{uploading ? '上传中' : '待提交'}</strong>
            </div>
            <div className="side-stack__item">
              <span>提交完成</span>
              <strong>自动加入资源列表</strong>
            </div>
          </div>
        </aside>
      </div>

      <Modal
        open={successVisible}
        footer={null}
        closable={false}
        centered
        onCancel={() => setSuccessVisible(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28 }}
          style={{ textAlign: 'center', padding: '16px 0' }}
        >
          <CheckCircleFilled style={{ fontSize: 56, color: 'var(--success)' }} />
          <Typography.Title level={3}>上传成功</Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            已增加 10 积分。
          </Typography.Paragraph>
        </motion.div>
      </Modal>
    </div>
  );
}

export default UploadPage;
