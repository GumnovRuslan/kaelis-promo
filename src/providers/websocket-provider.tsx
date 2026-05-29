'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  PropsWithChildren,
  useCallback,
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
  close(): Promise<void>
}

const Context = createContext<ContextType>({} as ContextType)

const WebsocketProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const guestId = useAppSelector(state => state.shuffle.guestId)
  const router = useRouter()

  const echoRef = useRef<any>(null)

  const close = useCallback(async () => {
    try {
      if (!echoRef.current) {
        return;
      }

      console.log('%c[WS] disconnect', 'color: red;');

      echoRef.current.disconnect();

      echoRef.current = null;
    } catch (error) {
      console.error('[WS] close error', error);
    }
  }, []);

  const initializeSocket = async () => {
    await close()

    const storedGuestId = getGuestId()
    const currentGuestId = guestId || storedGuestId

    if (!currentGuestId) return

    try {
      const configuration = await configurationService.getConfiguration()
      const config = configuration.data.web_socket
      const token = getGuestToken()

      console.log(`%cInitializing WebSocket with config:`, 'color: yellow;', config)

      if (!token || typeof window === 'undefined') return

      ;(window as any).Pusher = Pusher

      const wsPort = Number(config.port ?? 443) || 6001

      const echo = new Echo({
        broadcaster: 'reverb',
        key: config.key ?? 'wljqnbllbgh3lebept8s',
        wsHost: config.host ?? 'stagtest.kaelisai.com', 
        withCredentials: true,
        authEndpoint: config.auth ?? 'https://stagtest.kaelisai.com/broadcasting/auth',
        wsPort,
        wssPort: wsPort,
        forceTLS: true,
        enabledTransports: ['ws', 'wss'],
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      const channel = echo.private(`guest.${currentGuestId}`)

      channel.listenToAll((event: DATA_TYPES_EVENTS, data: any) => {
        sendWebsocketMessages(
          { type: event, payload: data },
          dispatch,
          router
        )
      })

      const connector = echo.connector as any
      const connection = connector?.pusher?.connection

      connection?.bind('connected', () => {
        sendWebsocketMessages(
          { type: DATA_TYPES_EVENTS.CONNECT },
          dispatch,
          router
        )
      })

      connection?.bind('disconnected', () => {
        console.log('Socket disconnected')
      })

      connection?.bind('error', (err: any) => {
        console.error('Socket error:', err)
      })

      connector?.pusher?.connection?.bind('pong', () => {
        sendWebsocketMessages(
          { type: DATA_TYPES_EVENTS.PONG },
          dispatch,
          router
        )
      })

      connector?.pusher?.connection?.bind('answer', (data: any) => {
        sendWebsocketMessages(
          { type: DATA_TYPES_EVENTS.ANSWER, payload: data },
          dispatch,
          router
        )
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

