import React, { useEffect, useLayoutEffect } from 'react';
import { TabNote } from 'types';
import styles from 'components/Fretboard/Fretboard.module.scss';

interface FretboardProps {
    numberOfStrings: number;
    numberOfFrets: number;
    notesToShow: {
        prevStep: TabNote[] | null;
        step: TabNote[] | null;
        nextStep: TabNote[] | null;
    };
}

const Fretboard: React.FC<FretboardProps> = ({ numberOfStrings, numberOfFrets, notesToShow }) => {
    const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleFretMarkPositions = [12, 24];
    const instrumentTuning = [4, 11, 7, 2, 9, 4];
    const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const stringNames = ['E', 'A', 'D', 'G', 'B', 'E'];

    useEffect(() => {
        showStringsNames();
    }, []);

    useLayoutEffect(() => {
        showNotes(notesToShow);
    }, [notesToShow]);

    const showStringsNames = () => {
        const stringElements = document.querySelectorAll(`.${styles.string}`);
        stringElements.forEach((_, index) => {
            const noteName = stringNames[index];
            const noteElement = document.querySelector(`[data-string="${index + 1}"][data-fret="0"]`) as HTMLElement;
            noteElement.innerText = noteName;
        });
    };

    const showNotes = (info: { prevStep: TabNote[] | null; step: TabNote[] | null; nextStep: TabNote[] | null }) => {
        document.querySelectorAll(`.${styles.active}`).forEach((el) => {
            el.classList.remove(styles.active);
        });

        document.querySelectorAll(`.${styles.nextActive}`).forEach((el) => {
            el.classList.remove(styles.nextActive);
        });
        document.querySelectorAll(`.${styles.activeEmptyString}`).forEach((el) => {
            el.classList.remove(styles.activeEmptyString);
        });

        document.querySelectorAll(`.${styles.nextActiveEmpty}`).forEach((el) => {
            el.classList.remove(styles.nextActiveEmpty);
        });

        if (info && info.nextStep) {
            info.nextStep.forEach((noteInfo) => {
                const { guitarString, guitarFret } = noteInfo as TabNote;
                if (guitarFret === 0) {
                    const noteElement = document.querySelector(`[data-string="${guitarString}"]`) as HTMLElement;
                    if (noteElement) {
                        noteElement.classList.add(styles.nextActiveEmpty);
                    }
                } else {
                    const noteElement = document.querySelector(
                        `[data-string="${guitarString}"][data-fret="${guitarFret}"]`,
                    ) as HTMLElement;
                    if (noteElement) {
                        noteElement.classList.add(styles.nextActive);
                    }
                }
            });
        }

        if (info && info.step) {
            info.step.forEach((noteInfo) => {
                const { guitarString, guitarFret } = noteInfo as TabNote;
                if (guitarFret === 0) {
                    const noteElement = document.querySelector(`[data-string="${guitarString}"]`) as HTMLElement;
                    if (noteElement) {
                        noteElement.classList.remove(styles.activeEmptyString);
                        void noteElement.offsetWidth;
                        noteElement.classList.add(styles.activeEmptyString);
                    }
                } else {
                    const noteElement = document.querySelector(
                        `[data-string="${guitarString}"][data-fret="${guitarFret}"]`,
                    ) as HTMLElement;
                    if (noteElement) {
                        noteElement.classList.remove(styles.active);
                        void noteElement.offsetWidth;
                        noteElement.classList.add(styles.active);
                    }
                }
            });
        }
    };

    const generateNoteNames = (noteIndex: number) => {
        noteIndex = noteIndex % 12;
        const noteName = notesSharp[noteIndex];
        return noteName;
    };

    return (
        <div className={styles.fretboard}>
            {Array.from({ length: numberOfStrings }, (_, stringIndex) => (
                <div key={stringIndex} className={styles.string} data-string={stringIndex + 1}>
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
