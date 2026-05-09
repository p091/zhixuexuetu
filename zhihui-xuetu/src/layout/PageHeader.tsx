import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  extra?: ReactNode;
  back?: boolean;
}

function PageHeader({ title, subtitle, extra, back = false }: PageHeaderProps) {
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
          <h2 className="section-title">
            {title}
          </h2>
          {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
        </div>
      </div>
      {extra ? <div className="page-header__extra">{extra}</div> : null}
    </motion.section>
  );
}

export default PageHeader;
