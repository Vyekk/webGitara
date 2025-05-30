import Title from 'components/Title/Title';
import { useContext, useEffect, useRef, useState } from 'react';
import { Song, TabNote } from 'types';
import styles from 'views/GuitarView/GuitarView.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'components/Slider/Slider';
import { Link } from 'react-router-dom';
import SongControl from 'components/SongControl/SongControl';
import Fretboard from 'components/Fretboard/Fretboard';
import { Context } from 'views/PlayView/PlayView';
import { setupSamplePlayer, playNote } from 'utils/playNote';
import { start, Volume } from 'tone';
import { loadSongs } from 'utils/storage';

const GuitarView = () => {
    const [currentUrl, setCurrentUrl] = useState(window.location.href);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { songBpm, setSongBpm } = useContext(Context);
    const [songDefaultBpm, setSongDefaultBpm] = useState(120);
    const [currentStep, setCurrentStep] = useState(0);
    const [isVolumeMuted, setIsVolumeMuted] = useState(false);
    const songVolumeRef = useRef<Volume | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [song, setSong] = useState<Song | null>(null);
    const [isSongStopped, setIsSongStopped] = useState(false);
    const [isFretboardInitialized, setIsFretboardInitialized] = useState(false);
    const [infoToShow, setInfoToShow] = useState<{
        prevStep: TabNote[] | null;
        step: TabNote[] | null;
        nextStep: TabNote[] | null;
    }>();
    const { isFretboardReversed } = useContext(Context);

    useEffect(() => {
        setupSong();
        const volume = new Volume(0).toDestination();
        songVolumeRef.current = volume;
        setupSamplePlayer(volume);
    }, []);

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
        let nextStepInfo: TabNote[] | null = null;
        if (currentInfo && song && currentStep + 1 < song.tablature.length) {
            nextStepInfo = getCurrentStepInfo(currentStep + 1);
        }
        setInfoToShow((prev) => ({
            prevStep: prev?.step || null,
            step: currentInfo || null,
            nextStep: nextStepInfo,
        }));
    }, [song]);

    useEffect(() => {
        const currentInfo = getCurrentStepInfo(currentStep);
        let nextStepInfo: TabNote[] | null = null;
        if (song && currentInfo && currentStep + 1 < song.tablature.length) {
            nextStepInfo = getCurrentStepInfo(currentStep + 1);
        }
        setInfoToShow((prev) => ({
            prevStep: prev?.step || null,
            step: currentInfo || null,
            nextStep: nextStepInfo,
        }));
    }, [currentStep]);

    useEffect(() => {
        if (currentStep === 0) {
            handleClickStop();
        }
    }, [currentStep]);

    const getDurationInMs = (duration: string): number => {
        const beatDuration = 60000 / songBpm;
        switch (duration) {
            case '1n':
                return beatDuration * 4;
            case '2n':
                return beatDuration * 2;
            case '4n':
                return beatDuration;
            case '8n':
                return beatDuration / 2;
            case '16n':
                return beatDuration / 4;
            default:
                return beatDuration;
        }
    };

    const setupSong = () => {
        const fetchSong = async () => {
            const songs = await loadSongs();
            const songId = currentUrl.split('/').pop();
            const song = songs.find((song: Song) => song.id === Number(songId));
            if (!song) {
                navigate('/play/guitar/1');
                return;
            }
            setSong(song);
            setSongBpm(song.bpm);
            setSongDefaultBpm(song.bpm);
        };
        fetchSong();
    };

    const getCurrentStepInfo = (currentStep: number): TabNote[] | null => {
        const tablature = song?.tablature;
        if (!tablature || tablature.length === 0) {
            return null;
        }
        return tablature[currentStep] || null;
    };

    const playSong = () => {
        if (!song?.tablature || song.tablature.length === 0 || currentStep >= song.tablature.length - 1) {
            return;
        }

        handleClickStop();

        if (currentStep === 0) {
            const currentInfo = getCurrentStepInfo(currentStep);
            let nextStepInfo: TabNote[] | null = null;
            if (currentInfo && currentStep + 1 < song.tablature.length) {
                nextStepInfo = getCurrentStepInfo(currentStep + 1);
            }
            setInfoToShow((prev) => ({
                prevStep: prev?.step || null,
                step: currentInfo || null,
                nextStep: nextStepInfo,
            }));
        }

        const playNext = (stepIndex: number) => {
            if (!song || stepIndex >= song.tablature.length) {
                return;
            }

            setCurrentStep(stepIndex);

            const stepNotes = song.tablature[stepIndex];
            const durationStr =
                Array.isArray(stepNotes) && stepNotes.length > 0 && 'duration' in stepNotes[0]
                    ? (stepNotes[0] as TabNote).duration
                    : '4n';

            const delay = getDurationInMs(durationStr);
            const durationSec = delay / 1000;

            stepNotes.forEach(async (note) => {
                if (!note.rest) {
                    await playNote(note.guitarString, note.guitarFret, durationSec);
                }
            });

            timeoutRef.current = setTimeout(() => {
                if (stepIndex + 1 < song.tablature.length) {
                    playNext(stepIndex + 1);
                } else {
                    handleClickStop();
                }
            }, delay);
        };

        playNext(currentStep);
    };

    const handleClickPlay = async () => {
        await start();
        if (isSongStopped) {
            setIsSongStopped(false);
        }
        playSong();
    };

    const handleClickStop = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handlePreviousStep = () => {
        handleClickStop();
        setIsSongStopped(true);
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleNextStep = () => {
        handleClickStop();
        setIsSongStopped(true);
        setCurrentStep((prevStep) => Math.min(prevStep + 1, (song?.tablature?.length ?? 0) - 1 || prevStep));
    };

    const handleSliderChange = (value: number) => {
        handleClickStop();
        setIsSongStopped(true);
        setCurrentStep(value);
    };

    const handleRepeat = () => {
        handleClickStop();
        setCurrentStep(0);
    };

    const handleVolumeChange = () => {
        if (!songVolumeRef.current) {
            return;
        }
        if (isVolumeMuted) {
            setIsVolumeMuted(false);
            songVolumeRef.current.volume.value = 0;
        } else {
            setIsVolumeMuted(true);
            songVolumeRef.current.volume.value = -Infinity;
        }
    };

    return (
        <div>
            <div className={styles.linkWrapper}>
                <Link to="/play/dashboard"> &lt; powrót do dashboard</Link>
            </div>
            <div className={styles.wrapper}>
                <Title>{`${song?.songTitle ? song?.songTitle + ' - ' : 'Brak danego utworu'} ${
                    song?.author || ''
                }`}</Title>
            </div>
            <Fretboard
                numberOfStrings={6}
                numberOfFrets={24}
                notesToShow={infoToShow || { prevStep: null, step: null, nextStep: null }}
                isReversed={isFretboardReversed}
            />
            {song && <Slider max={song.tablature.length} value={currentStep} onChange={handleSliderChange} />}
            <SongControl
                onGoBack={handlePreviousStep}
                onPlay={handleClickPlay}
                onStop={handleClickStop}
                onForward={handleNextStep}
                onRepeat={handleRepeat}
                onVolumeChange={handleVolumeChange}
                defaultBpm={songDefaultBpm}
                currentStep={currentStep}
                songLength={song ? song.tablature.length : 0}
                isStop={
                    song && (currentStep === song.tablature.length - 1 || currentStep === 0 || isSongStopped)
                        ? true
                        : false
                }
            />
        </div>
    );
};

export { GuitarView };
