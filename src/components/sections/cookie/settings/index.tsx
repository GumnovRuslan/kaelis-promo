import styles from './styles.module.scss';
import { Checkbox, Button, CloseButton } from '@/components/ui';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Cookie.settings')

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
          <span className={styles.settings__title}>{t('title')}</span>
          <span className={styles.settings__subtitle}>{t('subtitle')}</span>
        </div>

        <div className={styles.settings__content}>
          <ListItem
            title={t('settings.necessary.title')}
            text={t('settings.necessary.text')}
            checked
            disabled
          />
          <ListItem
            title={t('settings.analytics.title')}
            text={t('settings.analytics.text')}
            checked={analytics}
            onChange={() => setAnalytics(!analytics)}
          />
          <ListItem
            title={t('settings.marketing.title')}
            text={t('settings.marketing.text')}
            checked={marketing}
            onChange={() => setMarketing(!marketing)}
          />
        </div>

        <div className={styles.settings__buttons}>
          <Button as='button' className={styles.settings__button} styleType='secondary' text={t('buttons.accept-all.label')} onClick={handleAcceptAll}/>
          <Button as='button' className={styles.settings__button} styleType='secondary' text={t('buttons.decline-all.label')} onClick={handleRejectAll}/>
          <Button as='button' className={styles.settings__button} styleType='secondary' text={t('buttons.save.label')} onClick={onSave}/>
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