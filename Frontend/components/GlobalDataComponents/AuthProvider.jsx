import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContent = createContext({ userToken: null, setUserToken: () => {}, clearToken: () => {} });

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.post('http://192.168.205.188:8888/user-data', { token: userToken });
      setUserData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const clearToken = async () => {
    setUserToken(null);
    setUserData(null);
  };

  useEffect(() => {
    const initializeAuthProvider = async () => {
      if (userToken !== null) {
        await fetchUserData();
      }
    };

    initializeAuthProvider();
  }, [isLoggedIn]);

  return (
    <AuthContent.Provider value={{ setUserToken, userData, clearToken, setIsLoggedIn }}>
      {children}
    </AuthContent.Provider>
  );
};

export { AuthContent, AuthProvider };
