/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext } from 'react';

type ModalContextType = {
    modalContent: ReactNode | null;
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    setModal: (content: ReactNode) => void;
};

export const ModalContext = createContext<ModalContextType>({
    modalContent: null,
    isModalOpen: false,
    openModal: () => {},
    closeModal: () => {},
    setModal: () => {},
});
