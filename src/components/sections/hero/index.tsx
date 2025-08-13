import styles from './styles.module.scss';
import { Button } from '@/components/ui';
import { AppleStoreIcon, GooglePlayIcon } from '@/components/icons';

type TButton = {
  type: 'link';
  href: string;
  icon: React.ReactNode;
  text: string;
  title: string;
}

const BUTTONS_DATA: TButton[] = [
  {
    type: 'link',
    href: '#',
    icon: <AppleStoreIcon />,
    text: 'Download on',
    title: 'App Store',
  },
  {
    type: 'link',
    href: '#',
    icon: <GooglePlayIcon />,
    text: 'Get on',
    title: 'Google play',
  }
]


const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>Understand yourself Change your life</h1>
          <p className={styles.hero__subtitle}>
            Tools for conscious change
          </p>
          <p className={styles.hero__description}>
            Personalized recommendations based on astrology, Tarot, and proven methods — for mindful decisions and harmony in everyday life
          </p>
          <div className={styles.hero__buttons}>
            {BUTTONS_DATA.map((button, index) => (
              <Button key={index} type={button.type} href={button.href} className={styles.button}>
                <div className={styles.button__inner}>
                  <span className={styles.button__icon}>
                    {button.icon}
                  </span>
                  <div className={styles.button__content}>
                    <span className={styles.button__text}>{button.text}</span>
                    <span className={styles.button__title}>{button.title}</span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;