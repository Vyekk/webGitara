import { useState } from 'react';
import { ModalContext } from 'components/Modal/ModalContext';

import { ReactNode } from 'react';

const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
