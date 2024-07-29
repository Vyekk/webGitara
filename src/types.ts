export type Song = {
    songTitle: string;
    author: string;
    rating: number[];
    place: number;
    liked?: boolean;
    comments?: string[][];
};
