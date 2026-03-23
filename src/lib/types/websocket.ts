export type WebSocketConfiguration = {
  key: string
  host: string
  port: string
  auth: string
  tls: string
}

export type Configuration = {
  web_socket: WebSocketConfiguration
}

export enum DATA_TYPES_EVENTS {
  CONNECT = 'connect',
  PONG = 'pong',
  ANSWER = '.answer',
  UPGRADE_PLAN = 'upgrade-plan'
}

export type WebsocketEventPayload = {
  type: DATA_TYPES_EVENTS
  message?: string
  payload?: unknown
}

export type Answer = {
  url_message: string
  sender_id: number
  sender_type: 'tarot' | 'natal_chart' | 'fate_matrix'
}

