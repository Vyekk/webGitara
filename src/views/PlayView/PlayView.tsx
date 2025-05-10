import { useEffect, useContext, useRef, useState } from 'react';
import Section from 'components/Section/Section';
import styles from 'views/PlayView/PlayView.module.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardView from 'views/DashboardView/DashboardView';
import { GuitarView } from 'views/GuitarView/GuitarView';
import Modal from 'components/Modal/Modal';
import { ModalContext } from 'components/Modal/ModalContext';
import Toolbar from 'components/Toolbar/Toolbar';
import React from 'react';
interface ContextType {
    isFretboardReversed: boolean;
    setIsFretboardReversed: React.Dispatch<React.SetStateAction<boolean>>;
    songBpm: number;
    setSongBpm: React.Dispatch<React.SetStateAction<number>>;
}

export const Context = React.createContext<ContextType>({
    isFretboardReversed: false,
    setIsFretboardReversed: () => void 0,
    songBpm: 120,
    setSongBpm: () => void 0,
});

const PlayView: React.FC = () => {
    const { isModalOpen, closeModal, modalContent } = useContext(ModalContext);
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [isFretboardReversed, setIsFretboardReversed] = useState(false);
    const [songBpm, setSongBpm] = useState(120);

    useEffect(() => {
        const isFretboardReversedUser = localStorage.getItem('isFretboardReversed');
        if (isFretboardReversedUser) {
            setIsFretboardReversed(JSON.parse(isFretboardReversedUser));
        }
    }, []);

    useEffect(() => {
        if (!isModalOpen || !closeModal) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                toolbarRef.current &&
                !toolbarRef.current.contains(event.target as Node)
            ) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen, closeModal]);

    return (
        <Context.Provider value={{ isFretboardReversed, setIsFretboardReversed, songBpm, setSongBpm }}>
            <Section id={styles.playBackground}>
                {isModalOpen && (
                    <Modal ref={modalRef} onClose={closeModal}>
                        {modalContent}
                    </Modal>
                )}
                <Routes>
                    <Route path="dashboard" element={<DashboardView />} />
                    <Route path="guitar" element={<Navigate to="1" replace />} />
                    <Route path="guitar/:id" element={<GuitarView />} />
                </Routes>
                <Toolbar ref={toolbarRef} />
            </Section>
        </Context.Provider>
    );
};

export default PlayView;
