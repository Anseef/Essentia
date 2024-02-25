import { Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SelectedFoods = ({ foodItemArray, onRemove }) =>{

  const navigation = useNavigation();

  return (

    <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }} style={styles.foodBlock} 
      onPress = { () => 
        { navigation.navigate
            ('FoodDescription',
              { 
                foodItem: foodItemArray.foodItem,
                foodTime: foodItemArray.foodItem.MealTime,
                todayDate: foodItemArray.foodItem.date,
                storedQuantityFromDB: foodItemArray.foodItem.Quantity,
                isUpdatedFood: true
              }
            ) 
        }
      }
    >

      <View>
        
        <Text style={{ fontFamily: 'Bold' }}>{ foodItemArray.foodItem.Name }</Text>

        {/* Calorie and  Quantity */}

        <Text style={{ paddingLeft: 5, color: '#57636c',fontFamily: 'Medium',fontSize: 12 }}>{ foodItemArray.foodItem.Calories }kcal</Text>
        
        <View style = {{ flexDirection: 'row' }}>
          <Icon name='pencil-alt' size={ 12 } color={ '#57636c' } style = {{ paddingTop: 2 }}/>
          <Text style={{ paddingLeft: 5, color: '#57636c',fontFamily: 'Medium',fontSize: 12 }}>{ foodItemArray.foodItem.Quantity} {foodItemArray.foodItem.SelectedMeasure}</Text>
        </View>

      </View>

      <Pressable android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: false }} style={styles.button} onPress={() => onRemove(foodItemArray.foodItem) }>
        <Text style={{ color: '#fff',fontFamily:'SemiBold',fontSize:13 }}>Remove</Text>
      </Pressable>

    </Pressable>
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
