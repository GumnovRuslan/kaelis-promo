import styles from './styles.module.scss';

import { Contact } from '@/components/ui';
import { EmailIcon } from '@/components/icons';

const CONTACTS = [
  {
    href: `mailto:info.kaelis@gmail.com`,
    text: 'info.kaelis@gmail.com',
    Icon: EmailIcon,
  }
]

const Contacts = () => {
  return (
    <section className={styles.contacts}>
      <h1 className={styles.contacts__title}>Contact us</h1>
      <div className={styles.contacts__items}>
        {CONTACTS.map((el, i) => <Contact {...el} key={i} />)}
      </div>
    </section>
  )
}

export default Contacts;