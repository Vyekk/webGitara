import Section from 'components/Section/Section';
import styles from 'views/PlayView/PlayView.module.scss';
import { Route, Routes } from 'react-router-dom';
import DashboardView from 'views/DashboardView/DashboardView';
import { GuitarView } from 'views/GuitarView/GuitarView';
import Modal from 'components/Modal/Modal';
import { useContext } from 'react';
import { ModalContext } from 'components/Modal/ModalContext';

const PlayView = () => {
    const { isModalOpen, closeModal, modalContent } = useContext(ModalContext);
    return (
        <Section id={styles.playBackground}>
            {isModalOpen && <Modal onClose={closeModal}>{modalContent}</Modal>}
            <Routes>
                <Route path="dashboard" element={<DashboardView />}></Route>
                <Route path="guitar" element={<GuitarView />}></Route>
            </Routes>
        </Section>
    );
};

export default PlayView;
