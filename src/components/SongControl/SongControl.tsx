import { useContext, useEffect, useState } from 'react';
import styles from './SongControl.module.scss';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Context } from 'views/PlayView/PlayView';

interface SongControlProps {
    onGoBack: () => void;
    onPlay: () => void;
    onStop: () => void;
    onForward: () => void;
    isStop?: boolean;
}

const SongControl = ({ onGoBack, onPlay, onStop, onForward, isStop }: SongControlProps) => {
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

    const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const bpmValue = parseInt(event.target.value, 10);
        if (!isNaN(bpmValue) && bpmValue >= 30 && bpmValue <= 300) {
            setSongBpm(bpmValue);
            onStop();
            setActiveButton('stop');
        }
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
            <div className={styles.songBpm}>
                <label htmlFor="songBpm">Bpm utworu:</label>
                <input id="songBpm" value={songBpm} type="number" onChange={handleBpmChange} />
                <Button>Default</Button>
            </div>
        </div>
    );
};

export default SongControl;
