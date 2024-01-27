import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export class FoodBlock extends Component {
  render() {
    return (
      <View style={styles.foodBlock}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ paddingRight: 5 }}>.</Text>
          <Text style={{ fontFamily: 'Bold' }}>Breakfast</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text style={{ paddingLeft: 10, color: '#57636c' }}>Appam, Chicken Curry</Text>
          <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>
            892
            <Text style={{ fontFamily: 'Regular', fontSize: 14 }}>kcal</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
          <Text style={{ color: '#fff' }}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  foodBlock: {
    backgroundColor: '#dcd6f3',
    padding: 15,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#8b71db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default FoodBlock;
