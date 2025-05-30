const GuitarChords = [
    // Akordy durowe (Major)
    {
        name: 'A',
        positions: [
            { guitarString: 5, guitarFret: 0 },
            { guitarString: 4, guitarFret: 2 },
            { guitarString: 3, guitarFret: 2 },
            { guitarString: 2, guitarFret: 2 },
            { guitarString: 1, guitarFret: 0 },
        ],
    },
    {
        name: 'A#',
        positions: [
            { guitarString: 5, guitarFret: 1 },
            { guitarString: 4, guitarFret: 3 },
            { guitarString: 3, guitarFret: 3 },
            { guitarString: 2, guitarFret: 3 },
            { guitarString: 1, guitarFret: 1 },
        ],
    },
    {
        name: 'B',
        positions: [
            { guitarString: 5, guitarFret: 2 },
            { guitarString: 4, guitarFret: 4 },
            { guitarString: 3, guitarFret: 4 },
            { guitarString: 2, guitarFret: 4 },
            { guitarString: 1, guitarFret: 2 },
        ],
    },
    {
        name: 'C',
        positions: [
            { guitarString: 5, guitarFret: 3 },
            { guitarString: 4, guitarFret: 2 },
            { guitarString: 3, guitarFret: 0 },
            { guitarString: 2, guitarFret: 1 },
            { guitarString: 1, guitarFret: 0 },
        ],
    },
    {
        name: 'C#',
        positions: [
            { guitarString: 5, guitarFret: 4 },
            { guitarString: 4, guitarFret: 6 },
            { guitarString: 3, guitarFret: 6 },
            { guitarString: 2, guitarFret: 6 },
            { guitarString: 1, guitarFret: 4 },
        ],
    },
    {
        name: 'D',
        positions: [
            { guitarString: 4, guitarFret: 0 },
            { guitarString: 3, guitarFret: 2 },
            { guitarString: 2, guitarFret: 3 },
            { guitarString: 1, guitarFret: 2 },
        ],
    },
    {
        name: 'D#',
        positions: [
            { guitarString: 5, guitarFret: 6 },
            { guitarString: 4, guitarFret: 8 },
            { guitarString: 3, guitarFret: 8 },
            { guitarString: 2, guitarFret: 8 },
            { guitarString: 1, guitarFret: 6 },
        ],
    },
    {
        name: 'E',
        positions: [
            { guitarString: 6, guitarFret: 0 },
            { guitarString: 5, guitarFret: 2 },
            { guitarString: 4, guitarFret: 2 },
            { guitarString: 3, guitarFret: 1 },
            { guitarString: 2, guitarFret: 0 },
            { guitarString: 1, guitarFret: 0 },
        ],
    },
    {
        name: 'F',
        positions: [
            { guitarString: 6, guitarFret: 1 },
            { guitarString: 5, guitarFret: 3 },
            { guitarString: 4, guitarFret: 3 },
            { guitarString: 3, guitarFret: 2 },
            { guitarString: 2, guitarFret: 1 },
            { guitarString: 1, guitarFret: 1 },
        ],
    },
    {
        name: 'F#',
        positions: [
            { guitarString: 6, guitarFret: 2 },
            { guitarString: 5, guitarFret: 4 },
            { guitarString: 4, guitarFret: 4 },
            { guitarString: 3, guitarFret: 3 },
            { guitarString: 2, guitarFret: 2 },
            { guitarString: 1, guitarFret: 2 },
        ],
    },
    {
        name: 'G',
        positions: [
            { guitarString: 6, guitarFret: 3 },
            { guitarString: 5, guitarFret: 2 },
            { guitarString: 4, guitarFret: 0 },
            { guitarString: 3, guitarFret: 0 },
            { guitarString: 2, guitarFret: 0 },
            { guitarString: 1, guitarFret: 3 },
        ],
    },

    // Akordy molowe (Minor)
    {
        name: 'Am',
        positions: [
            { guitarString: 5, guitarFret: 0 },
            { guitarString: 4, guitarFret: 2 },
            { guitarString: 3, guitarFret: 2 },
            { guitarString: 2, guitarFret: 1 },
            { guitarString: 1, guitarFret: 0 },
        ],
    },
    {
        name: 'Am#',
        positions: [
            { guitarString: 5, guitarFret: 1 },
            { guitarString: 4, guitarFret: 3 },
            { guitarString: 3, guitarFret: 3 },
            { guitarString: 2, guitarFret: 2 },
            { guitarString: 1, guitarFret: 1 },
        ],
    },
    {
        name: 'Bm',
        positions: [
            { guitarString: 5, guitarFret: 2 },
            { guitarString: 4, guitarFret: 4 },
            { guitarString: 3, guitarFret: 4 },
            { guitarString: 2, guitarFret: 3 },
            { guitarString: 1, guitarFret: 2 },
        ],
    },
    {
        name: 'Cm',
        positions: [
            { guitarString: 5, guitarFret: 3 },
            { guitarString: 4, guitarFret: 5 },
            { guitarString: 3, guitarFret: 5 },
            { guitarString: 2, guitarFret: 4 },
            { guitarString: 1, guitarFret: 3 },
        ],
    },
    {
        name: 'Cm#',
        positions: [
            { guitarString: 5, guitarFret: 4 },
            { guitarString: 4, guitarFret: 6 },
            { guitarString: 3, guitarFret: 6 },
            { guitarString: 2, guitarFret: 5 },
            { guitarString: 1, guitarFret: 4 },
        ],
    },
    {
        name: 'Dm',
        positions: [
            { guitarString: 4, guitarFret: 0 },
            { guitarString: 3, guitarFret: 2 },
            { guitarString: 2, guitarFret: 3 },
            { guitarString: 1, guitarFret: 1 },
        ],
    },
    {
        name: 'Dm#',
        positions: [
            { guitarString: 5, guitarFret: 6 },
            { guitarString: 4, guitarFret: 8 },
            { guitarString: 3, guitarFret: 8 },
            { guitarString: 2, guitarFret: 7 },
            { guitarString: 1, guitarFret: 6 },
        ],
    },
    {
        name: 'Em',
        positions: [
            { guitarString: 6, guitarFret: 0 },
            { guitarString: 5, guitarFret: 2 },
            { guitarString: 4, guitarFret: 2 },
            { guitarString: 3, guitarFret: 0 },
            { guitarString: 2, guitarFret: 0 },
            { guitarString: 1, guitarFret: 0 },
        ],
    },
    {
        name: 'Fm',
        positions: [
            { guitarString: 6, guitarFret: 1 },
            { guitarString: 5, guitarFret: 3 },
            { guitarString: 4, guitarFret: 3 },
            { guitarString: 3, guitarFret: 1 },
            { guitarString: 2, guitarFret: 1 },
            { guitarString: 1, guitarFret: 1 },
        ],
    },
    {
        name: 'Fm#',
        positions: [
            { guitarString: 6, guitarFret: 2 },
            { guitarString: 5, guitarFret: 4 },
            { guitarString: 4, guitarFret: 4 },
            { guitarString: 3, guitarFret: 2 },
            { guitarString: 2, guitarFret: 2 },
            { guitarString: 1, guitarFret: 2 },
        ],
    },
    {
        name: 'Gm',
        positions: [
            { guitarString: 6, guitarFret: 3 },
            { guitarString: 5, guitarFret: 5 },
            { guitarString: 4, guitarFret: 5 },
            { guitarString: 3, guitarFret: 3 },
            { guitarString: 2, guitarFret: 3 },
            { guitarString: 1, guitarFret: 3 },
        ],
    },
    {
        name: 'Gm#',
        positions: [
            { guitarString: 6, guitarFret: 4 },
            { guitarString: 5, guitarFret: 6 },
            { guitarString: 4, guitarFret: 6 },
            { guitarString: 3, guitarFret: 4 },
            { guitarString: 2, guitarFret: 4 },
            { guitarString: 1, guitarFret: 4 },
        ],
    },
];

export default GuitarChords;
