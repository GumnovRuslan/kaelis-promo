'use client'
import { Breadcrumbs, ButtonBack } from '@/components/ui';
import styles from './styles.module.scss'
import { Chart } from "@/components/sections";
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/store';

export default function ChartPage() {
  const t = useTranslations('CategoriesPage')
  const b = useTranslations('breadcrumbs')
  const {question, selectedCategory, selectedSpread} = useAppSelector(state => state.shuffle)

  const breadcrumbsData = [
    {
      label: b('home'),
      url: '/'
    },
    {
      label: b('tarot'),
      url: '/tarot'
    },
    {
      label: selectedCategory.data?.name ?? '',
      url: '/tarot/spread'
    },
    {
      label: selectedSpread.data?.name ?? '',
      url: '/tarot/spread/question'
    }
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.section__header}>
          <ButtonBack  href={`/tarot/spread/question`} text={t('buttons.back')}/>
          <Breadcrumbs data={breadcrumbsData} lastActive/>
          {selectedSpread.data?.description && (
            <p className={styles.description}>{selectedSpread.data?.description}</p>
          )}
          {question && (<p className={styles.userQuestion}>Вопрос: {question}</p>)}
        </div>

        <Chart/>
      </div>
    </section>
  )
}