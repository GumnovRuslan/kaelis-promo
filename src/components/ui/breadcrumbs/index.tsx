import styles from './styles.module.scss';

import { Link } from '@/i18n/navigation';
import { TBreadcrumbs } from '@/types/breadcrumbs';
import { ArrowIcon } from '@/components/icons';
import { Fragment } from 'react';

type TProps = {
  data: TBreadcrumbs[];
  lastActive?: boolean; 
  className?: string;
}

const Breadcrumbs = ({data, className, lastActive = false}: TProps) => {
  return (
    <div className={`${styles.bread} ${className}`}>
      {data.map((item, i) => (
        <Fragment key={i}>
          <Link href={item?.url ?? ''} className={`${styles.bread__link} ${!lastActive && styles[`bread__link--disable`]}`} >
            {item?.label}
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