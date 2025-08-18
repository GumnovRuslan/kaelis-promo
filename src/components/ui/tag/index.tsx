import styles from './styles.module.scss';

type TProps = {
  text: string;
  isActive?: boolean;
}

const Tag = ({text, isActive = false}: TProps) => {
  return (
    <button className={`${styles.tag} ${isActive ? styles['tag--active'] : styles['tag--default']}`}>
      <span className={styles.tag__text}>{text}</span>
    </button>
  )
}

export default Tag;