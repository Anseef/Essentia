import React from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommonNavBar = () => {
  return (
    <SafeAreaView>
        <StatusBar backgroundColor={ '#836cdd' } />
        <View style={styles.container}>
          <Text style={styles.textDiv}>{"back"}</Text>
          <Text style={[styles.logoText, styles.textDiv]}>Breakfast</Text>
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
    paddingTop:8,
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
