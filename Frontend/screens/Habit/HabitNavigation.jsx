import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HabitMain from './HabitMain';
import Category from './Category';

const Stack = createNativeStackNavigator();

const HabitNavigation = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Habits" component={HabitMain}         
          options={optionStyle}
      />
      <Stack.Screen name="Select a Category" component={Category}         
          options={optionStyle}
      />
    </Stack.Navigator>
  )
};

const optionStyle = {
  headerStyle: { backgroundColor: '#836cdd', elevation: 0 },
  headerTitleStyle: { color: '#fff',fontFamily:'Bold',fontSize: 19,textAlign: 'left' },
  headerTintColor: '#fff',
}

export default HabitNavigation;