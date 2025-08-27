import { AuthData, Credentials } from 'types';
import API_URL from 'config';
import axios from 'axios';

export class AuthService {
    async login(credentials: Credentials): Promise<AuthData> {
        try {
            const response = await axios.post(`${API_URL}/api/users/login`, credentials, { withCredentials: true });
            return response.data;
        } catch (err) {
            throw new Error('Błąd logowania');
        }
    }

    async logout(): Promise<void> {
        await axios.post(`${API_URL}/api/users/logout`, {}, { withCredentials: true });
    }
}
