import styles from './styles.module.scss';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacy}>
      <div className={styles.privacy__inner}>
        <h1 className={styles.privacy__title}>
          <span>Kaelis</span>
          <span>Privacy Policy</span>
        </h1>
        <h2 className={styles.privacy__published}>
          Published: June 14, 2025
          </h2>
        <div className={styles.privacy__content}>
          <div>
            <h3>
              The Mystical Connection Between the Moon and Humans
            </h3>
            <p>
              Since ancient times, people have noticed a connection between lunar cycles and changes in behavior, emotions, and physical states. Modern science confirms some of these observations, showing the real influence of the Moon on biological processes.
            </p>
          </div>
          <div>
            <h3>Lunar Phases and Their Meaning</h3>
            <ul>
              <li>New Moon — a time for new beginnings and planning</li>
              <li>Waxing Moon — a period of growth and project development</li>
              <li>Full Moon — a peak of emotions and completion of cycles</li>
              <li>Waning Moon — a time for release and cleansing</li>
            </ul>
            <p>Influence on Emotions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy;