import Section from 'components/Section/Section';
import styles from 'views/PlayView/PlayView.module.scss';
import { Route, Routes } from 'react-router-dom';
import DashboardView from 'views/DashboardView/DashboardView';

const PlayView = () => {
    return (
        <Section id={styles.playBackground}>
            <Routes>
                <Route path="dashboard" element={<DashboardView />}></Route>
            </Routes>
        </Section>
    );
};

export default PlayView;
