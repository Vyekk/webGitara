import { getDurationValueFromSymbol, getSymbolFromDurationValue } from 'utils/durationMapper';
import { TabNote, Tablature } from 'types';

type FormDataMap = Record<string, string>;

function parseFormDataKey(key: string) {
    const match = key.match(/^string-(\d+)-column-(\d+)-line-(\d+)$/);
    if (!match) return null;
    return {
        stringIndex: parseInt(match[1]),
        columnIndex: parseInt(match[2]),
        lineIndex: parseInt(match[3]),
    };
}

export const convertFormDataToTablature = (formData: FormDataMap, formDataDuration: FormDataMap): Tablature => {
    const linesMap: Map<number, Map<number, TabNote[]>> = new Map();
    for (const key in formData) {
        const parsed = parseFormDataKey(key);
        if (!parsed) continue;
        const { stringIndex, columnIndex, lineIndex } = parsed;
        const fret = formData[key];
        if (fret === '' || fret === '|') continue;
        const durationKey = `duration-${lineIndex}-${columnIndex}`;
        const durationSymbol = formDataDuration[durationKey];
        const duration = durationSymbol ? getDurationValueFromSymbol(durationSymbol) ?? durationSymbol : '4n';
        let columnsMap = linesMap.get(lineIndex);
        if (!columnsMap) {
            columnsMap = new Map();
            linesMap.set(lineIndex, columnsMap);
        }
        let notesArr = columnsMap.get(columnIndex);
        if (!notesArr) {
            notesArr = [];
            columnsMap.set(columnIndex, notesArr);
        }
        notesArr.push({
            guitarString: stringIndex,
            guitarFret: parseInt(fret),
            duration,
        });
    }

    const tablature: Tablature = [];
    for (let line = 0; line < 6; line++) {
        const columnsMap = linesMap.get(line) || new Map();
        const maxColumn = columnsMap.size > 0 ? Math.max(...Array.from(columnsMap.keys())) : 0;
        for (let i = 1; i <= maxColumn; i++) {
            const step = columnsMap.get(i);
            if (step && step.length > 0) {
                tablature.push(step);
            } else {
                const durationKey = `duration-${line}-${i}`;
                const durationSymbol = formDataDuration[durationKey];
                if (durationSymbol) {
                    const duration = getDurationValueFromSymbol(durationSymbol);
                    tablature.push([
                        {
                            rest: true,
                            duration,
                        },
                    ]);
                }
            }
        }
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
