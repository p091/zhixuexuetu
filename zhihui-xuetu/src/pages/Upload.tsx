import {
  CheckCircleFilled,
  CloudUploadOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  GiftOutlined,
  LoadingOutlined,
  SendOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import {
  App,
  Button,
  Form,
  Input,
  Modal,
  Progress,
  Select,
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
  description?: string;
}

function UploadPage() {
  const { message } = App.useApp();
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
  const [dragActive, setDragActive] = useState(false);
  const watchedTitle = Form.useWatch('title', form);
  const watchedCategory = Form.useWatch('category', form);
  const hasDetails = Boolean(watchedTitle?.trim() && watchedCategory);
  const activeStep = successVisible || uploading || hasDetails ? 3 : fileName ? 2 : 1;

  const uploadStats = [
    { label: '当前积分', value: points, suffix: ' 分', icon: <ThunderboltOutlined />, tone: 'points' },
    { label: '累计上传', value: uploadCount, suffix: ' 次', icon: <FileDoneOutlined />, tone: 'count' },
    { label: '上传奖励', value: 10, prefix: '+', suffix: ' 分', icon: <GiftOutlined />, tone: 'reward' },
  ];

  const processSteps = [
    {
      id: 1,
      title: '选择文件',
      desc: fileName ? '文件已就绪' : '拖拽或点击上传',
      completed: Boolean(fileName),
    },
    {
      id: 2,
      title: '填写信息',
      desc: hasDetails ? '标题和分类已完成' : '补充标题、分类、描述',
      completed: hasDetails,
    },
    {
      id: 3,
      title: '提交审核',
      desc: successVisible ? '积分已到账' : uploading ? '正在生成资源' : '完成后加入资源列表',
      completed: successVisible,
    },
  ];

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
          setProgress(100);
          setSuccessVisible(true);
          message.success('上传成功，已增加 10 积分');
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
    showUploadList: false,
    beforeUpload: (file) => {
      setFileName(file.name);
      setDragActive(false);
      return false;
    },
    onRemove: () => {
      setFileName('');
    },
    onDrop: () => {
      setDragActive(false);
    },
  };

  return (
    <div className="page-grid upload-page">
      <PageHeader title="上传中心" subtitle="" />

      <motion.section
        className="upload-overview"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, delay: 0.08 }}
      >
        {uploadStats.map((item) => (
          <div className="upload-stat-card" key={item.label}>
            <span className={`upload-stat-card__icon upload-stat-card__icon--${item.tone}`}>
              {item.icon}
            </span>
            <span className="upload-stat-card__label">{item.label}</span>
            <strong className={`upload-stat-card__value ${item.tone === 'reward' ? 'upload-stat-card__value--highlight' : ''}`}>
              {item.prefix}
              <CountUp end={item.value} duration={1.1} separator="," />
              {item.suffix}
            </strong>
          </div>
        ))}
      </motion.section>

      <div className="content-split">
        <motion.section
          className="upload-form-panel"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.14 }}
        >
          <div className="upload-form-panel__header">
            <div>
              <span className="upload-kicker">内容供给入口</span>
              <h2>发布学习资料</h2>
            </div>
            <span className="upload-reward-pill">完成上传 +10 分</span>
          </div>

          <Form form={form} layout="vertical" className="upload-form">
            <Form.Item
              label="资料标题"
              name="title"
              rules={[{ required: true, message: '请输入资料标题' }]}
            >
              <Input className="upload-input" size="large" placeholder="例如：高数期末压轴题讲义" />
            </Form.Item>

            <Form.Item
              label="资料分类"
              name="category"
              rules={[{ required: true, message: '请选择资料分类' }]}
            >
              <Select
                className="upload-select"
                size="large"
                placeholder="选择分类"
                options={['编程', '数学', '英语', '物理', '经济'].map((item) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>

            <Form.Item label="资料描述" name="description">
              <Input.TextArea className="upload-textarea" rows={4} placeholder="简要说明内容、适用课程或使用建议" />
            </Form.Item>

            <Form.Item label="文件上传">
              <div
                className="upload-drop-shell"
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDrop={() => setDragActive(false)}
              >
                <AntUpload.Dragger
                  {...uploadProps}
                  className={`upload-dropzone ${dragActive ? 'upload-dropzone--active' : ''} ${fileName ? 'upload-dropzone--ready' : ''}`}
                >
                  <p className="upload-dropzone__icon">
                    {fileName ? <FileTextOutlined /> : <CloudUploadOutlined />}
                  </p>
                  <p className="upload-dropzone__title">
                    {fileName ? '文件已选择' : '拖拽文件到此处或点击上传'}
                  </p>
                  <p className="upload-dropzone__hint">
                    {fileName || '支持 PDF、Word、PPT、压缩包等常见学习资料'}
                  </p>
                </AntUpload.Dragger>
              </div>
            </Form.Item>

            {uploading ? (
              <motion.div className="upload-progress-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div className="upload-progress-card__header">
                  <span>上传进度</span>
                  <strong>{progress}%</strong>
                </div>
                <Progress
                  percent={progress}
                  status="active"
                  showInfo={false}
                  strokeColor={{ '0%': '#059669', '100%': '#10b981' }}
                />
              </motion.div>
            ) : null}

            {fileName ? (
              <div className="upload-file-chip">
                <FileTextOutlined />
                <span>已选择</span>
                <strong>{fileName}</strong>
              </div>
            ) : null}

            <Button
              className="upload-submit-btn"
              type="primary"
              size="large"
              icon={uploading ? <LoadingOutlined spin /> : <SendOutlined />}
              onClick={handleSubmit}
              disabled={uploading}
              block
            >
              {uploading ? '上传中' : '提交资源'}
            </Button>
          </Form>
        </motion.section>

        <motion.aside
          className="upload-side"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.2 }}
        >
          <section className="upload-process-card">
            <h3>上传流程</h3>
            <div className="upload-process-list">
              {processSteps.map((step) => {
                const stateClass = step.completed
                  ? 'upload-process-step--completed'
                  : activeStep === step.id
                    ? 'upload-process-step--active'
                    : '';

                return (
                  <div className={`upload-process-step ${stateClass}`} key={step.id}>
                    <span className="upload-process-step__icon">
                      {step.completed ? <CheckCircleFilled /> : step.id}
                    </span>
                    <div>
                      <strong>{step.title}</strong>
                      <span>{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="upload-insight-card">
            <span className="upload-insight-card__tag">积分闭环</span>
            <h3>优质资料会进入共享列表</h3>
            <p>提交成功后资源立即加入共享页，上传者获得积分奖励，其他同学可通过积分下载。</p>
          </section>
        </motion.aside>
      </div>

      <Modal
        className="upload-success-modal"
        open={successVisible}
        footer={null}
        closable={false}
        centered
        onCancel={() => setSuccessVisible(false)}
      >
        <motion.div
          className="upload-success"
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.28 }}
        >
          <CheckCircleFilled />
          <h3>上传成功</h3>
          <p>资源已加入共享列表，10 积分已到账。</p>
        </motion.div>
      </Modal>
    </div>
  );
}

export default UploadPage;
