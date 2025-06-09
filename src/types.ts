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
    id: string;
    songTitle: string;
    author: string;
    rating: number[];
    place: number;
    liked?: boolean;
    comments?: {
        content: string;
        author: string;
    }[];
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

export type User = {
    idUser: string;
    username: string;
    password: string;
    email: string;
    isAdmin: boolean;
    isModerator: boolean;
    isActivated: boolean;
    created_at: string;
    average_published_song_rating: number;
    number_of_ratings_received: number;
};
