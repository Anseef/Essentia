import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Homepage from './Homepage';
import Analytics from './Analytics';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
            elevation: 0,
            height: 58
        },
        tabBarIcon: ({ focused }) => {
          let iconComponent;
          switch (route.name) {
            case 'Home':
              iconComponent = (
                <FontAwesome5Icon
                  name="home"
                  size={ focused ? 24 : 20 }
                  color={focused ? '#836cdd' : '#bcacf2'}
                />
              );
              break;
            case 'Analytics':
              iconComponent = (
                <MaterialIcons
                  name="google-analytics"
                  size={ focused ? 24 : 20 }
                  color={focused ? '#836cdd' : '#bcacf2'}
                />
              );
              break;
            case 'Profile':
              iconComponent = (
                <FontAwesome5Icon
                  name="user-alt"
                  size={ focused ? 24 : 20 }
                  color={focused ? '#836cdd' : '#bcacf2'}
                />
              );
              break;
            default:
          }

          return iconComponent;
        },
        headerShown: false,
        tabBarShowLabel: false
        
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Homepage} />
      <Tab.Screen name="Analytics" component={Analytics} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default RootNavigation;
