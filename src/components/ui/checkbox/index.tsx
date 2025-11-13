import styles from './styles.module.scss';

import { MarkIcon } from '@/components/icons';

type TProps = {
  isChecked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

const Checkbox = ({ isChecked, onChange, disabled }: TProps) => {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
        className={styles.input}
      />
      <span className={`${styles.checkbox} ${isChecked ? styles.checked : ""}`}>
        {isChecked && <MarkIcon />}
      </span>
    </label>
  );
};

export default Checkbox;