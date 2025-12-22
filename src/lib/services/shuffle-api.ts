import api from '../api'
import { TarotCategory, TarotCard, TarotSpeaker, TarotRequest, ApiResponse, PaginatedResponse } from '../types/shuffle'
import { AxiosRequestConfig } from 'axios'

export const shuffleApiService = {
  getTarotSpeaker: async (): Promise<ApiResponse<TarotSpeaker[]>> => {
    const response = await api.get('/tarot/speaker')
    return response.data
  },

  getTarotCategories: async (config?: AxiosRequestConfig): Promise<PaginatedResponse<TarotCategory>> => {
    const response = await api.get('/tarot/category', config)
    return response.data
  },

  getTarotCards: async (config?: AxiosRequestConfig): Promise<PaginatedResponse<TarotCard>> => {
    const response = await api.get('/tarot', config)
    return response.data
  },

  getTarotResponse: async ({ question, tarot_id, speaker_id, category_id }: TarotRequest['request']): Promise<ApiResponse<TarotRequest['response']>> => {
    try {
      const response = await api.post('/tarot', { tarot_id, question, speaker_id, tarot_category_id: category_id })
      return response.data
    } catch (error: any) {
      throw error
    }
  },

  getTarotById: async (lastTarotId: number): Promise<ApiResponse<TarotRequest['response']>> => {
    const response = await api.get(`/tarot/reading/${lastTarotId}`)
    return response.data
  },
}


