const durationSymbolToValueMap: Record<string, string> = {
    '𝅝': '1n',
    '𝅗𝅥': '2n',
    '𝅘𝅥': '4n',
    '𝅘𝅥𝅮': '8n',
    '𝅘𝅥𝅯': '16n',
    '𝅘𝅥𝅰': '32n',
    '𝅘𝅥𝅱': '64n',
};

const durationValueToSymbolMap: Record<string, string> = Object.fromEntries(
    Object.entries(durationSymbolToValueMap).map(([symbol, value]) => [value, symbol]),
);

export const getDurationValueFromSymbol = (symbol: string): string => {
    return durationSymbolToValueMap[symbol] || '4n';
};

export const getSymbolFromDurationValue = (value: string): string => {
    return durationValueToSymbolMap[value] || '♩';
};
