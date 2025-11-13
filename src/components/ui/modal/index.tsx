'use client'

import styles from './styles.module.scss';

import CloseButton from '../button_close';

type TProps = {
  children?: React.ReactNode;
  isShow: boolean;
  handlerClose: () => void;
}

const ModalWrapper = ({children, isShow = false, handlerClose} : TProps) => {
  return (
    <div className={`${styles.modal__background} ${!isShow ? styles['modal--hidden'] : styles['modal--show']}`}>
      <div className={styles.modal}>
        <div className={styles.modal__head}>
          <CloseButton onClick={handlerClose} label={'Close modal'}/>
        </div>
        
        <div className={styles.modal__content}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalWrapper;