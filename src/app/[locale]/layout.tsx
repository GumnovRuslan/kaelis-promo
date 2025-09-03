import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Background } from "@/components/ui";
import { ModalProvider } from "@/context/modal";
import { Header, Footer, Modal } from "@/components/sections";
import NetlifyForm from "@/components/ui/netlify_form";
import {NextIntlClientProvider} from 'next-intl';
import {routing} from '@/i18n/routing';
import { setRequestLocale } from "next-intl/server";
import "@/styles/index.scss";
import '@/styles/root.scss';

const geistInter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const generateMetadata = async ({ params }: {params: Promise<{locale: string}> }): Promise<Metadata> => {
  const { locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kaelisai.com';

  return {
    title: "Kaelis",
    description: "",
    keywords: "Kaelis",
    icons: {
      icon: "/images/favicon.svg",
    },
    openGraph: {
      title: 'Kaelis',
      description: '',
      locale,
      type: 'website',
      url: baseUrl,
    },
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'uk': `${baseUrl}/uk`,
        'ru': `${baseUrl}/ru`,
      }
    }
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
          <NetlifyForm/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}