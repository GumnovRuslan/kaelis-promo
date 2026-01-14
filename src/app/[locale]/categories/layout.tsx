'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import WebsocketProvider from "@/providers/websocket-provider"

const  LayoutCategories = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <WebsocketProvider>
        {children}
      </WebsocketProvider>
      </PersistGate>
    </Provider>
  )
}

export default LayoutCategories
