import api from '../api'
import { Configuration } from '../types/websocket'
import { ApiResponse } from '../types/shuffle'

let configuration: Configuration | null = null
let configurationPromise: Promise<ApiResponse<Configuration>> | null = null

export const configurationService = {
  getConfiguration: async (): Promise<ApiResponse<Configuration>> => {
    if (configuration) {
      return {
        data: configuration,
        success: true
      } as ApiResponse<Configuration>
    }

    if (configurationPromise) {
      return configurationPromise
    }

    configurationPromise = (async () => {
      try {
        const response = await api.get('/configuration')
        configuration = response.data.data || response.data
        return {
          data: configuration!,
          success: true
        } as ApiResponse<Configuration>
      } catch (error: any) {
        configurationPromise = null
        throw error
      }
    })()

    return configurationPromise
  }
}

