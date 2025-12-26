import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import shuffleReducer, {
  setSelectedCategory,
  setSelectedSpread,
  setReaderStyle,
  setQuestion,
  setIsFirstAnimationDone,
  clearChart,
  setCategories,
  getTarotCategories,
  getTarotSpreads,
  getTarotSpeaker,
  getTarotResponse,
  clearError,
  authenticateGuest,
  setGuestAuth,
  getTarotAnswerFromChat,
  resetShuffleResponse
} from './slices/shuffle'

export const reducer = {
  shuffle: shuffleReducer,
}

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const shuffleActions = {
  setSelectedCategory,
  setSelectedSpread,
  setReaderStyle,
  setQuestion,
  setIsFirstAnimationDone,
  clearChart,
  setCategories,
  getTarotCategories,
  getTarotSpreads,
  getTarotSpeaker,
  getTarotResponse,
  clearError,
  authenticateGuest,
  setGuestAuth,
  getTarotAnswerFromChat,
  resetShuffleResponse
}

