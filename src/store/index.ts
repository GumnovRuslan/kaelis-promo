'use client'

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import shuffleReducer, {
  setSelectedCategory,
  clearSelectedCategory,
  setSelectedSpread,
  clearSelectedSpread,
  setReaderStyle,
  setQuestion,
  setIsFirstAnimationDone,
  clearChart,
  setCategories,
  getTarotCategories,
  getTarotSpreads,
  clearShuffleSpreads,
  getTarotSpeaker,
  getTarotResponse,
  clearError,
  authenticateGuest,
  setGuestAuth,
  getTarotAnswerFromChat,
  resetShuffleResponse
} from './slices/shuffle'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

// --- объединяем редьюсеры ---
const rootReducer = combineReducers({
  shuffle: shuffleReducer,
})

// --- конфигурация persist ---
const persistConfig = {
  key: 'categories',        // ключ в localStorage
  storage,                  // localStorage
  whitelist: ['shuffle'],   // сохраняем только shuffle
}

// --- оборачиваем reducer в persistReducer ---
const persistedReducer = persistReducer(persistConfig, rootReducer)

// --- создаём store ---
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // нужно для redux-persist
    }),
  devTools: process.env.NODE_ENV !== 'production',
})

// --- создаём persistor для PersistGate ---
export const persistor = persistStore(store)

// --- типы и хуки ---
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

// --- экшены shuffle ---
export const shuffleActions = {
  setSelectedCategory,
  clearSelectedCategory,
  setSelectedSpread,
  clearSelectedSpread,
  setReaderStyle,
  setQuestion,
  setIsFirstAnimationDone,
  clearChart,
  setCategories,
  getTarotCategories,
  getTarotSpreads,
  clearShuffleSpreads,
  getTarotSpeaker,
  getTarotResponse,
  clearError,
  authenticateGuest,
  setGuestAuth,
  getTarotAnswerFromChat,
  resetShuffleResponse
}
