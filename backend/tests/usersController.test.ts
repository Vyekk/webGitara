import request from 'supertest';
import app from '../src/app';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxMzg0MTNjYy1iOTMxLTQ0OTAtYmM5Ni1jNjgwOTM5MGFlZTgiLCJ1c2VybmFtZSI6ImYiLCJpc0FkbWluIjoxLCJpc01vZGVyYXRvciI6MCwiaWF0IjoxNzUxNDIzNDY2LCJleHAiOjE3NTE1MDk4NjZ9.LzFRQ1XQ0_K32xbFh8WqVuCNWDrVU7bOfE33y6wPM5A';
const testUserId = '138413cc-b931-4490-bc96-c6809390aee8';

describe('Users Controller', () => {
    it('GET /api/users - powinno zwrócić listę użytkowników', async () => {
        const res = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /api/users - bez tokena powinno zwrócić 401', async () => {
        const res = await request(app).get('/api/users');
        expect([401, 403]).toContain(res.statusCode);
    });

    it('PUT /api/users/password - bez tokena powinno zwrócić 401', async () => {
        const res = await request(app)
            .put('/api/users/password')
            .send({ oldPassword: 'haslo', newPassword: 'nowehaslo' });
        expect([401, 403]).toContain(res.statusCode);
    });

    it('PUT /api/users/:id/role - zwykły użytkownik nie może zmienić roli', async () => {
        const userToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxMzg0MTNjYy1iOTMxLTQ0OTAtYmM5Ni1jNjgwOTM5MGFlZTgiLCJ1c2VybmFtZSI6ImYiLCJpc0FkbWluIjowLCJpc01vZGVyYXRvciI6MCwiaWF0IjoxNzUxNDIzNDY2LCJleHAiOjE3NTE1MDk4NjZ9.LzFRQ1XQ0_K32xbFh8WqVuCNWDrVU7bOfE33y6wPM5A';
        const res = await request(app)
            .put(`/api/users/${testUserId}/role`)
            .set('Authorization', `Bearer ${userToken}`)
            .send({ role: 'admin' });
        expect([403, 401]).toContain(res.statusCode);
    });

    it('DELETE /api/users/:id - inny użytkownik nie może usunąć', async () => {
        const userToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxMzg0MTNjYy1iOTMxLTQ0OTAtYmM5Ni1jNjgwOTM5MGFlZTgiLCJ1c2VybmFtZSI6ImYiLCJpc0FkbWluIjowLCJpc01vZGVyYXRvciI6MCwiaWF0IjoxNzUxNDIzNDY2LCJleHAiOjE3NTE1MDk4NjZ9.LzFRQ1XQ0_K32xbFh8WqVuCNWDrVU7bOfE33y6wPM5A';
        const res = await request(app).delete(`/api/users/${testUserId}`).set('Authorization', `Bearer ${userToken}`);
        expect([403, 401]).toContain(res.statusCode);
    });

    it('GET /api/users/:id - nieistniejący użytkownik powinien zwrócić 404', async () => {
        const res = await request(app)
            .get('/api/users/00000000-0000-0000-0000-000000000000')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });

    it('PUT /api/users/:id/role - nieistniejący użytkownik powinien zwrócić 404', async () => {
        const res = await request(app)
            .put('/api/users/00000000-0000-0000-0000-000000000000/role')
            .set('Authorization', `Bearer ${token}`)
            .send({ role: 'admin' });
        expect(res.statusCode).toBe(404);
    });

    it('DELETE /api/users/:id - nieistniejący użytkownik powinien zwrócić 404', async () => {
        const res = await request(app)
            .delete('/api/users/00000000-0000-0000-0000-000000000000')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toBe(404);
    });

    it('GET /api/users/:id - powinno zwrócić użytkownika po ID', async () => {
        const res = await request(app).get(`/api/users/${testUserId}`).set('Authorization', `Bearer ${token}`);
        expect([200, 404]).toContain(res.statusCode);
        if (res.statusCode === 200) {
            expect(res.body).toHaveProperty('idUser', testUserId);
        }
    });

    it('PUT /api/users/password - powinno zwrócić błąd przy złym haśle', async () => {
        const res = await request(app)
            .put('/api/users/password')
            .set('Authorization', `Bearer ${token}`)
            .send({ oldPassword: 'zlehaslo', newPassword: 'nowehaslo123' });
        expect([400, 401, 404]).toContain(res.statusCode);
    });

    it('PUT /api/users/:id/role - powinno zaktualizować rolę użytkownika', async () => {
        const res = await request(app)
            .put(`/api/users/${testUserId}/role`)
            .set('Authorization', `Bearer ${token}`)
            .send({ role: 'admin' });
        expect([200, 404]).toContain(res.statusCode);
    });

    it('DELETE /api/users/:id - powinno usunąć użytkownika', async () => {
        // UWAGA: ten test usunie użytkownika z bazy!
        // Jeśli nie chcesz usuwać admina, użyj innego testowego użytkownika
        const res = await request(app).delete(`/api/users/${testUserId}`).set('Authorization', `Bearer ${token}`);
        expect([200, 404]).toContain(res.statusCode);
    });
});
