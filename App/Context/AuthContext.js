// AuthContext.js

import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginApi } from '../Api/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await LoginApi(email, password);
      if (data && data.success) {
        await AsyncStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        setError(null);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
