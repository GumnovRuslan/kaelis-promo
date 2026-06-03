import styles from './styles.module.scss';
import cn from 'classnames';

type TProps = {
  isSpin?: boolean;
  text?: string;
  className?: string;
};

const Loader = ({ isSpin = false, text, className }: TProps) => {
  return (
    <div className={cn(styles.loading, className)}>
      {isSpin && <span className={styles.loading__spin} />}
      {text && <span className={styles.loading__text}>{text}</span>}
    </div>
  );
};

export default Loader;
