import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { shuffleApiService } from '@/lib/services/shuffle-api'
import { TarotCategory, TarotCard, TarotSpeaker, TarotRequest, Matrix } from '@/lib/types/shuffle'
import { Pagination } from './types'
import { setGuestAuth as setGuestAuthStorage } from '@/lib/api'

export const getTarotResponse = createAsyncThunk(
  'shuffle/getTarotResponse',
  async ({ question, tarot_id, speaker_id, category_id }: TarotRequest['request'], { rejectWithValue }) => {
    try {
      const response = await shuffleApiService.getTarotResponse({ tarot_id, question, speaker_id, category_id })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get tarot response')
    }
  }
)

export const getTarotSpeaker = createAsyncThunk(
  'shuffle/getTarotSpeaker',
  async (_, { rejectWithValue }) => {
    try {
      const response = await shuffleApiService.getTarotSpeaker()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get tarot speaker')
    }
  }
)

export const getTarotCategories = createAsyncThunk(
  'shuffle/getTarotCategories',
  async ({ page, per_page }: Pagination, { rejectWithValue }) => {
    try {
      const response = await shuffleApiService.getTarotCategories({ params: { page: page || 1, per_page: per_page || 20 } })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get categories')
    }
  }
)

export const getTarotSpreads = createAsyncThunk(
  'shuffle/getTarotSpreads',
  async (selectedCategory: TarotCategory | null, { rejectWithValue }) => {
    try {
      const response = await shuffleApiService.getTarotCards({ params: { page: 1, per_page: 20, category_id: selectedCategory?.id } })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get spreads')
    }
  }
)

export const authenticateGuest = createAsyncThunk(
  'shuffle/authenticateGuest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to authenticate guest')
      }
      
      const data = await response.json()
      
      const token = data.data?.access_token || data.access_token
      const guestId = data.data?.guest?.id || data.guest?.id
      
      if (token && guestId) {
        setGuestAuthStorage(token, String(guestId))
        return { guestId: String(guestId), token }
      }
      
      throw new Error('Invalid response format')
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to authenticate guest')
    }
  }
)

export const getTarotAnswerFromChat = createAsyncThunk(
  'shuffle/getTarotAnswerFromChat',
  async (urlMessage: string, { rejectWithValue }) => {
    try {
      const response = await shuffleApiService.getTarotAnswerFromChat(urlMessage)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get tarot answer')
    }
  }
)

export interface ShuffleState {
  layout: {
    matrix: Matrix
  } | null
  isFirstAnimationDone: boolean
  isLoading: boolean
  loadingProgress: number
  question: string | null
  selectedCategory: TarotCategory | null
  selectedSpread: TarotCard | null
  speakers: TarotSpeaker[] | null
  readerStyle: TarotSpeaker | null
  spreads: TarotCard[] | null
  categories: TarotCategory[] | null
  response: TarotRequest['response'] | null
  error: string | null
  guestId: string | null
  guestToken: string | null
}

const initialState: ShuffleState = {
  layout: null,
  isFirstAnimationDone: false,
  isLoading: true,
  speakers: null,
  loadingProgress: 0,
  question: null,
  spreads: null,
  selectedCategory: null,
  selectedSpread: null,
  readerStyle: null,
  categories: null,
  response: null,
  error: null,
  guestId: null,
  guestToken: null,
}

export const shuffleSlice = createSlice({
  name: 'shuffle',
  initialState,
  reducers: {
    setMatrix: (state, action: PayloadAction<Matrix>) => {
      state.layout = { matrix: action.payload }
    },
    clearShuffleSpreads: (state) => {
      state.spreads = []
    },
    setCategories: (state, action: PayloadAction<TarotCategory[]>) => {
      state.categories = action.payload
    },
    setIsFirstAnimationDone: (state, action: PayloadAction<boolean>) => {
      state.isFirstAnimationDone = action.payload
    },
    clearChart: (state) => {
      state.selectedCategory = null
      state.question = ''
      state.readerStyle = null
      state.selectedSpread = null
      state.response = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setLoadingProgress: (state, action: PayloadAction<number>) => {
      state.loadingProgress = action.payload
    },
    setQuestion: (state, action: PayloadAction<string | null>) => {
      state.question = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<TarotCategory | null>) => {
      state.selectedCategory = action.payload
    },
    setSelectedSpread: (state, action: PayloadAction<TarotCard | null>) => {
      state.selectedSpread = action.payload
    },
    setReaderStyle: (state, action: PayloadAction<TarotSpeaker | null>) => {
      state.readerStyle = action.payload
    },
    resetShuffleResponse: (state) => {
      state.response = null
      state.error = null
    },
    resetShuffleState: (state) => {
      state.layout = null
      state.isFirstAnimationDone = false
      state.isLoading = true
      state.loadingProgress = 0
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    setGuestAuth: (state, action: PayloadAction<{ guestId: string; token: string }>) => {
      state.guestId = action.payload.guestId
      state.guestToken = action.payload.token
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTarotCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTarotCategories.fulfilled, (state, action: PayloadAction<TarotCategory[]>) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(getTarotCategories.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(getTarotSpreads.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTarotSpreads.fulfilled, (state, action) => {
        state.spreads = action.payload
        state.isLoading = false
      })
      .addCase(getTarotSpreads.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(getTarotResponse.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getTarotResponse.fulfilled, (state, action) => {
        state.response = action.payload
        state.isLoading = false

        if (state.response?.tarot?.matrix) {
          const matrixArray: Matrix = Object.keys(state.response.tarot.matrix).map(key => {
            const [x, y] = state.response!.tarot.matrix[key]
            return { x, y }
          })
          state.layout = { matrix: matrixArray }
        }

        if (state.response?.cards) {
          Object.keys(state.response.cards).forEach(key => {
            if (state.response?.cards?.[key]?.image) {
              state.response.cards[key].image = state.response.cards[key].image
            }
          })
        }
      })
      .addCase(getTarotResponse.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(getTarotSpeaker.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTarotSpeaker.fulfilled, (state, action) => {
        state.speakers = action.payload
        state.isLoading = false
      })
      .addCase(getTarotSpeaker.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(authenticateGuest.fulfilled, (state, action) => {
        state.guestId = action.payload.guestId
        state.guestToken = action.payload.token
      })
      .addCase(authenticateGuest.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(getTarotAnswerFromChat.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getTarotAnswerFromChat.fulfilled, (state, action) => {
        state.response = action.payload
        state.isLoading = false

        if (state.response?.tarot?.matrix) {
          const matrixArray: Matrix = Object.keys(state.response.tarot.matrix).map(key => {
            const [x, y] = state.response!.tarot.matrix[key]
            return { x, y }
          })
          state.layout = { matrix: matrixArray }
        }

        if (state.response?.cards) {
          Object.keys(state.response.cards).forEach(key => {
            if (state.response?.cards?.[key]?.image) {
              state.response.cards[key].image = state.response.cards[key].image
            }
          })
        }
      })
      .addCase(getTarotAnswerFromChat.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  }
})

export const {
  setMatrix,
  setIsFirstAnimationDone,
  clearShuffleSpreads,
  setCategories,
  setLoading,
  setLoadingProgress,
  setQuestion,
  setSelectedCategory,
  setSelectedSpread,
  setReaderStyle,
  resetShuffleResponse,
  resetShuffleState,
  clearError,
  clearChart,
  setGuestAuth
} = shuffleSlice.actions

export default shuffleSlice.reducer


