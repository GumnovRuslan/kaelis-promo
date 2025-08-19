'use client'

import styles from './styles.module.scss';

import { StarIcon } from '@/components/icons';
import { Modal, Input, Button } from '@/components/ui';
import Link from 'next/link';
import { useModalContext } from '@/context/modal';

const items = [
  'No hidden fees',
  '24/7 support',
  'Only proven methods'
];

const ModalJoin = () => {
  const { isOpenModalJoin, closeModalJoin } = useModalContext()
  return (
    <Modal isShow={isOpenModalJoin} handlerClose={closeModalJoin}>
      <div className={styles.join}>
        <h3 className={styles.join__title}>Join Kaelis</h3>
        <ul className={styles.join__items}>
          {items.map((text, i) => (
            <li className={styles.join__item} key={i}>
              <span className={styles.join__item_icon}>
                <StarIcon />
              </span>
              <span className={styles.join__item_text}>{text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.join__input}>
          <span className={styles.join__input_text}>Enter your email to receive the complete prediction</span>
          <Input type='email' placeholder='Enter your email'/>
        </div>
        <Button className={styles.join__button} text='Get access'/>
        <p className={styles.join__policy}>By clicking “Send”, you agree to the <Link className={styles.join__policy_link} href={'#'}>Privacy Policy</Link></p>
      </div>
    </Modal>
  )
}

export default ModalJoin;