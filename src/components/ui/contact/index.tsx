import styles from './styles.module.scss';

import { Link } from '@/i18n/navigation';

type TProps = {
  Icon: () => React.JSX.Element;
  href: string;
  text: string;
  className?: string;
}

const Contact = ({ Icon, href, text, className }: TProps) => {
  return (
    <Link className={`${styles.contact} ${className}`} href={href}>
      <span className={styles.contact__icon}>
        <Icon />
      </span>
      <span className={styles.contact__text}>{text}</span>
    </Link>
  )
}

export default Contact;