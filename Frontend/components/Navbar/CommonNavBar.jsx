import React from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommonNavBar = ({value}) => {
  return (
    <SafeAreaView>
        <StatusBar backgroundColor={ '#836cdd' } />
        <View style={styles.container}>
          <Text style={styles.textDiv}>{"back"}</Text>
          <Text style={[styles.logoText, styles.textDiv]}>{value}</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems:'baseline',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:5,
    paddingBottom: 10,
    backgroundColor: '#836cdd',
    
  },
  
  logoText: {
    paddingLeft:10,
    fontFamily: 'Bold',
    fontSize: 17,
  },
  textDiv: {
    fontWeight: '600',
    color: '#fff',
  },
});

export default CommonNavBar;
