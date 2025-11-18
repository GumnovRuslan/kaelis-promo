'use client'

import styles from './styles.module.scss';

import CloseButton from '../button_close';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import disableBodyScroll from '@/utils/disableBodyScroll';

type TProps = {
  children?: React.ReactNode;
  isShow: boolean;
  handlerClose: () => void;
}

const ModalWrapper = ({children, isShow = false, handlerClose} : TProps) => {

  useEffect(() => {
    disableBodyScroll({isDisabled: isShow, target: 'html'})
    return () => disableBodyScroll({remove: true})
  }, [isShow])

  return (
    <AnimatePresence mode="wait">
      {isShow ? (
        <motion.div
            key="modal-wrapper"
            style={{zIndex: '100'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.modal__background}>
              <motion.div
                key="modal"
                className={styles.cookie}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className={styles.modal}>
                  <div className={styles.modal__head}>
                    <CloseButton onClick={handlerClose} label={'Close modal'}/>
                  </div>
                  
                  <div className={styles.modal__content}>
                    {children}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
      )
    : null}
    </AnimatePresence>
  )
}

export default ModalWrapper;