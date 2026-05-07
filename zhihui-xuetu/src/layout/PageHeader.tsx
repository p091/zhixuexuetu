import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  tag?: string;
  extra?: ReactNode;
  back?: boolean;
}

function PageHeader({ title, subtitle, tag, extra, back = false }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <motion.section
      className="page-header frost-panel"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
    >
      <div className="page-header__meta">
        {back ? (
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          />
        ) : null}
        <div>
          {tag ? <div className="gradient-tag">{tag}</div> : null}
          <h2 className="section-title" style={{ marginTop: tag ? 10 : 0 }}>
            {title}
          </h2>
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </div>
      </div>
      {extra}
    </motion.section>
  );
}

export default PageHeader;
