export type TabNote = {
    guitarString: number;
    guitarFret: number;
    duration: string;
    rest?: boolean;
};

export type Step = TabNote[];
export type Tablature = Step[];

export type Song = {
    id: number;
    songTitle: string;
    author: string;
    rating: number[];
    place: number;
    liked?: boolean;
    comments?: [string, string][];
    tablature: Tablature;
    bpm: number;
};

export type ChordPosition = {
    guitarString: number;
    guitarFret: number | null | string;
};

export type TablatureActiveLineColumn = {
    tabulatureLineNumber: number;
    tabulatureColumnNumber: string | null;
};
