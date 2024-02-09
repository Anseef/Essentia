import { useFonts } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Homepage from './screens/Root/Homepage';
import FoodDescription from './screens/Food/FoodDescription'
import FoodSelection from './screens/Food/FoodSelection'
import FoodDetails from './screens/Food/FoodDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [ loaded ] = useFonts({
      Regular: require("./assets/Font/Poppins-Regular.ttf"),
      Bold: require("./assets/Font/Poppins-Bold.ttf"),
      Light: require("./assets/Font/Poppins-Light.ttf"),
      Medium: require("./assets/Font/Poppins-Medium.ttf"),
      SemiBold: require("./assets/Font/Poppins-SemiBold.ttf"),
      Thin: require("./assets/Font/Poppins-Thin.ttf"),
      ExtraBold: require("./assets/Font/Poppins-ExtraBold.ttf")
  });

  if(!loaded) return null;

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Essentia" component={Homepage}
            options={optionStyle}
          />
          <Stack.Screen name="FoodDetails" component={FoodDetails}         
            options={optionStyle}
          />
          <Stack.Screen name="FoodSelection" component={FoodSelection}
            options={optionStyle}
          />
          <Stack.Screen name="FoodDescription" component={FoodDescription} 
            options={optionStyle}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );

}

const optionStyle = {
  headerStyle: { backgroundColor: '#836cdd', elevation: 0},
  headerTitleStyle: { color: '#fff',fontFamily:'Bold',fontSize: 19,textAlign: 'left' },
  headerTintColor: '#fff',
}