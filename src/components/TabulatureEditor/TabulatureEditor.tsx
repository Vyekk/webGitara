import styles from 'components/TabulatureEditor/TabulatureEditor.module.scss';
import { useState } from 'react';

interface TabulatureEditorProps {
    numberOfStrings: number;
    isReversed?: boolean;
}

const TabulatureEditor: React.FC<TabulatureEditorProps> = ({ numberOfStrings, isReversed }) => {
    const stringsLabels = ['E', 'A', 'D', 'G', 'B', 'E'];
    const [formData, setFormData] = useState<Record<string, string>>({});

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
                                key={tabColumnIndex}
                                className={styles.tabCell}
                                data-string={stringIndex + 1}
                                data-tabcolumn={tabColumnIndex}
                            >
                                <input
                                    id={`${stringIndex + 1}-${tabColumnIndex}`}
                                    type="text"
                                    key={`${stringIndex + 1}-${tabColumnIndex}`}
                                    data-string={stringIndex + 1}
                                    data-tabcolumn={tabColumnIndex}
                                    onChange={handleTabulatureInputChange}
                                    value={formData[`${stringIndex + 1}${tabColumnIndex}`] || ''}
                                    maxLength={2}
                                    aria-hidden="true"
                                ></input>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default TabulatureEditor;
