import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { TarotCategory } from './types/shuffle'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.kaelisai.com/api' 

const GUEST_TOKEN_KEY = 'guestToken'
const GUEST_ID_KEY = 'guestId'

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken') || localStorage.getItem(GUEST_TOKEN_KEY)
  }
  return null
}

export const getGuestToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(GUEST_TOKEN_KEY)
  }
  return null
}

export const getGuestId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(GUEST_ID_KEY)
  }
  return null
}

export const setGuestAuth = (token: string, guestId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GUEST_TOKEN_KEY, token)
    localStorage.setItem(GUEST_ID_KEY, guestId)
  }
}

export const getCategories = async (): Promise<TarotCategory[]> => {
  try {
    const response = await api.get('/tarot/category');
    return response.data.data;
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    return [];
  }
};

const getLanguage = (): string => {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    const pathSegments = pathname.split('/').filter(Boolean)
    
    const locales = ['en', 'ru', 'ua']
    const localeFromUrl = pathSegments.find(segment => locales.includes(segment))
    
    if (localeFromUrl) {
      return localeFromUrl === 'ua' ? 'uk' : localeFromUrl
    }
    
    const localeFromStorage = localStorage.getItem('locale')
    if (localeFromStorage) {
      return localeFromStorage === 'ua' ? 'uk' : localeFromStorage
    }
    
    return 'en'
  }
  return 'en'
}

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken()
    const language = getLanguage();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.headers) {
      config.headers['Accept-Language'] = language
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api


