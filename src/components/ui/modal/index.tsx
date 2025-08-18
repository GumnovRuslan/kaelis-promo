'use client'

import styles from './styles.module.scss';

type TProps = {
  children?: React.ReactNode;
  isShow: boolean;
}

const Modal = ({children} : TProps) => {
  return (
    <div className={styles.modal__background}>
      <div className={styles.modal}>
        <div className={styles.modal__head}>
          <button 
            className={styles.btn}
            // onClick={() => setIsActive(!isActive)}
            aria-label={'Close modal'}
          >
            <span className={styles.btn__inner}/>
          </button>
        </div>
        
        <div className={styles.modal__content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;