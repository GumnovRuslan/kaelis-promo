import { ArrowLeftIcon } from '@/components/icons';
import styles from './styles.module.scss';
import Link from 'next/link';

type TProps = {
  href: string;
  text: string;
}

const ButtonBack = ({href, text}: TProps) => {
  return (
    <Link href={href} className={styles.button}>
      <span className={styles.button__inner}>
        <span className={styles.button__icon}><ArrowLeftIcon /></span>
        <span className={styles.button__text}>{text}</span>
      </span>
    </Link>
  )
}

export default ButtonBack