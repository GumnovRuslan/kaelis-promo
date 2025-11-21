'use client'

import { ModalWrapper } from '@/components/ui'
import SubscribeForm from '../testModal/templates/form_practice'
import { useModalSubscribeContext } from '@/context/modalSubscribe'

const ModalSubscribe = () => {
  const {
    isOpenModal,
    closeModal
  } = useModalSubscribeContext()
  
  return (
    <ModalWrapper isShow={isOpenModal} handlerClose={closeModal}>
      <SubscribeForm/>
    </ModalWrapper>
  )
}

export default ModalSubscribe