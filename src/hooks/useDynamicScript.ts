"use client";

import { useEffect } from "react";

/**
 * Универсальный хук для динамического подключения сторонних скриптов.
 */
export function useDynamicScript(enabled: boolean, id: string, url: string, inlineCode?: string) {
  useEffect(() => {
    if (!enabled) return;

    // Не дублируем, если уже есть
    if (document.getElementById(id)) return;

    // внешний <script>
    if (url) {
      const script = document.createElement("script");
      script.id = id;
      script.async = true;
      script.src = url;
      document.head.appendChild(script);
    }

    // inline <script>
    if (inlineCode) {
      const inline = document.createElement("script");
      inline.id = `${id}-inline`;
      inline.innerHTML = inlineCode;
      document.head.appendChild(inline);
    }

    // cleanup — удаляем при отключении
    return () => {
      document.getElementById(id)?.remove();
      document.getElementById(`${id}-inline`)?.remove();
    };
  }, [enabled, id, url, inlineCode]);
}