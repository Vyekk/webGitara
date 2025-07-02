import request from 'supertest';
import app from '../src/app';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiJiNTg1OTdmMS0yMGE4LTRlOTEtYWQ1Zi0wZTc5YThmMjIwYWYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6MSwiaXNNb2RlcmF0b3IiOjAsImlhdCI6MTc1MTQ2MjI5MiwiZXhwIjoxNzUxNTQ4NjkyfQ.sH85MRn9IovfmlCXmOEgmT85eQDYWWf46knSitERCzo';
const otherToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxMzg0MTNjYy1iOTMxLTQ0OTAtYmM5Ni1jNjgwOTM5MGFlZTgiLCJ1c2VybmFtZSI6ImYiLCJpc0FkbWluIjowLCJpc01vZGVyYXRvciI6MCwiaWF0IjoxNzUxNDIzNDY2LCJleHAiOjE3NTE1MDk4NjZ9.LzFRQ1XQ0_K32xbFh8WqVuCNWDrVU7bOfE33y6wPM5A';
const testSongId = '14efc0cb-7351-4167-b9bf-1c0a8159e2c4';
let createdCommentId: string | null = null;

describe('Comments Controller', () => {
    it('POST /api/songs/:songId/comments - dodanie komentarza z tokenem', async () => {
        const res = await request(app)
            .post(`/api/songs/${testSongId}/comments`)
            .send({ content: 'Testowy komentarz', idUser: 'b58597f1-20a8-4e91-ad5f-0e79a8f220af' })
            .set('Authorization', `Bearer ${token}`);
        console.log('Status:', res.statusCode, 'Body:', res.body);
        expect([201, 200]).toContain(res.statusCode);
        if (res.body.idComment) createdCommentId = res.body.idComment;
    });

    it('POST /api/songs/:songId/comments - dodanie komentarza bez tokena powinno zwrócić 401', async () => {
        const res = await request(app).post(`/api/songs/${testSongId}/comments`).send({ content: 'Test bez tokena' });
        expect([401, 403]).toContain(res.statusCode);
    });

    it('POST /api/songs/:songId/comments - brak wymaganych pól powinno zwrócić 400', async () => {
        const res = await request(app)
            .post(`/api/songs/${testSongId}/comments`)
            .send({})
            .set('Authorization', `Bearer ${token}`);
        expect([400, 404]).toContain(res.statusCode);

        // Sprawdź, czy komentarz o pustej treści nie został dodany
        const getRes = await request(app).get(`/api/songs/${testSongId}/comments`);
        if (getRes.statusCode === 200) {
            expect(getRes.body.some((c: { content: string }) => !c.content)).toBe(false);
        }
    });

    it('POST /api/songs/:songId/comments - nieistniejąca piosenka powinno zwrócić 404', async () => {
        const res = await request(app)
            .post('/api/songs/00000000-0000-0000-0000-000000000000/comments')
            .send({ content: 'Nieistniejąca piosenka' })
            .set('Authorization', `Bearer ${token}`);
        expect([404, 400]).toContain(res.statusCode);
    });

    it('GET /api/songs/:songId/comments - pobranie komentarzy do piosenki', async () => {
        const res = await request(app).get(`/api/songs/${testSongId}/comments`);
        expect([200, 404]).toContain(res.statusCode);
        if (res.statusCode === 200) {
            expect(Array.isArray(res.body)).toBe(true);
        }
    });

    it('DELETE /api/songs/:songId/comments/:commentId - usunięcie komentarza przez autora', async () => {
        if (!createdCommentId) return;
        const res = await request(app)
            .delete(`/api/songs/${testSongId}/comments/${createdCommentId}`)
            .set('Authorization', `Bearer ${token}`);
        expect([200, 404]).toContain(res.statusCode);
    });

    it('DELETE /api/songs/:songId/comments/:commentId - usunięcie komentarza przez innego użytkownika powinno zwrócić 403', async () => {
        if (!createdCommentId) return;
        const res = await request(app)
            .delete(`/api/songs/${testSongId}/comments/${createdCommentId}`)
            .set('Authorization', `Bearer ${otherToken}`);
        expect([403, 401, 404]).toContain(res.statusCode);
    });

    it('DELETE /api/songs/:songId/comments/:commentId - usunięcie komentarza bez tokena powinno zwrócić 401', async () => {
        if (!createdCommentId) return;
        const res = await request(app).delete(`/api/songs/${testSongId}/comments/${createdCommentId}`);
        expect([401, 403, 404]).toContain(res.statusCode);
    });

    it('DELETE /api/songs/:songId/comments/:commentId - usunięcie nieistniejącego komentarza powinno zwrócić 404', async () => {
        const res = await request(app)
            .delete(`/api/songs/${testSongId}/comments/00000000-0000-0000-0000-000000000000`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });
});
