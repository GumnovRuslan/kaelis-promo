export interface TarotSpeaker {
  id: string
  name: string
  icon: string
}

export interface TarotCategory {
  id: string
  name: string
}

export interface TarotCard {
  id: string
  name: string
  image: string
  description?: string
}

export interface TarotRequest {
  request: {
    question: string
    speaker_id: string
    tarot_id: string
    category_id: string
  }
  response: {
    id: number
    tarot: {
      id: number
      name: string
      description: string
      matrix: Record<string, [number, number]>
    }
    question: string
    cards: Record<string, TarotCard>
    back_card: string
    chat_id: number
    reading: ReadingType
  }
}

export type ReadingType = {
  cards?: ReadingCardType[]
  final_question: string
  interpretation: InterpretationType | null
  suggestion?: string
  status: string
}

type InterpretationType = {
  analysis: string
  final: string
  intro: string
}

type ReadingCardType = {
  position: number
  label: string
  description: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success?: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
  }
}

export type Coordinates = {
  x: number
  y: number
}

export type Matrix = Coordinates[]


