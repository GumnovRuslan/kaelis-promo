'use client'
import { Breadcrumbs, ButtonBack } from '@/components/ui';
import styles from './styles.module.scss'
import { Chart } from "@/components/sections";
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/store';

export default function ChartPage() {
  const t = useTranslations('CategoriesPage')
  const {question, selectedCategory, selectedSpread} = useAppSelector(state => state.shuffle)

  const breadcrumbsData = [
    {
      label: selectedCategory.data?.name ?? '',
      url: '/categories'
    },
    {
      label: selectedSpread.data?.name ?? '',
      url: '/categories/spread'
    }
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.section__header}>
          <ButtonBack  href={`/categories/spread/question`} text={t('buttons.back')}/>
          <Breadcrumbs data={breadcrumbsData} lastActive/>
          {question && (<p className={styles.userQuestion}>{question}</p>)}
        </div>

        {/* {selectedSpread.data?.description && (
          <p className={styles.description}>{selectedSpread.data?.description}</p>
        )} */}

        <Chart/>
      </div>
    </section>
  )
}