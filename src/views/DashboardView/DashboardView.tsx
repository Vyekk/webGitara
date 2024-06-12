import Logo from 'components/Logo/Logo';
import Modal from 'components/Modal/Modal';
import Title from 'components/Title/Title';
import Toolbar from 'components/Toolbar/Toolbar';
import styles from 'views/DashboardView/Dashboard.module.scss';

const DashboardView = () => {
    return (
        <>
            <Toolbar />
            <div className={styles.wrapper}>
                <Logo />
                <div className={styles.dashboardContentWrapper}>
                    <div className={styles.dashboardContent}>
                        <h1>sdfsd</h1>
                    </div>
                    <Modal>
                        <Title tag="h2">Instrukcja</Title>
                        <p>
                            Witaj w aplikacji webGitara! Aby zacząć praktykę grania na gitarze zastosuj się do
                            poniższych kroków:
                        </p>
                        <ol className={styles.manualList}>
                            <li>
                                Na ekranie głównym możesz wybrać najpopularniejsze lub ostatnio grane przez siebie
                                utwory. W celu praktyki kliknij na utwór lub wybierz przycisk play na pasku zadań.
                            </li>
                            <li>
                                Po wybraniu utworu zobaczysz swoją wirtualną gitarę oraz pasek zadań z dodatkowymi
                                opcjami. Jeśli uruchomiłeś utwór przez menu główne, za pomocą paska sterowania utworem
                                możesz zacząć praktykę. W przypadku kliknięcia przycisku start, należy wybrać utwór
                                poprzez kliknięcie w przycisk biblioteki, następnie przejść do biblioteki wszystkich
                                utworów i wybranie konkretnego poprzez kliknięcie.
                            </li>
                            <li>Praktykuj grę na gitarze</li>
                        </ol>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default DashboardView;
