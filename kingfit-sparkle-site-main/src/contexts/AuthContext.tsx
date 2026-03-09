import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  plan?: string;
  planDuration?: number;
  joinDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  joinPlan: (plan: string, duration: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kf_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const save = (u: User) => {
    setUser(u);
    localStorage.setItem('kf_user', JSON.stringify(u));
  };

  const signup = (name: string, email: string, phone: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('kf_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, phone, password });
    localStorage.setItem('kf_users', JSON.stringify(users));
    save({ name, email, phone });
    return true;
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('kf_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return false;
    save({ name: found.name, email: found.email, phone: found.phone, plan: found.plan, planDuration: found.planDuration, joinDate: found.joinDate });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kf_user');
  };

  const joinPlan = (plan: string, duration: number) => {
    if (!user) return;
    const updated = { ...user, plan, planDuration: duration, joinDate: new Date().toISOString() };
    save(updated);
    const users = JSON.parse(localStorage.getItem('kf_users') || '[]');
    const idx = users.findIndex((u: any) => u.email === user.email);
    if (idx >= 0) {
      users[idx] = { ...users[idx], plan, planDuration: duration, joinDate: updated.joinDate };
      localStorage.setItem('kf_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, joinPlan }}>
      {children}
    </AuthContext.Provider>
  );
};
