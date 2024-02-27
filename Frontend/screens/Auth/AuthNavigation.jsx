import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Login';
import Signup from './Signup';
import GetBMI from './GetBMI';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {

  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}         
            options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={Signup}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="GetBMI" component={GetBMI} 
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
};

export default AuthNavigation;
