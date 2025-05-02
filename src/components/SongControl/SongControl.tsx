import { useEffect, useState } from 'react';
import styles from './SongControl.module.scss';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep, faForwardStep, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

interface SongControlProps {
    onGoBack: () => void;
    onPlay: () => void;
    onStop: () => void;
    onForward: () => void;
    isStop?: boolean;
}

const SongControl = ({ onGoBack, onPlay, onStop, onForward, isStop }: SongControlProps) => {
    const [activeButton, setActiveButton] = useState<'play' | 'stop' | null>(null);

    useEffect(() => {
        if (isStop) {
            setActiveButton('stop');
        }
    }, [isStop]);

    const handleButtonClick = (buttonName: 'play' | 'stop', action: () => void) => {
        setActiveButton(buttonName);
        action();
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
        </div>
    );
};

export default SongControl;
