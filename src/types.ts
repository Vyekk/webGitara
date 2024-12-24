export type Song = {
    id: number;
    songTitle: string;
    author: string;
    rating: number[];
    place: number;
    liked?: boolean;
    comments?: string[][];
    tabulature: number[][];
};
