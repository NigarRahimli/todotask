import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    user: null,
  });

  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authState.token]);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000/users/login', { email, password });
    const { token, userId } = response.data;
    setAuthState({ token, user: { id: userId, email } });
    
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthState({ token: null, user: null });
    localStorage.removeItem('token');
  };

  const authContextValue = {
    ...authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
