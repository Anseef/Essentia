import { useFonts } from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WelcomePage from './screens/Auth/WelcomePage.jsx'
import RootNavigation from './screens/Root/RootNavigation';
import AuthNavigation from './screens/Auth/AuthNavigation';
import FoodNavigation from './screens/Food/FoodNavigation.jsx';
import HabitNavigation from './screens/Habit/HabitNavigation.jsx';
import EditProfile from './screens/Root/EditProfile.jsx';
import { AuthProvider } from './components/GlobalDataComponents/AuthProvider.jsx';

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
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Welcome" component={WelcomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen name='Auth' component={AuthNavigation}
                options={{ headerShown: false}}
              />
              <Stack.Screen name="Essentia" component={RootNavigation}
                  options={{ headerShown: false }}
              />
              <Stack.Screen name="Food" component={FoodNavigation}
                  options={{ headerShown: false }}
              />
              <Stack.Screen name="Habit" component={HabitNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Edit Profile" component={EditProfile}
                options={{ headerShown: false }}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
  );

}

const optionStyle = {
  headerStyle: { backgroundColor: '#836cdd', elevation: 0 },
  headerTitleStyle: { color: '#fff',fontFamily:'Bold',fontSize: 19,textAlign: 'left' },
  headerTintColor: '#fff',
}