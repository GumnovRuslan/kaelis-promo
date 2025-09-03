import styles from './styles.module.scss';

import { PictogramIcon } from "@/components/icons";
import Image from 'next/image';

const Background = () => {
  return (
    <>
      <span className={styles.body__icon}>
        <PictogramIcon/>
      </span>
      <span className={styles.image__stars}>
        <Image className={styles.body__stars} width={1920} height={560} src={'/images/bg/bg_stars.svg'} alt='background stars'/>
      </span>
    </>
    
  )
}

export default Background;