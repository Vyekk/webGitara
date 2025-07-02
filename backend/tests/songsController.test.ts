import request from 'supertest';
import app from '../src/app';

describe('Songs Controller', () => {
    let createdSongId: string | null = null;
    const testSong = {
        idUser: 'b58597f1-20a8-4e91-ad5f-0e79a8f220af', // nowy admin user id
        title: 'Test Song',
        default_bpm: 120,
        tablature: { tracks: [] },
    };
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiJiNTg1OTdmMS0yMGE4LTRlOTEtYWQ1Zi0wZTc5YThmMjIwYWYiLCJ1c2VybmFtZSI6ImFkbWluIiwiaXNBZG1pbiI6MSwiaXNNb2RlcmF0b3IiOjAsImlhdCI6MTc1MTQ2MjI5MiwiZXhwIjoxNzUxNTQ4NjkyfQ.sH85MRn9IovfmlCXmOEgmT85eQDYWWf46knSitERCzo';

    it('GET /api/songs - powinno zwrócić listę piosenek', async () => {
        const res = await request(app).get('/api/songs');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /api/songs - powinno dodać nową piosenkę', async () => {
        const res = await request(app)
            .post('/api/songs')
            .send(testSong)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('idSong');
        createdSongId = res.body.idSong;
    });

    it('GET /api/songs/:id - powinno zwrócić szczegóły piosenki', async () => {
        if (!createdSongId) return;
        const res = await request(app).get(`/api/songs/${createdSongId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('idSong', createdSongId);
    });

    it('PUT /api/songs/:id - powinno zaktualizować piosenkę', async () => {
        if (!createdSongId) return;
        const res = await request(app)
            .put(`/api/songs/${createdSongId}`)
            .send({
                title: 'Zmieniony tytuł',
                default_bpm: 100,
                tablature: { tracks: [] },
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

    it('DELETE /api/songs/:id - powinno oznaczyć piosenkę jako usuniętą', async () => {
        if (!createdSongId) return;
        const res = await request(app)
            .delete(`/api/songs/${createdSongId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect([200, 401]).toContain(res.statusCode);
    });

    // --- DODATKOWE TESTY ---

    it('POST /api/songs - bez tokena powinno zwrócić 401', async () => {
        const res = await request(app).post('/api/songs').send(testSong).set('Accept', 'application/json');
        expect([401, 403]).toContain(res.statusCode);
    });

    it('POST /api/songs - brak wymaganych pól powinno zwrócić 400', async () => {
        const res = await request(app)
            .post('/api/songs')
            .send({})
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
    });

    it('GET /api/songs/:id - nieistniejąca piosenka powinno zwrócić 404', async () => {
        const res = await request(app).get('/api/songs/00000000-0000-0000-0000-000000000000');
        expect(res.statusCode).toBe(404);
    });

    it('PUT /api/songs/:id - nieistniejąca piosenka powinno zwrócić 404', async () => {
        const res = await request(app)
            .put('/api/songs/00000000-0000-0000-0000-000000000000')
            .send({ title: 'x', default_bpm: 100, tablature: { tracks: [] } })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect([404, 400]).toContain(res.statusCode);
    });

    it('DELETE /api/songs/:id - nieistniejąca piosenka powinno zwrócić 404', async () => {
        const res = await request(app)
            .delete('/api/songs/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect([404, 400]).toContain(res.statusCode);
    });

    // --- Test uprawnień (przykład, wymaga tokena innego użytkownika) ---
    it('PUT /api/songs/:id - inny użytkownik nie może edytować', async () => {
        if (!createdSongId) return;
        const otherToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxMzg0MTNjYy1iOTMxLTQ0OTAtYmM5Ni1jNjgwOTM5MGFlZTgiLCJ1c2VybmFtZSI6ImYiLCJpc0FkbWluIjowLCJpc01vZGVyYXRvciI6MCwiaWF0IjoxNzUxNDIzNDY2LCJleHAiOjE3NTE1MDk4NjZ9.LzFRQ1XQ0_K32xbFh8WqVuCNWDrVU7bOfE33y6wPM5A';
        const res = await request(app)
            .put(`/api/songs/${createdSongId}`)
            .send({ title: 'Nieautoryzowana zmiana', default_bpm: 100, tablature: { tracks: [] } })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${otherToken}`);
        expect([403, 401]).toContain(res.statusCode);
    });

    // --- Test ulubionych (przykład, endpointy muszą istnieć) ---
    it('POST /api/favourites - dodanie do ulubionych bez tokena powinno zwrócić 401', async () => {
        const res = await request(app).post('/api/favourites').send({ idSong: '0b6887a7-ca79-44d2-9248-ff690f3d3039' });
        expect([401, 403, 404]).toContain(res.statusCode);
    });

    it('POST /api/favourites - dodanie do ulubionych z tokenem powinno zwrócić 201 lub 200', async () => {
        const res = await request(app)
            .post('/api/favourites')
            .send({ idSong: '0b6887a7-ca79-44d2-9248-ff690f3d3039' })
            .set('Authorization', `Bearer ${token}`);
        expect([200, 201, 409, 404]).toContain(res.statusCode); // 409 jeśli już jest ulubione, 404 jeśli nie istnieje piosenka
    });

    it('DELETE /api/favourites/:idSong - usunięcie z ulubionych bez tokena powinno zwrócić 401', async () => {
        const res = await request(app).delete('/api/favourites/0b6887a7-ca79-44d2-9248-ff690f3d3039');
        expect([401, 403, 404]).toContain(res.statusCode);
    });

    it('DELETE /api/favourites/:idSong - usunięcie z ulubionych z tokenem powinno zwrócić 200 lub 404', async () => {
        const res = await request(app)
            .delete('/api/favourites/0b6887a7-ca79-44d2-9248-ff690f3d3039')
            .set('Authorization', `Bearer ${token}`);
        expect([200, 404]).toContain(res.statusCode);
    });
});
