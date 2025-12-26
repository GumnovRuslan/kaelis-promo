'use client'

import { Link } from '@/i18n/navigation'
import styles from './styles.module.scss'

type CategoryCardProps = {
  id: string
  name: string
  description?: string
  image?: string
  href: string
}

export function CategoryCard({ id, name, description, image, href }: CategoryCardProps) {
  return (
    <Link key={id} href={href} className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles.card__image}>
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <img src="/images/cards/card_astrology_1.svg" alt={name} />
          )}
        </div>
        <div className={styles.card__right}>
          <div className={styles.card__text}>
            <h2 className={styles.card__title}>{name}</h2>
            {!description && (
              <p className={styles.card__description}>{description}</p>
            )}
          </div>
          <button className={styles.card__select}>Выбрать</button>
        </div>
      </div>
    </Link>
  )
}

