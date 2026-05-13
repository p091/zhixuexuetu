import { BookOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import type { TextbookItem } from '../types';

interface BookCardProps {
  book: TextbookItem;
  onContact: () => void;
}

const getConditionClassName = (condition: string) => {
  if (condition.includes('95')) {
    return 'condition-tag--near-new';
  }
  if (condition.startsWith('9')) {
    return 'condition-tag--excellent';
  }
  if (condition.includes('85')) {
    return 'condition-tag--fair';
  }
  if (condition.startsWith('8')) {
    return 'condition-tag--good';
  }
  return 'condition-tag--standard';
};

function BookCard({ book, onContact }: BookCardProps) {
  const estimatedOriginalPrice = Math.round(book.price / 0.32);

  return (
    <motion.article className="book-card" whileHover={{ y: -6 }} transition={{ duration: 0.22 }}>
      <div className="book-cover">
        <span className="book-cover__spine" />
        <BookOutlined />
      </div>

      <div className="book-card__body">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-publisher">{book.publisher}</p>

        <div className="book-tags">
          <span className={`condition-tag ${getConditionClassName(book.condition)}`}>
            {book.condition}
          </span>
          <span className="category-tag">{book.major}</span>
        </div>
      </div>

      <div className="price-container">
        <div>
          <strong className="book-price">￥{book.price}</strong>
          <span className="original-price">参考原价 ￥{estimatedOriginalPrice}</span>
        </div>
        <span className="discount-tag">约 3.2 折</span>
      </div>

      <button className="buy-btn" type="button" onClick={onContact}>
        <CheckCircleOutlined />
        联系购买
      </button>
    </motion.article>
  );
}

export default BookCard;
