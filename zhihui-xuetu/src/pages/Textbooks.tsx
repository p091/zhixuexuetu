import { App, Col, Row } from 'antd';
import { motion } from 'framer-motion';
import BookCard from '../components/BookCard';
import { textbooks } from '../data/textbooks';
import PageHeader from '../layout/PageHeader';

function Textbooks() {
  const { message } = App.useApp();

  return (
    <div className="page-grid">
      <PageHeader
        title="二手教材交易"
        subtitle=""
      />

      <motion.section
        className="hero-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
        style={{
          background:
            'radial-gradient(circle at top left, rgba(255, 204, 136, 0.22), transparent 24%), radial-gradient(circle at top right, rgba(214, 154, 102, 0.12), transparent 20%), linear-gradient(135deg, rgba(255, 250, 242, 0.98), rgba(248, 237, 222, 0.95))',
          border: '1px solid rgba(201, 150, 102, 0.18)',
        }}
      >
        <h2 className="section-title" style={{ marginBottom: 6 }}>
          买卖二手教材，就在这里
        </h2>
      </motion.section>

      <Row gutter={[18, 18]}>
        {textbooks.map((book, index) => (
          <Col xs={24} md={12} xl={8} key={book.id}>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <BookCard
                book={book}
                onContact={() => message.success('已发送联系请求给卖家')}
              />
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Textbooks;
