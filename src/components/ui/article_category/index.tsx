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
  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if( more ) more.setIsOpen(!more.isOpen)
  }

  return (
    <button type='button' className={`${styles.category} ${more && more?.num > 1 ? styles[`category--more`] : ''}`} onClick={more && handlerClick}>
      <span className={styles.category__text}>{label}</span>
      {more && more.num > 1 && (
        <span  className={styles.category__more} >
          <span className={styles.category__more_number}>{more.num}</span>
        </span>
      )}
    </button>
  )
}

export default ArticleCategory;