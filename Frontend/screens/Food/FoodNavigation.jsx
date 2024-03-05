import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FoodSelection from './FoodSelection';
import FoodDetails from './FoodDetails';
import FoodDescription from './FoodDescription';

const Stack = createNativeStackNavigator();

const FoodNavigation = () => {

  return (
    <Stack.Navigator>
        <Stack.Screen name="FoodSelection" component={FoodSelection}         
            options={optionStyle}
        />
        <Stack.Screen name="FoodDetails" component={FoodDetails}
            options={optionStyle}
        />
        <Stack.Screen name="FoodDescription" component={FoodDescription} 
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

export default FoodNavigation;
