import Title from 'components/Title/Title';
import { useEffect, useRef, useState } from 'react';
import { Song } from 'types';
import styles from 'views/GuitarView/GuitarView.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'components/Slider/Slider';
import { Link } from 'react-router-dom';
import SongControl from 'components/SongControl/SongControl';
import Fretboard from 'components/Fretboard/Fretboard';

const GuitarView = () => {
    const songsData = localStorage.getItem('songs');
    const songs = songsData ? JSON.parse(songsData) : [];
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
    const [infoToShow, setInfoToShow] = useState<{
        prevStep: (number[] | number[][])[] | null;
        step: (number[] | number[][])[] | null;
        nextStep?: (number[] | number[][])[] | null;
    }>();

    useEffect(() => {
        setupSong();
    }, [currentUrl]);

    useEffect(() => {
        setCurrentUrl(location.pathname);
        setCurrentStep(0);
    }, [location]);

    useEffect(() => {
        if (!isFretboardInitialized) {
            setIsFretboardInitialized(true);
            return;
        }
        const currentInfo = getCurrentStepInfo(0);
        setInfoToShow((prev) => ({
            prevStep: prev?.step || null,
            step: currentInfo || null,
        }));
    }, [song]);

    useEffect(() => {
        if (isPlaybackInitialized) {
            const currentInfo = getCurrentStepInfo(currentStep);
            setInfoToShow((prev) => ({
                prevStep: prev?.step || null,
                step: currentInfo || null,
            }));
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
        };
        fetchSong();
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

        const info = currentTabulature;
        return info;
    };

    const playSong = () => {
        if (!song?.tabulature || song.tabulature.length === 0) {
            console.warn('Play is not possible: No tabulature available for the song.');
            return;
        }

        if (currentStep === 0) {
            const currentInfo = getCurrentStepInfo(currentStep);
            setInfoToShow((prev) => ({
                prevStep: prev?.step || null,
                step: currentInfo || null,
            }));
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
            <Fretboard
                numberOfStrings={6}
                numberOfFrets={24}
                notesToShow={infoToShow || { prevStep: null, step: null }}
            />
            <Slider max={song.tabulature.length} value={currentStep} onChange={handleSliderChange} />
            <SongControl
                onGoBack={handlePreviousStep}
                onPlay={handleClickPlay}
                onStop={handleClickStop}
                onForward={handleNextStep}
                isStop={currentStep === song.tabulature.length - 1 ? true : false}
            />
        </div>
    );
};

export { GuitarView };
