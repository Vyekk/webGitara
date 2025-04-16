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
    const [activeButton, setActiveButton] = useState<'play' | 'stop' | null>(null);

    const handleButtonClick = (buttonName: 'play' | 'stop', action: () => void) => {
        setActiveButton(buttonName);
        action();
    };

    return (
        <div className={styles.songControl}>
            <Button className={styles.goBackButton} onClick={onGoBack} transparent title="Cofnij"></Button>
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
            <Button className={styles.forwardButton} onClick={onForward} transparent title="Naprzód"></Button>
        </div>
    );
};

export default SongControl;
