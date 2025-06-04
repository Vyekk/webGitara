import { getDurationValueFromSymbol } from 'utils/durationMapper';
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
