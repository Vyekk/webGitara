import { getDurationValueFromSymbol, getSymbolFromDurationValue } from 'utils/durationMapper';
import { Step, TabNote, Tablature } from 'types';

type FormDataMap = Record<string, string>;

export const convertFormDataToTablature = (formData: FormDataMap, formDataDuration: FormDataMap): Tablature => {
    const tablature: Tablature = [];

    for (let line = 0; line < 6; line++) {
        const lineSteps: Record<number, TabNote[]> = {};

        for (const key in formData) {
            const match = key.match(/^string-(\d+)-column-(\d+)-line-(\d+)$/);
            if (!match) continue;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, stringIndexRaw, columnRaw, lineIndexRaw] = match;
            const stringIndex = parseInt(stringIndexRaw);
            const columnIndex = parseInt(columnRaw);
            const lineIndex = parseInt(lineIndexRaw);

            if (lineIndex !== line) continue;

            const fret = formData[key];
            if (fret === '' || fret === '|') continue;

            const durationKey = `duration-${lineIndex}-${columnIndex}`;
            const durationSymbol = formDataDuration[durationKey];
            const duration = durationSymbol ? getDurationValueFromSymbol(durationSymbol) ?? durationSymbol : '4n';

            if (!lineSteps[columnIndex]) lineSteps[columnIndex] = [];

            lineSteps[columnIndex].push({
                guitarString: stringIndex,
                guitarFret: parseInt(fret),
                duration,
            });
        }

        const steps: Step[] = [];
        const maxColumn = Math.max(0, ...Object.keys(lineSteps).map(Number));

        for (let i = 1; i <= maxColumn; i++) {
            const step = lineSteps[i];

            if (step && step.length > 0) {
                steps.push(step);
            } else {
                const durationKey = `duration-${line}-${i}`;
                const durationSymbol = formDataDuration[durationKey];

                if (durationSymbol) {
                    const duration = getDurationValueFromSymbol(durationSymbol);
                    steps.push([
                        {
                            rest: true,
                            duration,
                        },
                    ]);
                }
            }
        }

        tablature.push(...steps);
    }

    return tablature;
};

export const convertTablatureToFormData = (
    tablature: Tablature,
): { formData: FormDataMap; formDataDuration: FormDataMap } => {
    const formData: FormDataMap = {};
    const formDataDuration: FormDataMap = {};
    let lineNumber = 1;
    let columnIndex = 1;
    tablature.forEach((step: TabNote[]) => {
        step.forEach((note) => {
            if (columnIndex > 50) {
                lineNumber++;
                columnIndex = 1;
            }
            const col = `column-${columnIndex}`;
            const line = `line-${lineNumber}`;
            if (!('rest' in note && note.rest)) {
                const key = `string-${note.guitarString}-${col}-${line}`;
                const value = `${note.guitarFret}`;
                formData[key] = value;
            }
            const durationSymbol = getSymbolFromDurationValue(note.duration);
            if (durationSymbol) {
                const durationKey = `duration-${lineNumber}-${columnIndex}`;
                formDataDuration[durationKey] = durationSymbol;
            }
        });
        columnIndex++;
    });

    return { formData, formDataDuration };
};
