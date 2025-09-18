'use client'

import styles from './styles.module.scss'

import { Input, Button, Switcher } from '@/components/ui'
import { ChangeEvent, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

type TSwitcher = {
  id: number;
  type: 'delete' | 'clear'
  text: string;
  hash: string;
}

type TData = {
  title: string;
  switcher: TSwitcher[];
  input: {
    placeholder: string
  };
  message: {
    successful: string;
    error: string;
  };
  button: {
    text: string
    loading: string
  }
}

const AccountManagementForm = () => {
  const t = useTranslations('AccountManagementPage')
  const [emailValue, setEmailValue] = useState<string>('')
  const [loadSend, setLoadSend] = useState<boolean>(false)
  const [sendSuccessful, setSendSuccessful] = useState<boolean>(false)
  const [sendError, setSendError] = useState<boolean>(false)

  const DATA: TData = {
    title: t('title'),
    switcher: [
      {
        id: 1,
        type: 'delete',
        text: t('switcher.delete.text'),
        hash: 'delete-account'
      },
      {
        id: 2,
        type: 'clear',
        text: t('switcher.clear.text'),
        hash: 'clear-data'
      }
    ],
    input: {
      placeholder: t('input.placeholder'),
    },
    message: {
      successful: t('message.successful'),
      error: t('message.error')
    },
    button: {
      text: t('button.text'),
      loading: t('button.loading')
    }
  }

  const [selectDeletionData, setSelectDeletionData] = useState<TSwitcher | null>(null)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const foundItem = DATA.switcher.find(item => item.hash === hash)
    
    if (foundItem) {
      setSelectDeletionData(foundItem)
    } else {
      window.location.hash = DATA.switcher[0].hash
    }
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const foundItem = DATA.switcher.find(item => item.hash === hash)
      if (foundItem) {
        setSelectDeletionData(foundItem)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSelectionChange = (item: TSwitcher) => {
    setSelectDeletionData(item)
    window.location.hash = item.hash
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setSendError(false)
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadSend(true)

    if(!selectDeletionData || !emailValue) {
      setSendError(false)
      return
    }

    const res = await fetch("/api/management", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: selectDeletionData.type,
        email: emailValue,
      }),
    });

    if(res.ok) {
      setSendSuccessful(true)
      setSendError(false)
    } else {
      setSendSuccessful(false)
      setSendError(true)
    }
    setLoadSend(false)
  }

  return (
    <section className={styles.section}>
      <div className={styles.section__inner}>
        <form 
          className={`${styles.form}`} 
          method="POST" 
          onSubmit={submit}
        >
          <div className={`${styles.form__inner} ${sendSuccessful ? styles[`form__inner--disabled`] : ''}`}>
            <h2 className={styles.form__name}>{DATA.title}</h2>
            <Switcher data={DATA.switcher} selectData={selectDeletionData} setSelectData={handleSelectionChange}/>
            <Input type='email' required placeholder={DATA.input.placeholder} value={emailValue || ''} onChange={handleInputChange}/>
            <Button 
              as='button' 
              type='submit' 
              className={styles.form__button} 
              text={loadSend ? DATA.button.loading : DATA.button.text}
              disabled={loadSend}
            />
          </div>
          <div className={`${styles.form__message} ${sendError ? styles['form__message--error'] : ''} ${sendSuccessful || sendError ? styles['form__message--visible'] : ''}`}>
            <p>{sendError ? DATA.message.error : DATA.message.successful}</p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AccountManagementForm