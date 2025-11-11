"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import GoogleAnalytics from "@/components/sections/analytics/GoogleAnalytics";

type ConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  consent: ConsentCategories | null;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeBanner: () => void;
  saveConsent: (categories: ConsentCategories) => void;
};

const defaultConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

export const CookieConsentProvider = ({ children }: { children: ReactNode }) => {
  const [consent, setConsent] = useState<ConsentCategories | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  // Загружаем состояние при старте
  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (stored) {
      setConsent(JSON.parse(stored));
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (categories: ConsentCategories) => {
    localStorage.setItem("cookie_consent", JSON.stringify(categories));
    setConsent(categories);
    setShowBanner(false);

    // включаем аналитические скрипты, если разрешены
    if (categories.analytics) enableAnalytics();
    if (categories.marketing) enableMarketing();
  };

  const acceptAll = () => saveConsent({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => saveConsent({ necessary: true, analytics: false, marketing: false });
  const openSettings = () => setShowBanner(true);
  const closeBanner = () => setShowBanner(false);

  const enableAnalytics = () => {
    console.log("Enabling analytics scripts");
    // // пример подключения Google Analytics
    // if (document.getElementById("ga-script")) return;
    // const gtag = document.createElement("script");
    // gtag.id = "ga-script";
    // gtag.async = true;
    // gtag.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`;
    // document.head.appendChild(gtag);
  };

  const enableMarketing = () => {
    console.log("Enabling marketing scripts");
    // пример подключения маркетинговых скриптов
  }

  return (
    <CookieConsentContext.Provider
      value={{ consent, showBanner, acceptAll, rejectAll, openSettings, closeBanner, saveConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};
