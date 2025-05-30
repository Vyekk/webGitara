import styles from 'components/TablatureEditor/TablatureEditor.module.scss';
import { useState, useEffect } from 'react';
import { ChordPosition } from 'types';

interface TablatureEditorProps {
    numberOfStrings: number;
    isReversed?: boolean;
    insertChordPositions?: ChordPosition[];
}

const TablatureEditor: React.FC<TablatureEditorProps> = ({ numberOfStrings, isReversed, insertChordPositions }) => {
    const stringsLabels = ['E', 'A', 'D', 'G', 'B', 'E'];
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [activeColumn, setActiveColumn] = useState<number | null>(null);

    useEffect(() => {
        if (insertChordPositions && insertChordPositions.length > 0) {
            const newFormData: Record<string, string> = {};
            insertChordPositions.forEach((position) => {
                const stringIndex = position.guitarString;
                const fret = position.guitarFret;
                if (fret !== null) {
                    newFormData[`${stringIndex}${activeColumn}`] = fret.toString();
                }
            });
            setFormData(newFormData);
        }
    }, [insertChordPositions]);

    const handleTablatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const stringIndex = e.target.dataset.string;
        const tabColumnIndex = e.target.dataset.tabcolumn;
        const key = `${stringIndex}${tabColumnIndex}`;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleTablatureInputClick = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        setActiveColumn(Number(e.currentTarget.dataset.tabcolumn));
    };

    return (
        <div className={styles.tablatureEditorWrapper}>
            {Array.from({ length: numberOfStrings }, (_, i) => i)
                .map((i) => (isReversed ? i : numberOfStrings - 1 - i))
                .map((stringIndex) => (
                    <div
                        key={numberOfStrings - stringIndex}
                        className={styles.string}
                        data-string={numberOfStrings - stringIndex}
                    >
                        <span key={stringIndex + stringsLabels[stringIndex]} className={styles.stringLabel}>
                            {stringsLabels[stringIndex]}
                        </span>

                        {Array.from({ length: 50 }, (_, tabColumnIndex) => (
                            <div
                                key={tabColumnIndex + 1}
                                className={`${styles.tabCell} ${
                                    activeColumn === tabColumnIndex + 1 ? styles.activeTabColumn : ''
                                }`}
                                data-string={numberOfStrings - stringIndex}
                                data-tabcolumn={tabColumnIndex + 1}
                            >
                                <input
                                    id={`${numberOfStrings - stringIndex}-${tabColumnIndex + 1}`}
                                    type="text"
                                    key={`${numberOfStrings - stringIndex}-${tabColumnIndex + 1}`}
                                    data-string={numberOfStrings - stringIndex}
                                    data-tabcolumn={tabColumnIndex + 1}
                                    onChange={handleTablatureInputChange}
                                    value={formData[`${numberOfStrings - stringIndex}${tabColumnIndex + 1}`] || ''}
                                    maxLength={2}
                                    aria-label="Tablature input"
                                    onFocus={handleTablatureInputClick}
                                ></input>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default TablatureEditor;
