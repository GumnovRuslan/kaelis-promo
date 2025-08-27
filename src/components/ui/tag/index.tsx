import styles from './styles.module.scss';

import { TCategory } from '@/types/category';

type TProps = {
  category: TCategory;
  isActive?: boolean;
  selectCategory: () => void;
}

const Tag = ({category, isActive = false, selectCategory}: TProps) => {
  return (
    <button className={`${styles.tag} ${isActive ? styles['tag--active'] : styles['tag--default']}`} onClick={selectCategory}>
      <span className={styles.tag__text}>{category.title}</span>
    </button>
  )
}

export default Tag;