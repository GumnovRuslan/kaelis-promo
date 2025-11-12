"use client";

import CookieModal from "./modal";
import CookieSettings from "./settings";
import { useState } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";

const Cookie = () => {
  const { showBanner, acceptAll, rejectAll, saveConsent } = useCookieConsent();
  const [customOpen, setCustomOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const handleSaveCustom = () => {
    saveConsent({ necessary: true, analytics, marketing });
    setCustomOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showBanner && (
        !customOpen ? (
          <motion.div
            key="cookie-modal"
            className={styles.cookie}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CookieModal
              acceptAll={acceptAll}
              rejectAll={rejectAll}
              openSettings={() => setCustomOpen(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="cookie-settings"
            className={styles.cookie}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CookieSettings
              analytics={analytics}
              setAnalytics={setAnalytics}
              marketing={marketing}
              setMarketing={setMarketing}
              onSave={handleSaveCustom}
              onBack={() => setCustomOpen(false)}
            />
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

export default Cookie;