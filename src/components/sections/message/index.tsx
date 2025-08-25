import { useTranslations } from 'next-intl';
import styles from './styles..module.scss';

import Image from 'next/image';

type TProps = {
  textIsShow?: boolean
}

const Message = ({textIsShow = false}: TProps) => {
  const t = useTranslations('HomePage');
  
  return (  
    <section className={styles.message}>
      <Image className={styles.message__bg} src={'/images/bg/bg.svg'} width={1920} height={1433} alt={"backgroud image"}/>
      <div className={styles.message__inner}>
        {textIsShow && (
          <p className={styles.message__text}>{t('message')}</p>
        )}
      </div>
    </section>
  )
}

export default Message;