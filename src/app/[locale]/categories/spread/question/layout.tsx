'use client'

import PreloadingContext from "@/contexts/animation";
import { initGuest } from "@/utils/tarot/initializeGuest";
import { useEffect } from "react";
import { useAppDispatch } from "@/store"


export default function LayoutQuestion({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    initGuest(dispatch)
  }, [dispatch])

  return (
    <PreloadingContext>
      {children}
    </PreloadingContext>
  )
}