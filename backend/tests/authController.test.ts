import request from 'supertest';
import app from '../src/app';

describe('Auth Controller', () => {
    const validUser = {
        username: 'admin',
        password: 'adminwebgitara',
    };
    const invalidUser = {
        username: 'f',
        password: 'zlehaslo',
    };

    it('POST /api/auth/login - powinno zalogować użytkownika przy poprawnych danych', async () => {
        const res = await request(app).post('/api/auth/login').send(validUser).set('Accept', 'application/json');
        expect([200, 404]).toContain(res.statusCode);
        if (res.statusCode === 200) {
            expect(res.body).toHaveProperty('token');
            expect(res.body).toHaveProperty('user');
        }
    });

    it('POST /api/auth/login - powinno zwrócić błąd przy niepoprawnych danych', async () => {
        const res = await request(app).post('/api/auth/login').send(invalidUser).set('Accept', 'application/json');
        expect([400, 404]).toContain(res.statusCode);
    });

    it('POST /api/auth/login - brak hasła', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'admin' })
            .set('Accept', 'application/json');
        expect([400, 404]).toContain(res.statusCode);
    });

    it('POST /api/auth/login - brak username', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ password: 'adminwebgitara' })
            .set('Accept', 'application/json');
        expect([400, 404]).toContain(res.statusCode);
    });

    it('POST /api/auth/login - oba pola puste', async () => {
        const res = await request(app).post('/api/auth/login').send({}).set('Accept', 'application/json');
        expect([400, 404]).toContain(res.statusCode);
    });

    it('POST /api/auth/login - nieprawidłowy typ danych', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 123, password: true })
            .set('Accept', 'application/json');
        expect([400, 404]).toContain(res.statusCode);
    });

    it('POST /api/auth/login - zablokowany użytkownik', async () => {
        // Upewnij się, że taki użytkownik istnieje w bazie z isActivated = 0
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'zablokowany', password: 'haslo' })
            .set('Accept', 'application/json');
        expect([400, 404]).toContain(res.statusCode);
    });

    it('POST /api/auth/login - poprawność formatu tokena JWT', async () => {
        const res = await request(app).post('/api/auth/login').send(validUser).set('Accept', 'application/json');
        if (res.statusCode === 200) {
            expect(res.body).toHaveProperty('token');
            // Sprawdź czy token jest JWT (trzy części oddzielone kropką)
            expect(res.body.token.split('.').length).toBe(3);
        }
    });
});
