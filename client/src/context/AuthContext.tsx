import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginAsDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const currentToken = authService.getToken();
    if (currentUser) {
      setUser(currentUser);
      setToken(currentToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await authService.login(email, password);
      setUser(loggedInUser);
      setToken(authService.getToken());
      showToast('Welcome back!', 'success', `Signed in as ${loggedInUser.name}`);
    } catch (err: any) {
      showToast('Login Failed', 'error', err.message || 'Unable to sign in');
      throw err;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const newUser = await authService.signup(name, email, password);
      setUser(newUser);
      setToken(authService.getToken());
      showToast('Account Created!', 'success', `Welcome to Trivo-Travel, ${newUser.name}`);
    } catch (err: any) {
      showToast('Signup Failed', 'error', err.message || 'Unable to register');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    showToast('Signed Out', 'info', 'You have been successfully signed out.');
  };

  const loginAsDemo = () => {
    const demo = authService.loginAsDemo();
    setUser(demo);
    setToken(authService.getToken());
    showToast('Demo Mode Activated', 'success', `Logged in as ${demo.name}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
