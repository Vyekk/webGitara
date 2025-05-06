import { useContext, useEffect, useState } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';
import { Context } from 'views/PlayView/PlayView';

interface SongControlProps {
    onGoBack: () => void;
    onPlay: () => void;
    onStop: () => void;
    onForward: () => void;
    onRepeat: () => void;
    defaultBpm: number;
    isStop?: boolean;
}

const SongControl = ({ onGoBack, onPlay, onStop, onForward, onRepeat, defaultBpm, isStop }: SongControlProps) => {
    const [activeButton, setActiveButton] = useState<'play' | 'stop' | null>(null);
    const { songBpm, setSongBpm } = useContext(Context);

    useEffect(() => {
        if (isStop) {
            setActiveButton('stop');
        }
    }, [isStop]);

    const handleButtonClick = (buttonName: 'play' | 'stop', action: () => void) => {
        setActiveButton(buttonName);
        action();
    };

    const handleAddBpm = () => {
        const newBpm = songBpm + 1;
        if (newBpm <= 300) {
            setSongBpm(newBpm);
            onStop();
            setActiveButton('stop');
        }
    };

    const handleSubstractBpm = () => {
        const newBpm = songBpm - 1;
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
            <div className={styles.songBpm}>
                <label htmlFor="songBpm">Bpm utworu:</label>
                <Button transparent onClick={handleSubstractBpm} className={styles.bpmControlButton}>
                    <FontAwesomeIcon icon={faMinus} />
                </Button>
                <div>{songBpm}</div>
                <Button transparent onClick={handleAddBpm} className={styles.bpmControlButton}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Button onClick={handleSetDefaultBpm}>Domyślne</Button>
            </div>
        </div>
    );
};

export default SongControl;
