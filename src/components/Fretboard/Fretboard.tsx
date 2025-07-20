import React, { useEffect, useLayoutEffect, useRef } from 'react';
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
    isReversed: boolean;
}

const Fretboard: React.FC<FretboardProps> = ({ numberOfStrings, numberOfFrets, notesToShow, isReversed }) => {
    const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
    const doubleFretMarkPositions = [12, 24];
    const instrumentTuning = [4, 11, 7, 2, 9, 4];
    const notesSharp = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const stringNames = ['E', 'B', 'G', 'D', 'A', 'E'];

    // refs for string lines (div.string)
    const stringRefs = useRef<(HTMLDivElement | null)[]>([]);
    // refs for fret 0 on each string (div.noteFret, fret 0)
    const fret0Refs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        showStringsNames();
    }, []);

    useLayoutEffect(() => {
        showNotes(notesToShow);
    }, [notesToShow]);

    const showStringsNames = () => {
        stringRefs.current.forEach((_, index) => {
            const noteName = stringNames[index];
            const fret0 = fret0Refs.current[index];
            if (fret0) {
                fret0.innerText = noteName;
            }
        });
    };

    const showNotes = (info: { prevStep: TabNote[] | null; step: TabNote[] | null; nextStep: TabNote[] | null }) => {
        // Czyszczenie klas na wszystkich strunach i progach 0
        stringRefs.current.forEach((el) => {
            if (el) el.classList.remove(styles.activeEmptyString, styles.nextActiveEmpty);
        });
        fret0Refs.current.forEach((el) => {
            if (el) el.classList.remove(styles.active, styles.nextActive);
        });
        // Czyszczenie klas na wszystkich progach
        const allFrets = document.querySelectorAll(`.${styles.noteFret}`);
        allFrets.forEach((el) => {
            el.classList.remove(styles.active, styles.nextActive);
        });

        if (info && info.nextStep) {
            info.nextStep.forEach((noteInfo) => {
                const { guitarString, guitarFret } = noteInfo as TabNote;
                if (guitarString !== undefined) {
                    if (guitarFret === 0) {
                        const stringEl = stringRefs.current[guitarString - 1];
                        if (stringEl) stringEl.classList.add(styles.nextActiveEmpty);
                    } else {
                        // fret index: stringIndex = guitarString - 1
                        const fret0 = fret0Refs.current[guitarString - 1]?.parentElement;
                        const noteFret = fret0?.querySelector(`[data-fret="${guitarFret}"]`) as HTMLElement;
                        if (noteFret) noteFret.classList.add(styles.nextActive);
                    }
                }
            });
        }

        if (info && info.step) {
            info.step.forEach((noteInfo) => {
                const { guitarString, guitarFret } = noteInfo as TabNote;
                if (guitarString !== undefined) {
                    if (guitarFret === 0) {
                        const stringEl = stringRefs.current[guitarString - 1];
                        if (stringEl) {
                            stringEl.classList.remove(styles.activeEmptyString);
                            void stringEl.offsetWidth;
                            stringEl.classList.add(styles.activeEmptyString);
                        }
                    } else {
                        const fret0 = fret0Refs.current[guitarString - 1]?.parentElement;
                        const noteFret = fret0?.querySelector(`[data-fret="${guitarFret}"]`) as HTMLElement;
                        if (noteFret) {
                            noteFret.classList.remove(styles.active);
                            void noteFret.offsetWidth;
                            noteFret.classList.add(styles.active);
                        }
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
            {Array.from({ length: numberOfStrings }, (_, i) => i)
                .map((i) => (isReversed ? i : numberOfStrings - 1 - i))
                .map((stringIndex) => (
                    <div
                        key={stringIndex}
                        data-testid="string"
                        className={styles.string}
                        data-string={stringIndex + 1}
                        ref={(el) => (stringRefs.current[stringIndex] = el)}
                    >
                        {Array.from({ length: numberOfFrets + 1 }, (_, fretIndex) => (
                            <div
                                key={fretIndex}
                                data-testid="noteFret"
                                className={styles.noteFret}
                                data-string={stringIndex + 1}
                                data-fret={fretIndex}
                                data-note={generateNoteNames(fretIndex + instrumentTuning[stringIndex])}
                                ref={fretIndex === 0 ? (el) => (fret0Refs.current[stringIndex] = el) : undefined}
                            >
                                {singleFretMarkPositions.includes(fretIndex) &&
                                    stringIndex === (isReversed ? 0 : 5) && (
                                        <div className={styles.singleFretmark}></div>
                                    )}
                                {doubleFretMarkPositions.includes(fretIndex) &&
                                    stringIndex === (isReversed ? 0 : 5) && (
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
