import React, { useEffect } from 'react';
import styles from 'components/Fretboard/Fretboard.module.scss';

interface FretboardProps {
    numberOfStrings: number;
    numberOfFrets: number;
    notesToShow?: string | null;
}

const Fretboard: React.FC<FretboardProps> = ({ numberOfStrings, numberOfFrets, notesToShow }) => {
    const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleFretMarkPositions = [12, 24];

    useEffect(() => {
        showNotes(notesToShow || '');
    }, [notesToShow]);

    const showNotes = (info: string) => {
        console.log(info);
    };

    return (
        <div className={styles.fretboard}>
            {Array.from({ length: numberOfStrings }, (_, stringIndex) => (
                <div key={stringIndex} className={styles.string}>
                    {Array.from({ length: numberOfFrets + 1 }, (_, fretIndex) => (
                        <div
                            key={fretIndex}
                            className={`${styles.noteFret} ${
                                singleFretMarkPositions.includes(fretIndex) && stringIndex === 0
                                    ? styles.singleFretmark
                                    : ''
                            }`}
                            data-string={stringIndex + 1}
                            data-fret={fretIndex}
                        >
                            {doubleFretMarkPositions.includes(fretIndex) && stringIndex === 0 && (
                                <div className={styles.doubleFretmark}></div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Fretboard;
