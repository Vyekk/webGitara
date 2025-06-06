import Logo from 'components/Logo/Logo';
import Modal from 'components/Modal/Modal';
import { SongsList } from 'components/SongsList/SongsList';
import Title from 'components/Title/Title';
import { useEffect, useState } from 'react';
import { Song } from 'types';
import styles from 'views/DashboardView/Dashboard.module.scss';
import { getTopRatedSongs } from 'utils/storage';

const DashboardView = () => {
    const [bestSongsList, setBestSongsList] = useState<Song[]>([]);

    const fetchSongsUserStorge = async () => {
        setBestSongsList(await getTopRatedSongs());
    };

    useEffect(() => {
        fetchSongsUserStorge();
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <Logo />
                <div className={styles.dashboardContentWrapper}>
                    <div className={styles.dashboardList}>
                        <Title tag="h2">Najpopularniejsze</Title>
                        <SongsList isVertical songs={bestSongsList} />
                    </div>
                    <div className={styles.dashboardList}>
                        <Title tag="h2">Ostatnio grane</Title>
                        <SongsList isVertical songs={bestSongsList} />
                    </div>
                    <div className={styles.dashboardList}>
                        <Title tag="h2">Instrukcja</Title>
                        <Modal isMax>
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
                                    opcjami. Jeśli uruchomiłeś utwór przez menu główne, za pomocą paska sterowania
                                    utworem możesz zacząć praktykę. W przypadku kliknięcia przycisku start, należy
                                    wybrać utwór poprzez kliknięcie w przycisk biblioteki, następnie przejść do
                                    biblioteki wszystkich utworów i wybranie konkretnego poprzez kliknięcie.
                                </li>
                                <li>Praktykuj grę na gitarze</li>
                            </ol>
                        </Modal>
                    </div>
                </div>
                <div className={styles.dashboardHintWrapper}>
                    <p className={styles.dashboardHint}>
                        Aby rozpocząć praktykę, wybierz utwór z listy najpopularniejszych lub ostatnio granych. Możesz
                        również dodać własny utwór do biblioteki, klikając przycisk poniżej.
                    </p>
                </div>
            </div>
        </>
    );
};

export default DashboardView;
