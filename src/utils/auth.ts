interface User {
    username: string;
    password: string;
}

// Tymczasowa baza użytkowników
const mockUsers: User[] = [
    { username: 'user1', password: 'password123' },
    { username: 'user2', password: 'mysecurepassword' },
    { username: 'admin', password: 'admin123' },
];

export function login(username: string, password: string): boolean {
    const user = mockUsers.find((u) => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('user', JSON.stringify({ username }));
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem('user');
}

export function getCurrentUser(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).username : null;
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
}
