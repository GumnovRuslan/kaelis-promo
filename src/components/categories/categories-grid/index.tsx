'use client'

import { ReactNode } from 'react'
import styles from './styles.module.scss'

type CategoriesGridProps = {
  children: ReactNode
}

export function CategoriesGrid({ children }: CategoriesGridProps) {
  return <div className={styles.grid}>{children}</div>
}

