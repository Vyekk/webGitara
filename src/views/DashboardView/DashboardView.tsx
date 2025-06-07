import Logo from 'components/Logo/Logo';
import Modal from 'components/Modal/Modal';
import { SongsList } from 'components/SongsList/SongsList';
import Title from 'components/Title/Title';
import { useEffect, useState } from 'react';
import { Song } from 'types';
import styles from 'views/DashboardView/Dashboard.module.scss';
import { useSongs } from 'context/SongsContext';
import { useLocation } from 'react-router';

const DashboardView = () => {
    const [bestSongsList, setBestSongsList] = useState<Song[]>([]);
    const { getTopRated } = useSongs();
    const location = useLocation();

    const fetchSongsUserStorge = async () => {
        if (getTopRated) {
            setBestSongsList((await getTopRated()) || []);
        } else {
            setBestSongsList([]);
        }
    };

    useEffect(() => {
        fetchSongsUserStorge();
    }, [location]);

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
                                    utwory. W celu praktyki kliknij utwór lub wybierz przycisk biblioteki na pasku
                                    zadań, aby wybrać utwór z listy. W bibliotece możesz również oceniać utwory, dodawać
                                    komentarze, oraz dodać je do ulubionych w celu łatwiejszego wyszukiwania.
                                </li>
                                <li>
                                    Po wybraniu utworu zobaczysz swoją wirtualną gitarę wraz z kontrolkami do sterowania
                                    utworem. Teraz możesz dostosować tempo utworu, przewijać go i sterować. Na pasku
                                    zadań posiadasz również przycisk do dodawania własnych utworów do biblioteki. Po
                                    jego naciśnięciu otworzy się widok tabulatury, którą możesz edytować, dostosować
                                    domyślne tempo, dobrać odpowiednie wartości rytmiczne. Po zapisaniu utworu będzie on
                                    dostępny w ogólnej bibliotece oraz w zakładce moje utwory, w której możesz dalej go
                                    edytować lub usunąć.
                                </li>
                                <li>Baw się dobrze i praktykuj grę na gitarze</li>
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
