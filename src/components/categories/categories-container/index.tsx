'use client'

import { ReactNode } from 'react'
import styles from './styles.module.scss'

type CategoriesContainerProps = {
  children: ReactNode
  title?: string
  description?: string
}

export function CategoriesContainer({ children, title, description }: CategoriesContainerProps) {
  return (
    <div className={styles.container}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  )
}

