'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

type TPopupSubscribeContext = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

const ModalSubscribeContext = createContext<TPopupSubscribeContext | undefined>(undefined);

export const ModalSubscribeProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const toggleModal = () => setIsOpenModal((prev) => !prev);
  
  return (
    <ModalSubscribeContext
      value={{
        isOpenModal,
        openModal,
        closeModal,
        toggleModal,
      }}
    >
      {children}
    </ModalSubscribeContext>
  );
};

export const useModalSubscribeContext = () => {
  const context = useContext(ModalSubscribeContext);
  if (!context) {
    throw new Error('useModalSubscribeContext must be used within a PopupProvider');
  }
  return context;
};