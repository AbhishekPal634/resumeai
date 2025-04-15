import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('authUser');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse stored user data on init:", error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Effect to handle initial loading and potential inconsistencies
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      if (user) setUser(null);
    }
    setLoading(false);
  }, [user]);

  // Memoize loginAction
  const loginAction = useCallback((data) => {
    if (data && data.token && data.user) {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('authUser', JSON.stringify(data.user));
    } else {
      console.error("Login action received invalid data:", data);
    }
  }, []);

  // Memoize logOut (Navigation removed)
  const logOut = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
