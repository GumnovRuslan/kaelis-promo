import styles from './styles.module.scss';
import { 
  AppIntroCard, 
  BrandLogoCard, 
  SubscribeCard,
  VideoCard,
  PurposeCard,
} from '@/components/ui';

const AboutApp = () => {
  return (
    <section className={styles.about}>
      <div className={styles.about__inner}>
        <h2 className={styles.about__title}>About the app</h2>
        <div className={styles.about__content}>
          <AppIntroCard />
          <div className={styles.about__group}>
            <BrandLogoCard />
            <SubscribeCard />
          </div>
          <VideoCard />
          <PurposeCard />
        </div>
      </div>
    </section>
  )
}

export default AboutApp;

