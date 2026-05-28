import styles from './styles.module.scss';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ButtonStore } from '@/components/ui';
import { getLocale, getTranslations } from 'next-intl/server';
import { getSocialData } from '@/lib/config/social_links';
import { TPolicy } from '@/types/policy';
import { fetchGraphQL } from '@/lib/graphql';
import { getPolicies } from '@/graphql/queries/policy';

const Footer = async () => {
  const locale = await getLocale()
  const social = getSocialData({lang: locale as 'en' | 'ru' | 'ua'});
  const t = await getTranslations('footer')

  const { data, errors } = await fetchGraphQL(getPolicies(locale));
  const policies: TPolicy[] | null = data?.allPolicy || null
  const navItemsMain = t.raw('nav.main')

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__column}>
          <Link href='/' className={styles.footer__logo}>
            <Image src='/images/logo.svg' fill alt='logo' />
          </Link>
          <p className={styles.footer__text}>{t('desc')}</p>
          <div className={styles.footer__buttons}>
            <ButtonStore type='app'/>
            <ButtonStore type='google'/>
          </div>
        </div>

        <div className={styles.footer__nav_columns}>
          {navItemsMain?.length && (
            <nav className={styles.footer__nav}>
              {navItemsMain.map((nav: {label: string; href: string}, i: number) => (
                <Link href={nav.href} className={styles.footer__nav_link} key={i}>
                  {nav.label}
                </Link>
              ))}
            </nav>
          )}

          {policies?.length && (
            <nav className={styles.footer__nav}>
              {policies.map(item => (
                <Link href={'/policy/' + item.slug.current} className={styles.footer__nav_link} key={item._id}>
                  {item.title}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
      <div className={styles.footer__network}>
        {social.map((item, i) => (
          <Link className={styles.footer__network_link} href={item.href} target='_blank' key={i} aria-label={item.name}>
            <item.icon/>
          </Link>
        ))}
      </div>
    </footer>
  )
}

export default Footer;