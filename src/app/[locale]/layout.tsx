import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Background } from "@/components/ui";
import { ModalProvider } from "@/context/modal";
import { Header, Footer, Modal, GoogleAnalytics } from "@/components/sections";
import {NextIntlClientProvider} from 'next-intl';
import {routing} from '@/i18n/routing';
import { setRequestLocale, getTranslations } from "next-intl/server";
import "@/styles/index.scss";
import '@/styles/root.scss';

const geistInter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

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
        'uk': `${baseUrl}/uk`,
        'ru': `${baseUrl}/ru`,
      }
    },
    category: "Lifestyle"
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  
  setRequestLocale(locale);
  
  return (
    <html lang={locale}>
      <body className={`${geistInter.variable}`}>
        <GoogleAnalytics/>
        <NextIntlClientProvider>
          <ModalProvider>
            <Modal />
            <Background/>
            <Header/>
              <main>
                {children}
              </main>
            <Footer/>
          </ModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}