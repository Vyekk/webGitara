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
    const instrumentTuning = [4, 11, 7, 2, 9, 4];
    const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    useEffect(() => {
        showNotes(notesToShow || '');
    }, [notesToShow]);

    const showNotes = (info: string) => {
        console.log(info);
    };

    const generateNoteNames = (noteIndex: number) => {
        noteIndex = noteIndex % 12;
        const noteName = notesSharp[noteIndex];
        return noteName;
    };

    return (
        <div className={styles.fretboard}>
            {Array.from({ length: numberOfStrings }, (_, stringIndex) => (
                <div key={stringIndex} className={styles.string}>
                    {Array.from({ length: numberOfFrets + 1 }, (_, fretIndex) => (
                        <div
                            key={fretIndex}
                            className={styles.noteFret}
                            data-string={stringIndex + 1}
                            data-fret={fretIndex}
                            data-note={generateNoteNames(fretIndex + instrumentTuning[stringIndex])}
                        >
                            {singleFretMarkPositions.includes(fretIndex) && stringIndex === 0 && (
                                <div className={styles.singleFretmark}></div>
                            )}
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
