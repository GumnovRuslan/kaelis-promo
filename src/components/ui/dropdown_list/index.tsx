import styles from './styles.module.scss'
import Link from 'next/link'
import type { TarotCategory } from '@/lib/types/shuffle';

type TProps = {
  className?: string
  items: TarotCategory[]
}

export default function DropDownList({ className, items }: TProps) {
  return (
    <div className={`${styles.list} ${className}`}>
      <div className={styles.list__items}>
        {items.map((el, i) => (
          <Link href={`/categories/spread?id=${el.id}`} className={styles.list__item} key={i}>{el.name}</Link>
        ))}
      </div>
    </div>
  )
}