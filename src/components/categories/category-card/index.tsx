import { Link } from '@/i18n/navigation'
import styles from './styles.module.scss'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '@/components/ui'

type CategoryCardProps = {
  id: string
  name: string
  description?: string
  image?: string
  href: string
  onClick?: () => void
}

export function CategoryCard({ id, name, description, image, href, onClick }: CategoryCardProps) {
  const t = useTranslations('CategoriesPage')

  return (
    <Link key={id} href={href} className={styles.card} onClick={onClick}>
      <div className={styles.card__content}>

        <div className={styles.card__image}>
          <Image width={150} height={150} src={image ?? "/images/cards/card_astrology_1.svg" } alt={name} />
        </div>

        <div className={styles.card__right}>
          <div className={styles.card__text}>
            <h2 className={styles.card__title}>{name}</h2>
            {description && (
              <p className={styles.card__description}>{description}</p>
            )}
          </div>

          <Button className={styles.card__select} text={t('buttons.select')}/>
        </div>
      </div>
    </Link>
  )
}

