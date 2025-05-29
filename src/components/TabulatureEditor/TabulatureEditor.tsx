import styles from 'components/TabulatureEditor/TabulatureEditor.module.scss';
import { useState } from 'react';

interface TabulatureEditorProps {
    numberOfStrings: number;
    isReversed?: boolean;
}

const TabulatureEditor: React.FC<TabulatureEditorProps> = ({ numberOfStrings, isReversed }) => {
    const stringsLabels = ['E', 'A', 'D', 'G', 'B', 'E'];
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [activeColumn, setActiveColumn] = useState<number | null>(null);

    const handleTabulatureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const stringIndex = e.target.dataset.string;
        const tabColumnIndex = e.target.dataset.tabcolumn;
        const key = `${stringIndex}${tabColumnIndex}`;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleTabulatureInputClick = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
        setActiveColumn(Number(e.currentTarget.dataset.tabcolumn));
    };

    return (
        <div className={styles.tabulatureEditorWrapper}>
            {Array.from({ length: numberOfStrings }, (_, i) => i)
                .map((i) => (isReversed ? i : numberOfStrings - 1 - i))
                .map((stringIndex) => (
                    <div key={stringIndex} className={styles.string} data-string={stringIndex + 1}>
                        <span key={stringIndex + stringsLabels[stringIndex]} className={styles.stringLabel}>
                            {stringsLabels[stringIndex]}
                        </span>

                        {Array.from({ length: 50 }, (_, tabColumnIndex) => (
                            <div
                                key={tabColumnIndex + 1}
                                className={`${styles.tabCell} ${
                                    activeColumn === tabColumnIndex + 1 ? styles.activeTabColumn : ''
                                }`}
                                data-string={stringIndex + 1}
                                data-tabcolumn={tabColumnIndex + 1}
                            >
                                <input
                                    id={`${stringIndex + 1}-${tabColumnIndex + 1}`}
                                    type="text"
                                    key={`${stringIndex + 1}-${tabColumnIndex + 1}`}
                                    data-string={stringIndex + 1}
                                    data-tabcolumn={tabColumnIndex + 1}
                                    onChange={handleTabulatureInputChange}
                                    value={formData[`${stringIndex + 1}${tabColumnIndex + 1}`] || ''}
                                    maxLength={2}
                                    aria-hidden="true"
                                    onFocus={handleTabulatureInputClick}
                                    onBlur={() => setActiveColumn(null)}
                                ></input>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default TabulatureEditor;
