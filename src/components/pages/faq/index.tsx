import { FAQ } from "@/components/sections";
import { getLocale } from "next-intl/server";
import Head from "next/head";
import FaqSeo from "@/seo/faq";

const FAQPage = async () => {
  const locale = await getLocale();
  return (
  <>
    <Head>
      <FaqSeo lang={locale || 'en'}/>
    </Head>
    <FAQ/>
  </>
  )
}

export default FAQPage;