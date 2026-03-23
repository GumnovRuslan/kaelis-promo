import styles from './styles.module.scss';

type TProps = {
  icon: any;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function SpeakerCard ({name, icon, isSelected, onClick}: TProps) {
  return (
    <button
      className={`${styles.speaker_button} ${isSelected ? styles[`speaker_button--selected`] : ''}`}
      onClick={onClick}
    >
      <div className={styles.speaker_button__icon} dangerouslySetInnerHTML={{ __html: icon }}/>
      <span className={styles.speaker_button__name}>{name}</span>
    </button>
  )
}