import { PortableText } from '@portabletext/react';
import styles from './styles.module.scss';
import { TPolicy } from '@/types/policy';
import { ptComponents } from '@/utils/portableTextComponents';

type TProps = TPolicy

const PrivacyPolicy = ({title, published, contentRaw}: TProps) => {

  return (
    <section className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>{title}</span>
        </h1>
        <h2 className={styles.privacy__published}>{published}</h2>
        {contentRaw && (
          <div className={`${styles.article__content} ${styles.style_guides}`}>
            <PortableText value={contentRaw} components={ptComponents}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default PrivacyPolicy;