export type TabNote =
    | {
          rest: true;
          duration: string;
          guitarString?: never;
          guitarFret?: never;
      }
    | {
          rest?: false;
          duration: string;
          guitarString: number;
          guitarFret: number;
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
    tablatureLineNumber: number;
    tablatureColumnNumber: string | null;
};
