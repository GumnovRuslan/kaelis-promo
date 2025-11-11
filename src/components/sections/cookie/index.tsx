"use client";


import CookieModal from "./modal";
import CookieSettings from "./settings";
import { useState } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

const Cookie = () => {
  const { showBanner, acceptAll, rejectAll, saveConsent } = useCookieConsent();
  const [customOpen, setCustomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (!showBanner) return null;

  const handleSaveCustom = () => {
    saveConsent({ necessary: true, analytics, marketing });
    setCustomOpen(false);
  };
  return (
    <>
      {!customOpen ? (
        <CookieModal
          acceptAll={acceptAll}
          rejectAll={rejectAll}
          openSettings={() => setCustomOpen(true)}
        />
      ) : (
        <CookieSettings
          analytics={analytics}
          setAnalytics={setAnalytics}
          marketing={marketing}
          setMarketing={setMarketing}
          onSave={handleSaveCustom}
          onBack={() => setCustomOpen(false)}
        />
      )}
    </>
  )
}

export default Cookie;