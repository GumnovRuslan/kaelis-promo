import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { AppDispatch, shuffleActions } from '@/store'
import { DATA_TYPES_EVENTS, WebsocketEventPayload, Answer } from '@/lib/types/websocket'

export const sendWebsocketMessages = (
  data: WebsocketEventPayload,
  dispatch: AppDispatch,
  router: AppRouterInstance
) => {
  switch (data.type) {
    case DATA_TYPES_EVENTS.CONNECT:
      break

    case DATA_TYPES_EVENTS.ANSWER:
      const payload = data.payload as Answer
      console.log('WebSocket: ANSWER event received', payload)

      if (payload.sender_type === 'tarot') {
        console.log('WebSocket: Dispatching getTarotAnswerFromChat', payload.url_message)
        dispatch(shuffleActions.getTarotAnswerFromChat(payload.url_message))
        return
      }

      break

    case DATA_TYPES_EVENTS.UPGRADE_PLAN:
      break

    case DATA_TYPES_EVENTS.PONG:
      break

    default:
      console.log('Unhandled WS event:', data.type, data.payload)
      break
  }
}

export default sendWebsocketMessages

