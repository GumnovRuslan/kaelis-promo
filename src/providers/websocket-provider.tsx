'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  PropsWithChildren,
} from 'react'
import { useRouter } from 'next/navigation'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { useAppDispatch, useAppSelector } from '@/store'
import { configurationService } from '@/lib/services/configuration-api'
import { sendWebsocketMessages } from '@/store/selectors/sendWebsocketMessage'
import { getGuestToken, getGuestId } from '@/lib/api'
import { DATA_TYPES_EVENTS } from '@/lib/types/websocket'

type ContextType = {
  close(): void
}

const Context = createContext<ContextType>({} as ContextType)

const WebsocketProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const guestId = useAppSelector(state => state.shuffle.guestId)
  const router = useRouter()

  const echoRef = useRef<any>(null)

  const close = () => {
    if (echoRef.current) {
      try {
        echoRef.current.disconnect?.()
      } catch (e) {
        console.warn('Echo disconnect error', e)
      }
      echoRef.current = null
    }
  }

  const initializeSocket = async () => {
    close()
    
    const storedGuestId = getGuestId()
    const currentGuestId = guestId || storedGuestId
    
    if (!currentGuestId) return

    try {
      const configuration = await configurationService.getConfiguration()
      const config = configuration.data.web_socket
      const token = getGuestToken()

      if (!token) return

      const bearerToken = `Bearer ${token}`

      if (typeof window === 'undefined') return

      if (typeof window !== 'undefined') {
        (window as any).Pusher = Pusher
      }

      const wsPort = Number(config.port) || 6001

      const options: any = {
        broadcaster: 'reverb',
        key: config.key,
        wsHost: config.host,
        wsPort: wsPort,
        wssPort: wsPort,
        forceTLS: true,
        enabledTransports: ['ws', 'wss'],
        auth: {
          headers: {
            Authorization: bearerToken,
          },
        },
      }

      const echo = new Echo(options)

      const channel = echo.channel(`guest.${currentGuestId}`)

      channel.listenToAll((event: DATA_TYPES_EVENTS, data: any) => {
        sendWebsocketMessages({ type: event, payload: data }, dispatch, router)
      })

      const pusherConnector = echo.connector as any
      pusherConnector?.pusher?.connection?.bind('connected', () => {
        sendWebsocketMessages({ type: DATA_TYPES_EVENTS.CONNECT }, dispatch, router)
      })

      pusherConnector?.pusher?.connection?.bind('answer', (data: any) => {
        sendWebsocketMessages({ type: DATA_TYPES_EVENTS.ANSWER, payload: data }, dispatch, router)
      })

      pusherConnector?.pusher?.connection?.bind('pong', () => {
        sendWebsocketMessages({ type: DATA_TYPES_EVENTS.PONG }, dispatch, router)
      })

      echoRef.current = echo
    } catch (error) {
      console.error('Error initializing WebSocket:', error)
    }
  }

  useEffect(() => {
    const storedGuestId = getGuestId()
    const currentGuestId = guestId || storedGuestId
    
    if (currentGuestId) {
      initializeSocket()
    }

    return () => {
      close()
    }
  }, [guestId])

  return <Context.Provider value={{ close }}>{children}</Context.Provider>
}

export const useWebsocketContext = () => useContext(Context)
export default WebsocketProvider

