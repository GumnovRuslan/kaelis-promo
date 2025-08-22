import styles from './styles.module.scss';

import Link from 'next/link';
import { TBreadcrumbs } from '@/types/breadcrumbs';
import { ArrowIcon } from '@/components/icons';
import { Fragment } from 'react';

type TProps = {
  data: TBreadcrumbs[]
  className?: string
}

const Breadcrumbs = ({data, className}: TProps) => {
  return (
    <div className={`${styles.bread} ${className}`}>
      {data.map((item, i) => (
        <Fragment key={i}>
          <Link href={item.linkInternal?.label || ''} className={styles.bread__link} >
            {item.title}
          </Link>
          {i+1 < data.length && (
            <span className={styles.bread__icon}><ArrowIcon/></span>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Breadcrumbs;