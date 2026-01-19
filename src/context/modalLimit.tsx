'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

type TModalLimitContext = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

const ModalLimitContext = createContext<TModalLimitContext | undefined>(undefined);

export const ModalLimitProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const toggleModal = () => setIsOpenModal((prev) => !prev);
  
  return (
    <ModalLimitContext
      value={{
        isOpenModal,
        openModal,
        closeModal,
        toggleModal,
      }}
    >
      {children}
    </ModalLimitContext>
  );
};

export const useModalLimitContext = () => {
  const context = useContext(ModalLimitContext);
  if (!context) {
    throw new Error('useModalSubscribeContext must be used within a PopupProvider');
  }
  return context;
};