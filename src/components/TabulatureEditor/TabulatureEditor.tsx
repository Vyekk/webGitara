import styles from 'components/TabulatureEditor/TabulatureEditor.module.scss';

interface TabulatureEditorProps {
    numberOfStrings: number;
    isReversed?: boolean;
}

const TabulatureEditor: React.FC<TabulatureEditorProps> = ({ numberOfStrings, isReversed }) => {
    const stringsLabels = ['E', 'A', 'D', 'G', 'B', 'E'];
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
                                data-tabColumn={tabColumnIndex}
                            ></div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default TabulatureEditor;
