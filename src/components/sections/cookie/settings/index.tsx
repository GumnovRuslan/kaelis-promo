import styles from './styles.module.scss';

import { Checkbox, Button, CloseButton } from '@/components/ui';
import { SETTINGS } from '../data';

type TProps = {
  analytics: boolean;
  setAnalytics: (v: boolean) => void;
  marketing: boolean;
  setMarketing: (v: boolean) => void;
  onSave: () => void;
  onBack: () => void;
};

const CookieSettings = ({
  analytics,
  setAnalytics,
  marketing,
  setMarketing,
  onSave,
  onBack,
}: TProps) => {

   const handleAcceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    onSave();
  };

  const handleRejectAll = () => {
    setAnalytics(false);
    setMarketing(false);
    onSave();
  };
  return (
    <div className={styles.settings}>
      <div className={styles.settings__inner}>
        <CloseButton className={styles.settings__button_close} onClick={onBack}/>
        <div className={styles.settings__header}>
          <span className={styles.settings__title}>Cookie Settings</span>
          <span className={styles.settings__subtitle}>Select the categories of cookies that you want to allow</span>
        </div>
        <div className={styles.settings__content}>
          {/* необходимые cookies всегда включены */}
          <ListItem
            title="Necessary"
            text="These cookies are required for the website to function properly and cannot be disabled."
            checked
            disabled
          />

          {/* analytics */}
          <ListItem
            title="Analytics"
            text="They help us understand how visitors interact with the site by collecting and sharing information anonymously."
            checked={analytics}
            onChange={() => setAnalytics(!analytics)}
          />

          {/* marketing */}
          <ListItem
            title="Marketing"
            text="These cookies are used to personalize advertising and measure its effectiveness."
            checked={marketing}
            onChange={() => setMarketing(!marketing)}
          />
        </div>
        <div className={styles.settings__buttons}>
          <Button as='button' className={styles.settings__button} styleType='secondary' text='Accept all' onClick={handleAcceptAll}/>
          <Button as='button' className={styles.settings__button} styleType='secondary' text='Decline all' onClick={handleRejectAll}/>
          <Button as='button' className={styles.settings__button} styleType='secondary' text='Save settings' onClick={onSave}/>
        </div>
      </div>
    </div>
  )
}

export default CookieSettings;

function ListItem({
  title,
  text,
  checked = false,
  onChange,
  disabled = false,
}: {
  title: string;
  text: string;
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
}) {
  return (
    <label className={styles.item}>
      <Checkbox isChecked={checked} onChange={onChange} disabled={disabled} />
      <span className={styles.item__title}>{title}</span>
      <span className={styles.item__text}>{text}</span>
    </label>
  )
}