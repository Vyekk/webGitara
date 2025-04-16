import { useState } from 'react';
import styles from './SongControl.module.scss';
import Button from 'components/Button/Button';

interface SongControlProps {
    onGoBack: () => void;
    onPlay: () => void;
    onStop: () => void;
    onForward: () => void;
}

const SongControl = ({ onGoBack, onPlay, onStop, onForward }: SongControlProps) => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: string, action: () => void) => {
        setActiveButton(buttonName);
        action();
    };

    return (
        <div className={styles.songControl}>
            <Button
                className={`${styles.goBackButton} ${activeButton === 'goBack' ? styles.activeControl : ''}`}
                onClick={() => handleButtonClick('goBack', onGoBack)}
                transparent
                title="Cofnij"
            ></Button>
            <Button
                className={`${styles.playButton} ${activeButton === 'play' ? styles.activeControl : ''}`}
                onClick={() => handleButtonClick('play', onPlay)}
                transparent
                title="Odtwórz"
            ></Button>
            <Button
                className={`${styles.stopButton} ${activeButton === 'stop' ? styles.activeControl : ''}`}
                onClick={() => handleButtonClick('stop', onStop)}
                transparent
                title="Stop"
            ></Button>
            <Button
                className={`${styles.forwardButton} ${activeButton === 'forward' ? styles.activeControl : ''}`}
                onClick={() => handleButtonClick('forward', onForward)}
                transparent
                title="Naprzód"
            ></Button>
        </div>
    );
};

export default SongControl;
