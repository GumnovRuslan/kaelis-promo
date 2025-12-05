import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Background } from "@/components/ui";
import { ModalProvider } from "@/context/modal";
import { Header, Footer, Modal} from "@/components/sections";
import {NextIntlClientProvider} from 'next-intl';
import {routing} from '@/i18n/routing';
import {getTranslations } from "next-intl/server";
import "@/styles/index.scss";
import '@/styles/root.scss';
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import Cookie from "@/components/sections/cookie";
import AnalyticsManager from "@/components/sections/analytics_manager/AnalyticsManager";
import { SubscribeProvider } from "@/context/SubscribeContext";

const geistInter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
  const { locale } = await params;
  const t = await getTranslations('Seo')

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: {
      default: 'Kaelis',
      template: `%s | ${t('title')}`,
    } ,
    description: t('description'),
    keywords: t('keywords').split(',').map(item => item.trim()),
    icons: {
      icon: "/images/favicon.svg",
    },
    openGraph: {
      siteName: 'Kaelis',
      locale: locale,
      type: 'website',
      url: `${baseUrl}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "x-default": `${baseUrl}/`,
        'en': `${baseUrl}/en`,
        'ua': `${baseUrl}/ua`,
        'ru': `${baseUrl}/ru`,
      }
    },
    category: "Lifestyle"
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  
  return (
    <html lang={locale}>
      <body className={`${geistInter.variable}`}>
        <CookieConsentProvider>
          <NextIntlClientProvider>
            <SubscribeProvider>
              <ModalProvider>
                <Modal />
                <Background/>
                <Header/>
                <main>
                  {children}
                </main>
                <Footer/>
              </ModalProvider>
              <Cookie lang={locale}/>
            </SubscribeProvider>
            <AnalyticsManager/>
          </NextIntlClientProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}