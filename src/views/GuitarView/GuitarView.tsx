import Title from 'components/Title/Title';
import { useEffect, useRef, useState } from 'react';
import { Song } from 'types';
import styles from 'views/GuitarView/GuitarView.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'components/Slider/Slider';
import { Link } from 'react-router-dom';
import SongControl from 'components/SongControl/SongControl';

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
    const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleFretMarkPositions = [12, 24];

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
        if (!fretboard) return;

        fretboard.innerHTML = '';

        const numberOfStrings = 6;
        const numberOfFrets = 12;

        const fragment = document.createDocumentFragment();

        for (let stringNumber = 1; stringNumber <= numberOfStrings; stringNumber++) {
            const string = document.createElement('div');
            string.classList.add(styles.string);

            for (let fretNumber = 0; fretNumber <= numberOfFrets; fretNumber++) {
                const noteFret = document.createElement('div');
                noteFret.classList.add(styles.noteFret);

                noteFret.dataset.string = String(stringNumber);
                noteFret.dataset.fret = String(fretNumber);

                if (stringNumber === 1) {
                    if (singleFretMarkPositions.includes(fretNumber)) {
                        noteFret.classList.add(styles.singleFretmark);
                    }

                    if (doubleFretMarkPositions.includes(fretNumber)) {
                        const doubleFretMark = document.createElement('div');
                        doubleFretMark.classList.add(styles.doubleFretmark);
                        noteFret.appendChild(doubleFretMark);
                    }
                }

                string.appendChild(noteFret);
            }

            fragment.appendChild(string);
        }

        fretboard.appendChild(fragment);
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
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
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
        setIsPlaybackInitialized((prev) => {
            if (!prev) {
                return true;
            }
            return prev;
        });
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
            <div className={styles.fretboard} ref={fretboardRef}></div>
            <Slider max={song.tabulature.length} value={currentStep} onChange={handleSliderChange} />
            <SongControl
                onGoBack={handlePreviousStep}
                onPlay={handleClickPlay}
                onStop={handleClickStop}
                onForward={handleNextStep}
            />
        </div>
    );
};
export { GuitarView };
