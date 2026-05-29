'use client'

import { ArrowLeftIcon } from '@/components/icons';
import styles from './styles.module.scss';
import { Link } from '@/i18n/navigation'
import { useRouter } from 'next/navigation';

type BaseProps = {
  text: string
}

type LinkProps = BaseProps & {
  as: 'link'
  href: string
}

type ButtonProps = BaseProps & {
  as: 'button'
  onClick?: () => void
}

type TProps = LinkProps | ButtonProps

const ButtonBack = (props: TProps) => {
  const router = useRouter();
  const content = (
    <span className={styles.button__inner}>
      <span className={styles.button__icon}>
        <ArrowLeftIcon />
      </span>

      <span className={styles.button__text}>
        {props.text}
      </span>
    </span>
  )

  if (props.as === 'link') {
    return (
      <Link href={props.href} className={styles.button}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={props.onClick ? props.onClick : router.back}
      className={styles.button}
    >
      {content}
    </button>
  )
}

export default ButtonBack