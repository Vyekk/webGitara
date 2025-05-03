export type TabNote = {
    guitarString: number;
    guitarFret: number;
    duration: string;
    rest?: boolean;
};

export type Step = TabNote[];
export type Tabulature = Step[];

export type Song = {
    id: number;
    songTitle: string;
    author: string;
    rating: number[];
    place: number;
    liked?: boolean;
    comments?: [string, string][];
    tabulature: Tabulature;
};
