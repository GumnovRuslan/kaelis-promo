'use client';

// import PreloadingContext from '@/context/animation';
import WebsocketProvider from '@/providers/websocket-provider';
import useInitGuest from '@/hooks/useInitGuest';

export default function LayoutQuestion({ children }: { children: React.ReactNode }) {
  useInitGuest();

  return (
    // <PreloadingContext>
    <WebsocketProvider>{children}</WebsocketProvider>
    // </PreloadingContext>
  );
}
