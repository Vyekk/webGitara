import { useEffect, useContext, useRef, useState } from 'react';
import Section from 'components/Section/Section';
import styles from 'views/PlayView/PlayView.module.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardView from 'views/DashboardView/DashboardView';
import { GuitarView } from 'views/GuitarView/GuitarView';
import { TablatureEditorView } from 'views/TablatureEditorView/TablatureEditorView';
import Modal from 'components/Modal/Modal';
import { ModalContext } from 'components/Modal/ModalContext';
import Toolbar from 'components/Toolbar/Toolbar';
import React from 'react';
import storage from 'utils/storage';
import { SongsProvider } from 'context/SongsContext';
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
        const isFretboardReversedUser = storage.loadIsFretboardReversed();
        if (isFretboardReversedUser) {
            setIsFretboardReversed(isFretboardReversedUser);
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
        <SongsProvider>
            <Context.Provider value={{ isFretboardReversed, setIsFretboardReversed, songBpm, setSongBpm }}>
                <Section id={styles.playBackground}>
                    {isModalOpen && (
                        <Modal ref={modalRef} onClose={closeModal}>
                            {modalContent}
                        </Modal>
                    )}
                    <Routes>
                        <Route path="/" element={<Navigate to="dashboard" replace />} />
                        <Route path="dashboard" element={<DashboardView />} />
                        <Route path="guitar" element={<Navigate to="1" replace />} />
                        <Route path="guitar/:id" element={<GuitarView />} />
                        <Route path="edit" element={<TablatureEditorView />} />
                        <Route path="edit/:id" element={<TablatureEditorView />} />
                    </Routes>
                    <Toolbar ref={toolbarRef} />
                </Section>
            </Context.Provider>
        </SongsProvider>
    );
};

export default PlayView;
