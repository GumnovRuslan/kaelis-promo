export interface CardInfo {
  image: string
  label: string
  description: string
}

export interface ChartCanvasProps {
  matrix: Array<{ x: number; y: number }>
  cards: Record<string, { image: string; name: string }>
}


