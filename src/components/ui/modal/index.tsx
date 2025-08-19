'use client'

import styles from './styles.module.scss';

type TProps = {
  children?: React.ReactNode;
  isShow: boolean;
  handlerClose: () => void;
}

const Modal = ({children, isShow = false, handlerClose} : TProps) => {
  return (
    <div className={`${styles.modal__background} ${!isShow ? styles['modal--hidden'] : styles['modal--show']}`}>
      <div className={styles.modal}>
        <div className={styles.modal__head}>
          <button 
            className={styles.btn}
            onClick={handlerClose}
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