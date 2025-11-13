import styles from './styles.module.scss';

type TProps = {
  className?: string;
  onClick?: () => void;
  label?: string;
}

const CloseButton = ({onClick, label = 'close', className = ''}: TProps) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <button 
        type='button'
        className={styles.btn}
        onClick={onClick}
        aria-label={label}
      >
        <span className={styles.btn__inner}/>
      </button>
    </div>
    
  )
}

export default CloseButton;