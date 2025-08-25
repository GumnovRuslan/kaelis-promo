'use client'

import styles from './styles.module.scss';

import { StarIcon } from '@/components/icons';
import { ModalWrapper, Input, Button } from '@/components/ui';
import Link from 'next/link';
import { useModalContext } from '@/context/modal';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';

type ModalContentType = 'join' | 'full';

interface ModalData {
  title: string;
  button: {
    text: string;
  };
  texts?: string[];
}

// const DATA: Record<ModalContentType, ModalData> = {
//   'join': {
//     title: 'Join Kaelis',
//     button: {
//       text: 'Get access'
//     },
//   },
//   'full': {
//     title: 'Get the full interpretation',
//     button: {
//       text: 'Send'
//     },
//   },
// };

const items = [
  'No hidden fees',
  '24/7 support',
  'Only proven methods'
];

const Modal = () => {
  const t = useTranslations('Modal')
  const { isOpenModal, closeModal, content } = useModalContext()
  const [ inputValue, setInputValue ] = useState<string>('')

  const DATA: Record<ModalContentType, ModalData> = {
    'join': {
      title: t('join.title'),
      button: {
        text: t('join.button'),
      },
      texts: [
        t('join.subtitle'),
        t('join.text'),
      ],
    },
    'full': {
      title: 'Get the full interpretation',
      button: {
        text: 'Send'
      },
    },
  };

  const data = DATA[content as ModalContentType];


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlerSendEmail = async  (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('form-name', 'modal');
    formData.append('email', inputValue);

    try {
      await fetch('/', {
        method: 'POST',
        body: formData,
      });
      
      console.log('Form successfully submitted to Netlify');
      closeModal();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }

  return (
    <ModalWrapper isShow={isOpenModal} handlerClose={closeModal}>
      <form 
        className={styles.content} 
        onSubmit={handlerSendEmail}
        name="modal" 
        method="POST" 
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="modal" />
        <h3 className={styles.content__title}>{data.title}</h3>
        {/* {content === 'join' && (
          <ul className={styles.content__items}>
            {items.map((text, i) => (
              <li className={styles.content__item} key={i}>
                <span className={styles.content__item_icon}>
                  <StarIcon />
                </span>
                <span className={styles.content__item_text}>{text}</span>
              </li>
            ))}
          </ul>
        )} */}
        {data.texts?.map((text, i) => <span className={styles.content__input_text} key={i}>{text}</span>)}
        <div className={styles.content__input}>
          <Input 
            name='email'
            type='email' 
            placeholder='Enter your email' 
            value={inputValue || ''} 
            onChange={handleInputChange}
          />
        </div>
        <Button 
          type='submit'
          className={styles.content__button} 
          text={data.button.text} 
        />
        <p className={styles.content__policy}>{t('join.policy.text')} <Link className={styles.content__policy_link} href={'/privacy-policy'} target='_blank'>{t('join.policy.link')}</Link></p>
      </form>
    </ModalWrapper>
  )
}

export default Modal;