import { User } from '../types';

const USER_STORAGE_KEY = 'trivo_current_user';
const TOKEN_STORAGE_KEY = 'trivo_auth_token';

const DEMO_USER: User = {
  id: 'usr-demo-777',
  email: 'demo@trivotravel.com',
  name: 'Arjun Sharma',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  createdAt: '2026-01-15T10:00:00Z'
};

export const authService = {
  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(USER_STORAGE_KEY);
      if (!data) {
        // Pre-seed demo user so user is initially logged in for immediate seamless expo demo
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEMO_USER));
        localStorage.setItem(TOKEN_STORAGE_KEY, 'mock-jwt-token-demo');
        return DEMO_USER;
      }
      return JSON.parse(data);
    } catch {
      return DEMO_USER;
    }
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  login(email: string, _password: string):Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !email.includes('@')) {
          reject(new Error('Please enter a valid email address.'));
          return;
        }
        const user: User = {
          id: `usr-${Date.now()}`,
          email: email.trim().toLowerCase(),
          name: email.split('@')[0].replace('.', ' ').replace(/^\w/, c => c.toUpperCase()),
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_STORAGE_KEY, `jwt-${Date.now()}`);
        resolve(user);
      }, 500);
    });
  },

  signup(name: string, email: string, _password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!name || name.trim().length < 2) {
          reject(new Error('Name must be at least 2 characters.'));
          return;
        }
        if (!email || !email.includes('@')) {
          reject(new Error('Please provide a valid email address.'));
          return;
        }
        const user: User = {
          id: `usr-${Date.now()}`,
          email: email.trim().toLowerCase(),
          name: name.trim(),
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_STORAGE_KEY, `jwt-${Date.now()}`);
        resolve(user);
      }, 500);
    });
  },

  logout(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  loginAsDemo(): User {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEMO_USER));
    localStorage.setItem(TOKEN_STORAGE_KEY, 'mock-jwt-token-demo');
    return DEMO_USER;
  }
};
