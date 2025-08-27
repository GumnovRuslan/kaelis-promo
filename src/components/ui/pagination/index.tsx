import styles from './styles.module.scss'

import { getPaginationRange } from './utils';

type TProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (number: number) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const Pagination = ({totalPages, currentPage, onPageChange}: TProps) => {
  const pageNumbers = getPaginationRange({ currentPage, totalPages, edgeCount: 1 });

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((page, i) => (
        <button 
          type="button" 
          className={`
            ${styles.pagination__btn} 
            ${currentPage == page ? styles['pagination__btn--active'] : ''}
            ${typeof page == 'string' ? styles['pagination__btn--disable'] : ''}
            `} 
          onClick={() => onPageChange(page as number || currentPage)}
          key={i}
        >
          <span className={styles.pagination__number}>{page}</span>
        </button>
      ))}
    </div>
  )
}

export default Pagination;