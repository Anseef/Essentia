import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HabitMain from './HabitMain';

const Stack = createNativeStackNavigator();

const HabitNavigation = () => {

  return (
    <Stack.Navigator>
        <Stack.Screen name="HabitMain" component={HabitMain}         
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
};

export default HabitNavigation;