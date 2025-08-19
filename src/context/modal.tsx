'use client'

import { ReactNode, createContext, useContext, useState } from 'react';


type TPopupContext = {
  isOpenModalJoin: boolean;
  openModalJoin: () => void;
  closeModalJoin: () => void;
  toggleModalJoin: () => void;
  isOpenModalEmail: boolean;
  closeModalEmail: () => void;
};

const ModalContext = createContext<TPopupContext | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModalJoin, setIsOpenModalJoin] = useState(false);
  const [isOpenModalEmail, setIsOpenModalEmail] = useState(false);

  const openModalJoin = () => setIsOpenModalJoin(true);
  const closeModalJoin = () => setIsOpenModalJoin(false);
  const toggleModalJoin = () => setIsOpenModalJoin((prev) => !prev);

  const closeModalEmail = () => setIsOpenModalEmail(false);
  
  return (
    <ModalContext
      value={{
        isOpenModalJoin,
        openModalJoin,
        closeModalJoin,
        toggleModalJoin,
        isOpenModalEmail,
        closeModalEmail,
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