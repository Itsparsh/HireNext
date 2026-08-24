import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Setup global axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '/api';
axios.defaults.withCredentials = true; // Crucial for sending/receiving HTTP-only cookies

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/auth/me');
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        // Not authenticated, that's fine
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = (userData) => {
    // When login is successful, we receive the user data from the backend
    // The backend already set the HTTP-only cookie with the JWT
    setUser(userData);
  };

  const register = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.get('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    }
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
