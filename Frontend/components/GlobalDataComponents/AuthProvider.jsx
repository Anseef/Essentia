import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContent = createContext({ userToken: null, setUserToken: () => {}, clearToken: () => {} });

const AuthProvider = ({ children }) => {

  const localIP = '192.168.193.188';

  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.post(`http://${localIP}:8888/user-data`, { token: userToken });
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

  useEffect(() => {
    if(isUpdated === true){
      fetchUserData();
      setIsUpdated(false);
    }
  },[isUpdated])

  return (
    <AuthContent.Provider value={{ setUserToken, userData, clearToken, setIsLoggedIn, localIP, setIsUpdated }}>
      {children}
    </AuthContent.Provider>
  );
};

export { AuthContent, AuthProvider };
