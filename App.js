import { StyleSheet, View } from 'react-native';
import Homepage from './screens/Root/Homepage';
import { useFonts } from 'expo-font';

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
    <View style={styles.container}>
      <Homepage />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});