"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { useEnableAnalytics } from "@/hooks/useEnableAnalytics";
import { useDynamicScript } from "@/hooks/useDynamicScript";
import { GA_ID, pageview } from "@/lib/analytics/ga";

export default function AnalyticsManager() {
  const { consent } = useCookieConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Безопасная проверка: если consent ещё не загружен — ничего не делаем
  const analyticsEnabled = Boolean(consent?.analytics);
  const marketingEnabled = Boolean(consent?.marketing);

  // --- Google Analytics ---
  useEnableAnalytics(analyticsEnabled, { gaId: GA_ID });

  // --- Microsoft Clarity ---
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
  useDynamicScript(
    Boolean(analyticsEnabled && CLARITY_ID),
    "clarity-script",
    "",
    `(function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");`
  );

  // --- Pageview для GA ---
  useEffect(() => {
    if (!analyticsEnabled || !GA_ID) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    pageview(url);
  }, [pathname, searchParams, analyticsEnabled]);

  return null;
}