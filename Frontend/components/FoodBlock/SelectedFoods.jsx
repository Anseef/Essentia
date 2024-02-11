import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const SelectedFoods = ({ foodItemArray }) =>{

  return (
    <View style={styles.foodBlock}>
      

      <View>
        
        <Text style={{ fontFamily: 'Bold' }}>{ foodItemArray.foodItem.Name }</Text>

        {/* Calorie and  Quantity */}

        <Text style={{ paddingLeft: 5, color: '#57636c',fontFamily: 'Medium',fontSize: 12 }}>{ foodItemArray.foodItem.Calories }kcal</Text>
        <Text style={{ paddingLeft: 5, color: '#57636c',fontFamily: 'Medium',fontSize: 12 }}>{ foodItemArray.foodItem.Quantity} {foodItemArray.foodItem.Measure}</Text>

      </View>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
        <Text style={{ color: '#fff',fontFamily:'SemiBold',fontSize:13 }}>Remove</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  foodBlock: {
    backgroundColor: '#dcd6f3',
    padding: 17,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },

  button: {
    backgroundColor: '#8b71db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default SelectedFoods;
