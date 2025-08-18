import styles from './styles..module.scss';

import Image from 'next/image';

type TProps = {
  textIsShow?: boolean
}

const Message = ({textIsShow = false}: TProps) => {
  return (  
    <section className={styles.message}>
      <Image className={styles.message__bg} src={'/images/bg/bg.svg'} width={1920} height={1433} alt={"backgroud image"}/>
      <div className={styles.message__inner}>
        {textIsShow && (
          <p className={styles.message__text}>
            We believe that everyone has the right to a mindful and harmonious life. Our goal is to provide you with tools for deep self-discovery and decision-making based on ancient wisdom and modern technologies
          </p>
        )}
      </div>
    </section>
  )
}

export default Message;