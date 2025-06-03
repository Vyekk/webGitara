import styles from 'components/TablatureEditor/TablatureEditor.module.scss';
import { useState, useEffect } from 'react';
import { ChordPosition } from 'types';
import { TablatureActiveLineColumn } from 'types';

interface TablatureEditorProps {
    numberOfStrings: number;
    activeColumn: TablatureActiveLineColumn | null;
    tablatureLineIndex: number;
    setActiveColumn: React.Dispatch<React.SetStateAction<TablatureActiveLineColumn | null>>;
    isReversed?: boolean;
    insertChordPositions?: ChordPosition[];
    insertColumnDuration?: { value: string };
}

const TablatureEditor: React.FC<TablatureEditorProps> = ({
    numberOfStrings,
    isReversed,
    insertChordPositions,
    insertColumnDuration,
    activeColumn,
    tablatureLineIndex,
    setActiveColumn,
}) => {
    const stringsLabels = ['E', 'A', 'D', 'G', 'B', 'E'];
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [formDataDuration, setFormDataDuration] = useState<Record<string, string>>({});
    const tablatureColumnNumber = activeColumn?.tablatureColumnNumber ?? null;
    const tablatureLineNumber = activeColumn?.tablatureLineNumber ?? null;

    useEffect(() => {
        return () => {
            setActiveColumn(null);
        };
    }, []);

    useEffect(() => {
        if (
            insertColumnDuration &&
            activeColumn &&
            activeColumn?.tablatureColumnNumber !== null &&
            activeColumn.tablatureLineNumber === tablatureLineIndex
        ) {
            const key = `duration-${tablatureLineIndex}-${activeColumn.tablatureColumnNumber}`;
            setFormDataDuration((prev) => ({
                ...prev,
                [key]: insertColumnDuration.value,
            }));
        }
    }, [insertColumnDuration]);

    useEffect(() => {
        if (insertChordPositions && insertChordPositions.length > 0) {
            const newFormData: Record<string, string> = {};
            insertChordPositions.forEach((position) => {
                const stringIndex = position.guitarString;
                const fret = position.guitarFret;
                if (fret !== null) {
                    newFormData[`string-${stringIndex}-column-${tablatureColumnNumber}-line-${tablatureLineNumber}`] =
                        fret.toString();
                }
            });
            insertDefaultDuration();
            setFormData((prev) => ({ ...prev, ...newFormData }));
        } else if (insertChordPositions && insertChordPositions.length === 0) {
            setFormData((prev) => {
                const newFormData: Record<string, string> = {};
                for (let i = 1; i <= numberOfStrings; i++) {
                    newFormData[`string-${i}-column-${tablatureColumnNumber}-line-${tablatureLineNumber}`] = '';
                }
                return { ...prev, ...newFormData };
            });
        }
    }, [insertChordPositions]);

    const insertDefaultDuration = () => {
        if (activeColumn) {
            const durationKey = `duration-${tablatureLineIndex}-${activeColumn.tablatureColumnNumber}`;
            if (!formDataDuration[durationKey]) {
                setFormDataDuration((prev) => ({
                    ...prev,
                    [durationKey]: '♩',
                }));
            }
        }
    };

    const handleTablatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const stringIndex = e.target.dataset.string;
        const tabColumnIndex = e.target.dataset.tabcolumn;
        const key = `string-${stringIndex}-column-${tabColumnIndex}-line-${tablatureLineIndex}`;
        const value = e.target.value;

        const isValid = value === '' || value === '|' || (/^\d{1,2}$/.test(value) && +value >= 0 && +value <= 24);
        if (!isValid) return;
        insertDefaultDuration();
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleTablatureInputClick = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        setActiveColumn({
            tablatureLineNumber: tablatureLineIndex,
            tablatureColumnNumber: e.target.dataset.tabcolumn ?? null,
        });
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
                                    Number(tablatureColumnNumber) === tabColumnIndex + 1 &&
                                    tablatureLineNumber === tablatureLineIndex
                                        ? styles.activeTabColumn
                                        : ''
                                }`}
                                data-string={numberOfStrings - stringIndex}
                                data-tabcolumn={tabColumnIndex + 1}
                            >
                                {numberOfStrings - stringIndex === 1 && (
                                    <div
                                        className={styles.durationWrapper}
                                        key={`duration-${tablatureLineIndex}-${tabColumnIndex + 1}`}
                                    >
                                        <input
                                            id={`duration-${tabColumnIndex + 1}`}
                                            key={`duration-${tablatureLineIndex}-${tabColumnIndex + 1}`}
                                            aria-label="Column duration"
                                            type="text"
                                            readOnly
                                            value={
                                                formDataDuration[
                                                    `duration-${tablatureLineIndex}-${tabColumnIndex + 1}`
                                                ] || ''
                                            }
                                            data-tabcolumn={tabColumnIndex + 1}
                                        />
                                    </div>
                                )}
                                <input
                                    id={`${numberOfStrings - stringIndex}-${tabColumnIndex + 1}`}
                                    type="text"
                                    key={`${numberOfStrings - stringIndex}-${tabColumnIndex + 1}`}
                                    data-string={numberOfStrings - stringIndex}
                                    data-tabcolumn={tabColumnIndex + 1}
                                    onChange={handleTablatureInputChange}
                                    value={
                                        formData[
                                            `string-${numberOfStrings - stringIndex}-column-${
                                                tabColumnIndex + 1
                                            }-line-${tablatureLineIndex}`
                                        ] || ''
                                    }
                                    readOnly={
                                        formData[
                                            `string-${numberOfStrings - stringIndex}-column-${
                                                tabColumnIndex + 1
                                            }-line-${tablatureLineIndex}`
                                        ] === '|'
                                    }
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
