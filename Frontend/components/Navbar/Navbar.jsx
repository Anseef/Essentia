import React from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';

const Navbar = () => {
  return (
    <>
        <StatusBar backgroundColor={ '#836cdd' } />
        <View style={styles.container}>
          <Text style={styles.textDiv}>{"back"}</Text>
          <Text style={[styles.logoText, styles.textDiv]}>Essent!a</Text>
          <Text style={styles.textDiv}>Profile</Text>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'baseline',
    padding:20,
    paddingTop:0,

  },
  logoText: {
    fontFamily: 'Bold',
    fontSize: 17,
  },
  textDiv: {
    fontWeight: '600',
    color: '#fff',
  },
});

export default Navbar;
