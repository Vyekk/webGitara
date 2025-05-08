import { useContext, useEffect, useRef, useState } from 'react';
import styles from './SongControl.module.scss';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBackwardStep,
    faForwardStep,
    faPause,
    faPlay,
    faRotateLeft,
    faMinus,
    faPlus,
    faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import { Context } from 'views/PlayView/PlayView';
import { useHoldPress } from 'hooks/useHoldPress';

interface SongControlProps {
    onGoBack: () => void;
    onPlay: () => void;
    onStop: () => void;
    onForward: () => void;
    onRepeat: () => void;
    defaultBpm: number;
    isStop?: boolean;
    songLength: number;
    currentStep: number;
}

const SongControl = ({
    onGoBack,
    onPlay,
    onStop,
    onForward,
    onRepeat,
    songLength,
    currentStep,
    defaultBpm,
    isStop,
}: SongControlProps) => {
    const [activeButton, setActiveButton] = useState<'play' | 'stop' | null>(null);
    const { songBpm, setSongBpm } = useContext(Context);
    const songBpmRef = useRef(songBpm);

    useEffect(() => {
        if (isStop) {
            setActiveButton('stop');
        }
    }, [isStop]);

    useEffect(() => {
        songBpmRef.current = songBpm;
    }, [songBpm]);

    const handleButtonClick = (buttonName: 'play' | 'stop', action: () => void) => {
        if (currentStep >= songLength - 1) {
            return;
        }
        setActiveButton(buttonName);
        action();
    };

    const handleAddBpm = () => {
        const newBpm = songBpmRef.current + 1;
        if (newBpm <= 300) {
            setSongBpm(newBpm);
            onStop();
            setActiveButton('stop');
        }
    };

    const handleSubstractBpm = () => {
        const newBpm = songBpmRef.current - 1;
        if (newBpm >= 30) {
            setSongBpm(newBpm);
            onStop();
            setActiveButton('stop');
        }
    };

    const handleSetDefaultBpm = () => {
        setSongBpm(defaultBpm);
        onStop();
        setActiveButton('stop');
    };

    const {
        onMouseDown: minusMouseDown,
        onMouseUp: minusMouseUp,
        onMouseLeave: minusMouseLeave,
    } = useHoldPress(handleSubstractBpm);

    const {
        onMouseDown: plusMouseDown,
        onMouseUp: plusMouseUp,
        onMouseLeave: plusMouseLeave,
    } = useHoldPress(handleAddBpm);

    return (
        <div className={styles.songControl}>
            <Button className={styles.backwardButton} onClick={onGoBack} transparent title="Cofnij">
                <FontAwesomeIcon icon={faBackwardStep} />
            </Button>
            <Button
                className={`${styles.playButton} ${activeButton === 'play' ? styles.activeControl : ''}`}
                onClick={() => handleButtonClick('play', onPlay)}
                transparent
                title="Odtwórz"
            >
                <FontAwesomeIcon icon={faPlay} />
            </Button>
            <Button
                className={`${styles.stopButton} ${activeButton === 'stop' ? styles.activeControl : ''}`}
                onClick={() => handleButtonClick('stop', onStop)}
                transparent
                title="Stop"
            >
                <FontAwesomeIcon icon={faPause} />
            </Button>
            <Button className={styles.forwardButton} onClick={onForward} transparent title="Naprzód">
                <FontAwesomeIcon icon={faForwardStep} />
            </Button>
            <Button className={styles.repeatButton} onClick={onRepeat} transparent title="Resetuj">
                <FontAwesomeIcon icon={faRotateLeft} />
            </Button>
            <Button className={styles.soundButton} transparent>
                <FontAwesomeIcon icon={faVolumeHigh} />
            </Button>
            <div className={styles.songBpm}>
                <label htmlFor="songBpm">Bpm utworu:</label>
                <Button
                    transparent
                    onMouseDown={minusMouseDown}
                    onMouseUp={minusMouseUp}
                    onMouseLeave={minusMouseLeave}
                    className={styles.bpmControlButton}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </Button>
                <div className={styles.songBpmWrapper}>{songBpm}</div>
                <Button
                    transparent
                    onMouseDown={plusMouseDown}
                    onMouseUp={plusMouseUp}
                    onMouseLeave={plusMouseLeave}
                    className={styles.bpmControlButton}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Button className={styles.defaultButton} transparent onClick={handleSetDefaultBpm}>
                    Domyślne
                </Button>
            </div>
        </div>
    );
};

export default SongControl;
