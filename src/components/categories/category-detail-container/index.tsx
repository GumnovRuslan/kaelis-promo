'use client'

import { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { ArrowLeftIcon } from '@/components/icons'
import styles from './styles.module.scss'

type CategoryDetailContainerProps = {
  children: ReactNode
  title?: string
  description?: string
  backHref: string
}

export function CategoryDetailContainer({ children, title, description, backHref }: CategoryDetailContainerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Link href={backHref} className={styles.backLink}>
          <ArrowLeftIcon /> <span>Назад</span>
        </Link>
        {title && <h1 className={styles.title}>{title}</h1>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </section>
  )
}

