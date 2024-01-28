import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export class SelectedFoods extends Component {
  render() {
    return (
      <View style={styles.foodBlock}>
        

        <View>
          
          <Text style={{ fontFamily: 'Bold' }}>Appam</Text>

          {/* Calorie and  Quantity */}

          <Text style={{ paddingLeft: 5, color: '#57636c',fontFamily: 'Medium',fontSize: 12 }}>361kcal</Text>
          <Text style={{ paddingLeft: 5, color: '#57636c',fontFamily: 'Medium',fontSize: 12 }}>3 pieces</Text>

        </View>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
          <Text style={{ color: '#fff' }}>Remove</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#8b71db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default SelectedFoods;
