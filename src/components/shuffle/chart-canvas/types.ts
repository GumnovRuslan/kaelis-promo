export interface CardInfo {
  image: string
  label: string
  description: string
}

import { TarotCard } from '@/lib/types/shuffle'

export interface ChartCanvasProps {
  matrix: Array<{ x: number; y: number }>
  cards: Record<string, TarotCard>
}


