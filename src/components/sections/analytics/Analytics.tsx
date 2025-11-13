'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { GA_ID, pageview } from '@/lib/analytics/ga';
import Script from 'next/script';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.id = 'Cookiebot';
  //   script.src = 'https://consent.cookiebot.com/uc.js';
  //   script.dataset.cbid = process.env.NEXT_PUBLIC_COOKIEBOT_ID || '';
  //   script.dataset.blockingmode = 'auto';
  //   script.type = 'text/javascript';
  //   document.head.appendChild(script);
  // }, []);

  useEffect(() => {
    if (!GA_ID) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  if (!GA_ID) return null;

  return (
    <>
      {/* <Script 
        id="Cookiebot" 
        src="https://consent.cookiebot.com/uc.js" 
        data-cbid={process.env.NEXT_PUBLIC_COOKIEBOT_ID}
        data-blockingmode="auto" 
        type="text/javascript"
      /> */}

      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `,
        }}
      />

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}}/>
      )}
    </>
  );
}