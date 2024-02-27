import { View, Text, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AuthContent } from '../../components/GlobalDataComponents/AuthProvider';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const { userData, clearToken, setIsLoggedIn } = useContext(AuthContent);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const handleLogOut = async () => {
    try {
      clearToken();
      setIsLoggedIn(false);
      navigation.navigate('Auth', { screen: 'Login' });
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      {user && (
        <>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </>
      )}
      <Pressable onPress={handleLogOut}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Profile;