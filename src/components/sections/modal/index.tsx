'use client'

import styles from './styles.module.scss';

import { ModalWrapper, Input, Button } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { useModalContext } from '@/context/modal';
import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import disableBodyScroll from '@/utils/disableBodyScroll';
import { CheckMarkIcon } from '@/components/icons';

type ModalContentType = 'join' | 'full';

interface ModalData {
  title: string;
  button: {
    text: string;
    sending?: string,
  };
  error: {
    text: string;
  };
  texts?: string[];
  successful: {
    text: string;
  }
}

const Modal = () => {
  const t = useTranslations('Modal')
  const { isOpenModal, closeModal, content } = useModalContext()
  const [ email, setEmail ] = useState<string>('')
  const [ sendingEmail, setSendingEmail] = useState<boolean>(false)
  const [ sendSuccessful, setSendSuccessful] = useState<boolean>(false)
  const [ sendIsError, setSendIsError ] = useState<boolean>(false)

  const DATA: Record<ModalContentType, ModalData> = {
    'join': {
      title: t('join.title'),
      error: {
        text: t('join.error.text')
      },
      button: {
        text: t('join.button.text'),
        sending: t('join.button.sending'),
      },
      texts: [
        t('join.subtitle'),
        t('join.text'),
      ],
      successful: {
        text: t('join.successful.text')
      }
    },
    'full': {
      title: 'Get the full interpretation',
      error: {
        text: ''
      },
      button: {
        text: 'Send'
      },
      successful: {
        text: ''
      }
    },
  };

  const data = DATA[content as ModalContentType];

  useEffect(() => {
    disableBodyScroll({isDisabled: isOpenModal, target: 'html'})
    return () => disableBodyScroll({remove: true})
  }, [isOpenModal])


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSendIsError(false)
    setEmail(e.target.value);
  };

  const handlerSendEmailToVercel = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingEmail(true)
    setSendIsError(false)

    const res = await fetch("api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSendingEmail(false)
      setEmail('')
      setSendSuccessful(true)
    } else {
      setSendingEmail(false)
      setSendIsError(true)
    }
  }

  return (
    <ModalWrapper isShow={isOpenModal} handlerClose={closeModal}>
      <div className={styles.content}>
        <h3 className={styles.content__title}>{data.title}</h3>
        <div className={styles.content__inner}>
          <div className={`${styles.successful} ${sendSuccessful ? styles['successful--visible'] : styles['successful--hidden']}`}>
            <span className={styles.successful__icon}>
              <CheckMarkIcon/>
            </span>
            <p className={styles.successful__text}>{data.successful.text}</p>
          </div>
          <form className={`${styles.content__form} ${sendSuccessful ? styles['content__form--hidden'] : ''}`}
            onSubmit={handlerSendEmailToVercel}
            name="modal" 
            method="POST"
          >
            <input type="hidden" name="form-name" value="modal" />
            {data.texts?.map((text, i) => <span className={styles.content__input_text} key={i}>{text}</span>)}
            <div className={styles.content__input}>
              <Input 
                name='email'
                type='email' 
                placeholder='Enter your email' 
                value={email || ''} 
                onChange={handleInputChange}
              />
            </div>
            <p className={`
              ${styles.content__error} 
              ${sendIsError ? styles['content__error--visible'] : styles['content__error--hidden']}`}
              >
                {data.error.text}
              </p>
            <Button 
              disabled={sendingEmail}
              type='submit'
              className={styles.content__button} 
              text={sendingEmail ? data.button.sending : data.button.text} 
            />
            <p className={styles.content__policy}>{t('join.policy.text')} <Link className={styles.content__policy_link} href={'/privacy-policy'} target='_blank'>{t('join.policy.link')}</Link></p>
          </form>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default Modal;