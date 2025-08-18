import styles from './styles.module.scss';

type TProps = {
  isActive: boolean;
  setIsActive?: (value: boolean) => void;
  className?: string;
}

const Burger = ({ isActive, setIsActive = () =>{}, className = '' }: TProps) => {
  return (
    <button 
      className={`${styles.burger} ${isActive ? styles['burger--active'] : ''} ${className}`}
      onClick={() => setIsActive(!isActive)}
      aria-label={isActive ? 'Close menu' : 'Open menu'}
      aria-expanded={isActive}
    >
      <span className={styles.burger__inner}>
        <span className={styles.burger__line}/>
      </span>
    </button>
  )
}

export default Burger;