'use client'

import PreloadingContext from "@/context/animation";
import { initGuest } from "@/utils/tarot/initializeGuest";
import { useEffect } from "react";
import { useAppDispatch } from "@/store"
import WebsocketProvider from "@/providers/websocket-provider";

export default function LayoutQuestion({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    initGuest(dispatch)
  }, [dispatch])

  return (
    <PreloadingContext>
      <WebsocketProvider>
        {children}
      </WebsocketProvider>
    </PreloadingContext>
  )
}