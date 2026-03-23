import { Matrix } from '@/lib/types/shuffle'

export type InitialStateType = Readonly<{
  selectedCategory: string | null
  selectedSpread: string | null
  question: string | null
  layout: Layout | null
  isFirstAnimationDone: boolean
}>

export const initialState: InitialStateType = {
  selectedCategory: null,
  selectedSpread: null,
  question: null,
  layout: null,
  isFirstAnimationDone: false,
}

export type Layout = {
  description: string
  name: string
  matrix: Matrix
}


