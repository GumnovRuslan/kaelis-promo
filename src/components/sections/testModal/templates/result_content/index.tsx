import { useTranslations } from 'next-intl';
import { TResultSchemesBlock } from '../../result_schemes';
import styles from './styles.module.scss'
import { StarIcon } from '@/components/icons';

const ResultContent = ({blocks}: {blocks: TResultSchemesBlock[]}) => {
  const t = useTranslations('Archetypes');

  return (
    <div className={styles.wrapper}>
      {blocks.map((block, i) => (
        <div className={styles.section} key={i}>
          <span className={styles.section__title}>{t(block.title)}</span>

          <div className={styles.section__content_inner}>
            {block.content.map((content, key) => {
              if(content.type == 'text') return (
                <div className={styles.section__description} key={key}>
                  {content.text.map((item: string, idx: number) => (
                    <p className={styles.section__text} key={idx}>{t(item)}</p>
                  ))}
                </div>
              ) 

              if(content.type == 'list') return (
                <ul className={styles.section__list} key={key}>
                  {content.text.map((item: string, idx: number) => (
                    <ListItem key={idx} text={t(item)} />
                  ))}
                </ul>
              )
            })}
            </div>
        </div>
      ))}
    </div>
  )
}

export default ResultContent

function ListItem({text}: {text: string}) {
  return (
    <li className={styles.item}>
      <span className={styles.item__icon}><StarIcon/></span>
      <span className={`${styles.item__text} ${styles.section__text}`}>{text}</span>
    </li>
  )
}