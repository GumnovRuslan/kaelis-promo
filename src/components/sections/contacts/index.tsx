import styles from './styles.module.scss';

import { Contact } from '@/components/ui';
import { EmailIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';

const CONTACTS = [
  {
    href: `mailto:info.kaelis@gmail.com`,
    text: 'info.kaelis@gmail.com',
    Icon: EmailIcon,
  }
]

const Contacts = () => {
  const t = useTranslations('ContactsPage')
  return (
    <section className={styles.contacts}>
      <h1 className={styles.contacts__title}>{t('title')}</h1>
      <div className={styles.contacts__items}>
        {CONTACTS.map((el, i) => <Contact {...el} key={i} />)}
      </div>
    </section>
  )
}

export default Contacts;