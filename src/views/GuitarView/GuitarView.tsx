import Toolbar from 'components/Toolbar/Toolbar';
import { useEffect, useRef } from 'react';
import styles from 'views/GuitarView/GuitarView.module.scss';

const GuitarView = () => {
    const fretboardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setupFretboard();
    }, []);

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

    return (
        <div>
            <Toolbar />
            <div className={styles.fretboard} ref={fretboardRef}></div>
        </div>
    );
};
export { GuitarView };
