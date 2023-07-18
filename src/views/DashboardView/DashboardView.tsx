import Logo from 'components/Logo/Logo';
import Toolbar from 'components/Toolbar/Toolbar';
import styles from 'views/DashboardView/Dashboard.module.scss';

const DashboardView = () => {
    return (
        <>
            <Toolbar />
            <div className={styles.wrapper}>
                <Logo />
            </div>
        </>
    );
};

export default DashboardView;
