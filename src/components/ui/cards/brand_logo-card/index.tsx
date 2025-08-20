import styles from './styles.module.scss';

import Image from 'next/image';

const BrandLogoCard = () => {
  return (
    <div className={styles.card}>
      <Image className={styles.card__logo} src={'/images/logo.svg'} fill alt='logo'/>
      <Image className={styles.card__stars} src={'/images/bg/stars.svg'} fill alt='stars background'/>
    </div>
  )
}

export default BrandLogoCard;