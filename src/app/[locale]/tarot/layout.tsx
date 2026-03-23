'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import WebsocketProvider from "@/providers/websocket-provider"
import { Loader } from '@/components/sections'
import { useTranslations } from 'next-intl'

const  LayoutCategories = ({children}: {children: React.ReactNode}) => {
  const t = useTranslations('CategoriesPage.loader')
  
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader text={t('load')}/>} persistor={persistor}>
      <WebsocketProvider>
        {children}
      </WebsocketProvider>
      </PersistGate>
    </Provider>
  )
}

export default LayoutCategories
