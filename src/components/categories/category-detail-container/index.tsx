'use client'

import { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowLeftIcon } from '@/components/icons'
import styles from './styles.module.scss'
import { useTranslations } from 'next-intl'

type CategoryDetailContainerProps = {
  children: ReactNode
  title?: string
  description?: string
  backHref: string
}

export function CategoryDetailContainer({ children, title, description, backHref }: CategoryDetailContainerProps) {
  const t = useTranslations('CategoriesPage')
  
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Link href={backHref} className={styles.backLink}>
          <ArrowLeftIcon /> <span>{t('buttons.back')}</span>
        </Link>
        {title && <h1 className={styles.title}>{title}</h1>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </section>
  )
}

