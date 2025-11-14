'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

type ModalContentType = 'join' | 'test' | string;

type TPopupContext = {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  content: ModalContentType;
  setContent: (value: ModalContentType) => void;
};

const ModalContext = createContext<TPopupContext | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [content, setContent] = useState<ModalContentType>('join');

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);
  const toggleModal = () => setIsOpenModal((prev) => !prev);

  
  return (
    <ModalContext
      value={{
        isOpenModal,
        openModal,
        closeModal,
        toggleModal,
        content,
        setContent,
      }}
    >
      {children}
    </ModalContext>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a PopupProvider');
  }
  return context;
};