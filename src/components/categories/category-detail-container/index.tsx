'use client'

import { ReactNode } from 'react'
import styles from './styles.module.scss'

type CategoryDetailContainerProps = {
  children: ReactNode
}

export function CategoryDetailContainer({ children}: CategoryDetailContainerProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  )
}

