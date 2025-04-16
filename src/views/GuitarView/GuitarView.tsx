import Title from 'components/Title/Title';
import Toolbar from 'components/Toolbar/Toolbar';
import { useEffect, useRef, useState } from 'react';
import { Song } from 'types';
import styles from 'views/GuitarView/GuitarView.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import Slider from 'components/Slider/Slider';
import { Link } from 'react-router-dom';

const GuitarView = () => {
    const songsData = localStorage.getItem('songs');
    const songs = songsData ? JSON.parse(songsData) : [];
    const fretboardRef = useRef<HTMLDivElement | null>(null);
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const [currentStep, setCurrentStep] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [song, setSong] = useState<Song>(() => {
        const songId = currentUrl.split('/').pop();
        return songs.find((song: Song) => song.id === Number(songId)) || null;
    });
    const [isFretboardInitialized, setIsFretboardInitialized] = useState(false);
    const [isPlaybackInitialized, setIsPlaybackInitialized] = useState(false);

    useEffect(() => {
        setupSong();
    }, [currentUrl]);

    // Inicjalizacja fretboardu po załadowaniu komponentu
    useEffect(() => {
        if (!isFretboardInitialized) {
            setIsFretboardInitialized(true);
            return;
        }
        console.log(getCurrentStepInfo(0));
    }, [song]);

    useEffect(() => {
        setCurrentUrl(location.pathname);
        setCurrentStep(0);
    }, [location]);

    // Ustawienie fretboardu po zmianie kroku
    useEffect(() => {
        if (isPlaybackInitialized) {
            console.log(getCurrentStepInfo(currentStep));
        }
    }, [currentStep]);

    const setupSong = () => {
        const fetchSong = async () => {
            const songId = currentUrl.split('/').pop();
            const song = songs.find((song: Song) => song.id === Number(songId));
            if (!song) {
                navigate('/play/guitar/1');
                return;
            }
            setSong(song);
            setupFretboard();
        };
        fetchSong();
    };

    const setupFretboard = () => {
        const fretboard = fretboardRef.current;
        if (!fretboard) {
            return; // Wyjdź jeśli fretboard nie jest dostępny
        }
        fretboard.innerHTML = '';
        const numberOfStrings = 6;
        const numberOfFrets = 12;
        // Dodaj struny do fretboard
        for (let i = 0; i < numberOfStrings; i++) {
            const string = document.createElement('div');
            string.classList.add(styles.string);
            fretboard.appendChild(string);

            // Stwórz progi
            for (let fret = 0; fret <= numberOfFrets; fret++) {
                const noteFret = document.createElement('div');
                noteFret.classList.add(styles.noteFret);
                string.appendChild(noteFret);
            }
        }
    };

    const getCurrentStepInfo = (currentStep: number) => {
        const tabulature = song?.tabulature;
        if (!tabulature || tabulature.length === 0) {
            return null;
        }
        const currentTabulature = tabulature[currentStep];
        if (!currentTabulature) {
            return null;
        }

        let info = '';
        if (currentTabulature.length === 1) {
            const [[string, fret]] = currentTabulature;
            info = `Play string ${string} on fret ${fret}\n`;
        } else {
            currentTabulature.forEach(([string, fret]) => {
                info += `Play string ${string} on fret ${fret}\n`;
            });
            info += `in the same time\n`;
        }
        return info;
    };

    const playSong = () => {
        if (!song?.tabulature || song.tabulature.length === 0) {
            console.warn('Play is not possible: No tabulature available for the song.');
            return;
        }

        if (currentStep === 0) {
            // Wyświetlenie pierwszego kroku w sekwencji
            console.log(getCurrentStepInfo(currentStep));
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep + 1 >= song.tabulature.length) {
                    clearInterval(intervalRef.current!);
                    return prevStep;
                }
                return prevStep + 1;
            });
        }, 1000);
    };

    const handleClickPlay = () => {
        setIsPlaybackInitialized(true);
        playSong();
    };

    const handleClickStop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleNextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, song.tabulature.length - 1));
    };

    const handleSliderChange = (value: number) => {
        setCurrentStep(value);
    };

    return (
        <div>
            <div className={styles.linkWrapper}>
                <Link to="/play/dashboard"> &lt; powrót do dashboard</Link>
            </div>
            <div className={styles.wrapper}>
                <Title>{`${song?.songTitle} - ${song?.author}`}</Title>
            </div>
            <Toolbar />
            <div className={styles.fretboard} ref={fretboardRef}></div>
            <Slider max={song.tabulature.length} value={currentStep} onChange={handleSliderChange} />
            <div className={styles.songControl}>
                <Button
                    className={styles.goBackButton}
                    onClick={handlePreviousStep}
                    transparent
                    title="Cofnij"
                ></Button>
                <Button className={styles.playButton} onClick={handleClickPlay} transparent title="Odtwórz"></Button>
                <Button className={styles.stopButton} onClick={handleClickStop} transparent title="Stop"></Button>
                <Button className={styles.forwardButton} onClick={handleNextStep} transparent title="Naprzód"></Button>
            </div>
        </div>
    );
};
export { GuitarView };
