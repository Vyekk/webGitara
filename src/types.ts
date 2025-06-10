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
    idUser?: string;
    rating: number[];
    place: number;
    comments?: Comment[];
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

export type InfoMessage = {
    message: string | null;
};

export type Comment = {
    idComment: string;
    content: string;
    author: {
        idUser: string;
        username: string;
    };
};
