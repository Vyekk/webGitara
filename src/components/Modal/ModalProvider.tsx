import { useState } from 'react';
import { ModalContext } from 'components/Modal/ModalContext';

import { ReactNode } from 'react';

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode>();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const setModal = (content: ReactNode) => {
        setModalContent(content);
    };

    return (
        <ModalContext.Provider value={{ modalContent, isModalOpen, openModal, closeModal, setModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
