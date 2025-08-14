import styles from './styles.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import { InstagramIcon, TikTokIcon, TwitterIcon } from '@/components/icons';

const SubscribeCard = () => {
  return (
    <div className={styles.card}>
      <Image className={styles.card__bg} src={'/images/bg/stars_2.svg'} fill alt='stars background'/>
      <div className={styles.card__inner}>
        <h3 className={styles.card__title}>Subscribe</h3>
        <div className={styles.card__network}>
          <Link className={styles.card__link} href={'#'}>
            <InstagramIcon />
          </Link>
          <Link className={styles.card__link} href={'#'}>
            <TikTokIcon />
          </Link>
          <Link className={styles.card__link} href={'#'}>
            <TwitterIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SubscribeCard;