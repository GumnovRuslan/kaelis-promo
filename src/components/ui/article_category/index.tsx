import styles from './styles.module.scss';

type TProps = {
  label: string
  more?: {
    num: number
    setIsOpen: (value: boolean) => void
    isOpen: boolean
  }
  
}

const ArticleCategory = ({label, more}: TProps) => {
  return (
    <div className={styles.category}>
      <span className={styles.category__text}>{label}</span>
      {more && (
        <button type='button' className={styles.category__more} onClick={() => more.setIsOpen(more.isOpen)}>
          <span className={styles.category__more_number}>{more.num}</span>
        </button>
      )}
    </div>
  )
}

export default ArticleCategory;