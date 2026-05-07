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
        tag="二手教材"
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
            'radial-gradient(circle at top left, rgba(136, 255, 176, 0.18), transparent 22%), linear-gradient(135deg, rgba(247, 255, 250, 0.96), rgba(235, 251, 242, 0.92))',
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
