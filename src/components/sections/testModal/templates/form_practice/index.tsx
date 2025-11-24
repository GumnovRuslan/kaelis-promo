"use client";
import styles from './styles.module.scss'
import { useSubscribe } from '@/context/SubscribeContext';
import { Input, Checkbox, Button, ModalWrapper } from '@/components/ui';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function SubscribeForm() {
  const t = useTranslations('Modal')
  const {
    email,
    isUpdate,
    isPractices,
    status,
    setStatus,
    setEmail,
    setIsUpdate,
    submit,
  } = useSubscribe();

  console.log(status)

  const closeModalStatus = () => {
    setStatus(null)
  }

  return (
    <>
      <div className={`${styles.section} ${status === 'loading' ? styles['section--loading'] : ''}`}>
        <form className={styles.form} onSubmit={(e) => submit(e, 'full')}>
          <div className={styles.form__header}>
            <span className={styles.form__title}>{t('subscription.title')}</span>
          </div>
          <div className={styles.form__description}>
            <p className={styles.form__text}>{t('subscription.description.text_1')}</p>
            <p className={styles.form__text}>{t('subscription.description.text_2')}</p>
            <p className={styles.form__text}>{t('subscription.description.text_3')}</p>
          </div>

          <div className={styles.form__content}>
            <Input value={email} onChange={e=>setEmail(e.target.value)} type="email" required placeholder='Enter email'/>
            <div className={styles.form__checkboxes}>
              <label className={styles.form__checkbox_label}>
                <Checkbox isChecked={isPractices} onChange={() => {}} />
                <span className={styles.form__checkbox_text}>{t('subscription.checkboxes.checkbox_1')}</span>
              </label>
              <label className={styles.form__checkbox_label}>
                <Checkbox isChecked={isUpdate} onChange={() => setIsUpdate(!isUpdate)} />
                <span className={styles.form__checkbox_text}>{t('subscription.checkboxes.checkbox_2')}</span>
              </label>
            </div>
            <Button as='button' type="submit" className={styles.form__button} text={status === 'loading' ? t('subscription.button.loading') : t('subscription.button.label')}/>
            <p className={styles.form__police}>{t('join.policy.text')} <Link href={'/privacy-policy'} target='_blank'>{t('join.policy.link')}</Link></p>
          </div>
        </form>
    </div>
    <ModalWrapper isShow={!!status && status !== 'loading'} handlerClose={closeModalStatus}>
      {status === 'updated' ? (
        <div className={styles.message}>{t('subscription.status.updated')} 👍</div>
      ) : status === 'already' ? (
        <div className={styles.message}>{t('subscription.status.already')} ✨</div>
      ) : status === 'success' ? (
          <div className={styles.message}>{t('subscription.status.success')} 🚀</div>
      ) : status === 'error' ? (
          <div className={styles.message}>{t('subscription.status.error')}</div>
      ) : null }
    </ModalWrapper>
  </>
    
  );
}
