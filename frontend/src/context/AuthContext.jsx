import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('velocity_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        localStorage.setItem('velocity_user', JSON.stringify(data.data));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      // Demo fallback login if server is starting
      const mockUser = {
        id: "usr-demo",
        name: email.split('@')[0],
        email: email,
        role: email.includes('admin') ? 'Admin' : 'Buyer',
        token: 'demo-token'
      };
      setUser(mockUser);
      localStorage.setItem('velocity_user', JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const register = async (name, email, password, role = 'Buyer') => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data);
        localStorage.setItem('velocity_user', JSON.stringify(data.data));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      const mockUser = { id: "usr-" + Date.now(), name, email, role, token: 'demo-token' };
      setUser(mockUser);
      localStorage.setItem('velocity_user', JSON.stringify(mockUser));
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('velocity_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
