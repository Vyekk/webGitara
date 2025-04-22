import { useEffect, useContext, useRef } from 'react';
import Section from 'components/Section/Section';
import styles from 'views/PlayView/PlayView.module.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardView from 'views/DashboardView/DashboardView';
import { GuitarView } from 'views/GuitarView/GuitarView';
import Modal from 'components/Modal/Modal';
import { ModalContext } from 'components/Modal/ModalContext';
import Toolbar from 'components/Toolbar/Toolbar';

const PlayView: React.FC = () => {
    const { isModalOpen, closeModal, modalContent } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!isModalOpen || !closeModal) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen, closeModal]);

    return (
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
            <Toolbar />
        </Section>
    );
};

export default PlayView;
