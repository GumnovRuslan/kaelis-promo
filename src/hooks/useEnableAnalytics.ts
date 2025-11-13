"use client";

import { useEffect } from "react";

type Options = {
  gaId?: string | undefined; // GOOGLE_ANALYTICS_ID
  scriptId?: string;         // id для <script> (по умолчанию 'ga-script')
};

export function useEnableAnalytics(enabled: boolean, options?: Options) {
  const { gaId, scriptId = "ga-script" } = options || {};

  useEffect(() => {
    if (!enabled || !gaId) return;

    // если уже добавлен — ничего не делаем
    if (document.getElementById(scriptId)) return;

    // 1) Загружаем externals script
    const external = document.createElement("script");
    external.id = scriptId;
    external.async = true;
    external.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(external);

    // 2) Добавляем инициализирующий inline script
    const inline = document.createElement("script");
    inline.id = `${scriptId}-init`;
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { page_path: window.location.pathname });
    `;
    document.head.appendChild(inline);

    // cleanup: если enabled станет false, удаляем скрипты и dataLayer
    return () => {
      const ext = document.getElementById(scriptId);
      if (ext) ext.remove();

      const init = document.getElementById(`${scriptId}-init`);
      if (init) init.remove();

      try {
        // удаляем глобальную dataLayer, если нужно
        // @ts-ignore
        if (window && (window as any).dataLayer) {
          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
          delete (window as any).dataLayer;
        }
      } catch (e) {
        // ignore
      }
    };
  }, [enabled, gaId, scriptId]);
}