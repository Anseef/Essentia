import { Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const FoodBlock = ({ FoodTime, trackedItems, currentDate }) => {
  const totalCaloriePerTime = trackedItems.reduce((total, item) => total + item.foodItem.Calories, 0);

  const navigation = useNavigation();

  return (
    <Pressable style={styles.foodBlock} onPress={() => navigation.navigate('FoodDetails', { FoodTime })}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ paddingRight: 5 }}>.</Text>
        <Text style={{ fontFamily: 'SemiBold',fontSize:16 }}>{ FoodTime }</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',height:30 }}>
        <Text style={{ paddingLeft: 10, color: '#57636c', maxWidth: 220,fontFamily: 'SemiBold' }} numberOfLines={1}>
          {trackedItems && trackedItems.length > 0
            ? trackedItems.map(item => item.foodItem.Name).join(', ') + (trackedItems.map(item => item.foodItem.Name).join(', ').length > 50 ? '...' : '')
            : 'No Entries'
          }
        </Text>

        <Text style={{ fontFamily: 'Bold', fontSize: 21 }}>
          { totalCaloriePerTime }
          <Text style={{ fontFamily: 'Regular', fontSize: 14 }}> kcal</Text>
        </Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.navigate('FoodDetails', { FoodTime, currentDate })}>
        <Text style={{ color: '#fff' }}>Add</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  foodBlock: {
    backgroundColor: '#dcd6f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#8b71db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5
  }
});

export default FoodBlock;
