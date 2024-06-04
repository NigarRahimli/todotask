import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    loading: true, 
  });

  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    setAuthState(prevState => ({ ...prevState, loading: false })); 
  }, [authState.token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password });
      const { token, userId } = response.data;
      setAuthState({ token, user: { id: userId, email }, loading: false }); 
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new Error('Email address or password is incorrect.');
    }
  };
  

  const logout = () => {
    setAuthState({ token: null, user: null, loading: false }); 
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); 
  };

  const authContextValue = {
    ...authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!authState.loading && children} {/* Render children only when loading is false */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
