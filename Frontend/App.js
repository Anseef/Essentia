import { useFonts } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RootNavigation from './screens/Root/RootNavigation';
import FoodDescription from './screens/Food/FoodDescription'
import FoodSelection from './screens/Food/FoodSelection'
import FoodDetails from './screens/Food/FoodDetails';
import { TrackedFoodsProvider } from './components/GlobalDataComponents/TotalCalorieProvider';

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
      <TrackedFoodsProvider>
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Essentia" component={RootNavigation}
                options={{ headerShown: false }}
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
      </TrackedFoodsProvider>
  );

}

const optionStyle = {
  headerStyle: { backgroundColor: '#836cdd', elevation: 0 },
  headerTitleStyle: { color: '#fff',fontFamily:'Bold',fontSize: 19,textAlign: 'left' },
  headerTintColor: '#fff',
}