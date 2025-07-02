import { render, screen } from '@testing-library/react';
import { CommentsSection } from './CommentsSection';
import { Song } from 'types';
import React from 'react';

// Mock kontekstów
jest.mock('context/SongsContext', () => ({
    useSongs: () => ({
        addCommentToSong: jest.fn(),
        deleteCommentFromSong: jest.fn(),
    }),
}));
jest.mock('utils/useRequiredUser', () => () => ({ idUser: '1', username: 'testuser' }));
jest.mock('components/Modal/ModalContext', () => {
    const React = require('react');
    return {
        ModalContext: React.createContext({ openModal: jest.fn(), setModal: jest.fn() }),
    };
});

const mockSong: Song = {
    idSong: 'song1',
    songTitle: 'Test Song',
    author: 'Autor',
    idUser: '1',
    rating: [],
    place: 0,
    tablature: [],
    bpm: 120,
    deleted_by_idUser: null,
    comments: [
        {
            idComment: 'c1',
            content: 'Komentarz testowy',
            author: { idUser: '1', username: 'testuser' },
        },
    ],
};

describe('CommentsSection', () => {
    it('renderuje tytuł piosenki i sekcję komentarzy', () => {
        render(<CommentsSection song={mockSong} />);
        expect(screen.getByRole('heading', { name: /Test Song/i })).toBeInTheDocument();
        expect(screen.getByText('Komentarz testowy')).toBeInTheDocument();
        expect(screen.getByText('testuser')).toBeInTheDocument();
        expect(screen.getByText('Dodaj komentarz')).toBeInTheDocument();
    });
});
